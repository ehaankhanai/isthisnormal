import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Allowed values for enum fields
const ALLOWED_BODY_AREAS = [
  'Head/Face', 'Neck', 'Chest', 'Abdomen', 'Back', 
  'Arms/Hands', 'Legs/Feet', 'Skin', 'Other'
];

const ALLOWED_DURATIONS = [
  'Just started', 'Few hours', 'Few days', 
  'About a week', 'Longer than a week'
];

const ALLOWED_AGE_RANGES = [
  'Under 18', '18-30', '31-45', '46-60', 'Over 60'
];

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  entry.count++;
  return true;
}

function sanitizeInput(input: string): string {
  // Remove characters that could be used for prompt injection
  return input
    .replace(/[\\]/g, '') // Remove backslashes
    .replace(/\n/g, ' ')  // Replace newlines with spaces
    .trim();
}

function validateSymptomText(text: unknown): { valid: boolean; error?: string; sanitized?: string } {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Symptom description is required' };
  }
  
  const trimmed = text.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Symptom description cannot be empty' };
  }
  
  if (trimmed.length > 500) {
    return { valid: false, error: 'Symptom description must be less than 500 characters' };
  }
  
  return { valid: true, sanitized: sanitizeInput(trimmed) };
}

function validateEnumField(value: unknown, allowedValues: string[], fieldName: string): { valid: boolean; error?: string; value?: string } {
  if (value === undefined || value === null || value === '') {
    return { valid: true }; // Optional fields
  }
  
  if (typeof value !== 'string') {
    return { valid: false, error: `Invalid ${fieldName}` };
  }
  
  if (!allowedValues.includes(value)) {
    return { valid: false, error: `Invalid ${fieldName}` };
  }
  
  return { valid: true, value };
}

const SYSTEM_PROMPT = `You are a compassionate, knowledgeable health information assistant for an app called "Is This Normal?". Your role is to provide calm, reassuring, and helpful information about symptoms people are curious or worried about.

CRITICAL RULES:
1. NEVER diagnose diseases or medical conditions
2. NEVER prescribe medications or treatments
3. NEVER use alarming or scary language
4. ALWAYS encourage professional consultation for serious concerns
5. ALWAYS be empathetic, non-judgmental, and reassuring
6. Use phrases like "often associated with", "commonly linked to", "many people experience"

You MUST respond with a valid JSON object in this exact structure:
{
  "acknowledgement": "A warm, empathetic 2-3 sentence opening that acknowledges their concern and normalizes asking about it",
  "commonality": "A 2-3 sentence explanation of how common this type of symptom is, using reassuring language",
  "possibleExplanations": ["Array of 4-5 common, non-diagnostic explanations like lifestyle factors, stress, normal body variations"],
  "usuallyOkayIf": ["Array of 4 situations when this is typically not concerning"],
  "seekHelpIf": ["Array of 4 red flags that would warrant professional consultation"],
  "selfCareSteps": ["Array of 5 practical, actionable self-care or monitoring steps they can take"],
  "similarQuestions": <random number between 800-5000>
}

Be SPECIFIC to the symptom they describe. Reference their actual symptom in your response. If they mention body area, duration, or age, incorporate that context.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { symptomText, bodyArea, duration, ageRange } = body;

    // Validate symptom text
    const symptomValidation = validateSymptomText(symptomText);
    if (!symptomValidation.valid) {
      return new Response(
        JSON.stringify({ error: symptomValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate enum fields
    const bodyAreaValidation = validateEnumField(bodyArea, ALLOWED_BODY_AREAS, 'body area');
    if (!bodyAreaValidation.valid) {
      return new Response(
        JSON.stringify({ error: bodyAreaValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const durationValidation = validateEnumField(duration, ALLOWED_DURATIONS, 'duration');
    if (!durationValidation.valid) {
      return new Response(
        JSON.stringify({ error: durationValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ageRangeValidation = validateEnumField(ageRange, ALLOWED_AGE_RANGES, 'age range');
    if (!ageRangeValidation.valid) {
      return new Response(
        JSON.stringify({ error: ageRangeValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the user message with sanitized context
    const sanitizedSymptom = symptomValidation.sanitized!;
    let userMessage = `The user is asking about this symptom: "${sanitizedSymptom}"`;
    if (bodyAreaValidation.value) userMessage += `\nBody area: ${bodyAreaValidation.value}`;
    if (durationValidation.value) userMessage += `\nDuration: ${durationValidation.value}`;
    if (ageRangeValidation.value) userMessage += `\nAge range: ${ageRangeValidation.value}`;
    userMessage += `\n\nProvide helpful, symptom-specific information. Remember to be specific about "${sanitizedSymptom}" - do NOT give generic responses.`;

    console.log('Processing symptom query for body area:', bodyAreaValidation.value || 'not specified');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('AI gateway error:', response.status);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Service is busy. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Unable to analyze symptom. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Unable to generate response. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from the AI
    let parsedResponse;
    try {
      // Remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.slice(7);
      }
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.slice(3);
      }
      if (cleanContent.endsWith('```')) {
        cleanContent = cleanContent.slice(0, -3);
      }
      parsedResponse = JSON.parse(cleanContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response');
      // Return a fallback response
      parsedResponse = {
        acknowledgement: "Thank you for sharing this with us. It takes courage to ask about something that concerns you, and you're not alone in wondering about this.",
        commonality: "Many people experience similar symptoms and have the same questions. It's completely normal to want to understand what your body is telling you.",
        possibleExplanations: [
          "Stress or anxiety, which can manifest in many physical ways",
          "Changes in sleep patterns or daily routine",
          "Dietary factors or hydration levels",
          "Normal bodily variations that most people experience",
          "Environmental factors like weather or seasonal changes"
        ],
        usuallyOkayIf: [
          "The symptom is mild and doesn't significantly affect daily activities",
          "It comes and goes rather than being constant or worsening",
          "You're not experiencing other concerning symptoms alongside it",
          "It tends to improve with rest or basic self-care"
        ],
        seekHelpIf: [
          "The symptom is severe or progressively getting worse",
          "It's accompanied by fever, severe pain, or difficulty breathing",
          "It significantly impacts your daily life, work, or sleep",
          "You have a gut feeling that something is seriously wrong"
        ],
        selfCareSteps: [
          "Keep a journal noting when the symptom occurs and potential triggers",
          "Ensure you're getting adequate sleep and staying well-hydrated",
          "Try gentle relaxation techniques like deep breathing or meditation",
          "Consider whether recent stress might be playing a role",
          "Monitor for a few days before becoming overly concerned"
        ],
        similarQuestions: Math.floor(Math.random() * 4200) + 800
      };
    }

    console.log('Successfully generated symptom analysis');

    return new Response(
      JSON.stringify(parsedResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-symptom function:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
