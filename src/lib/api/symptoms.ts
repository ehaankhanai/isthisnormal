import { supabase } from "@/integrations/supabase/client";

export interface SymptomData {
  text: string;
  bodyArea?: string;
  duration?: string;
  ageRange?: string;
  timestamp: string;
}

export interface SymptomAnalysis {
  acknowledgement: string;
  commonality: string;
  possibleExplanations: string[];
  usuallyOkayIf: string[];
  seekHelpIf: string[];
  selfCareSteps: string[];
  similarQuestions: number;
}

export async function analyzeSymptom(symptomData: SymptomData): Promise<SymptomAnalysis> {
  const { data, error } = await supabase.functions.invoke('analyze-symptom', {
    body: {
      symptomText: symptomData.text,
      bodyArea: symptomData.bodyArea,
      duration: symptomData.duration,
      ageRange: symptomData.ageRange,
    },
  });

  if (error) {
    console.error('Error calling analyze-symptom:', error);
    throw new Error(error.message || 'Failed to analyze symptom');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as SymptomAnalysis;
}
