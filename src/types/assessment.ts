export interface AssessmentSection {
  id: string;
  title: string;
  objective: string;
  questions: Question[];
  completed: boolean;
}

export interface Question {
  id: string;
  type: 'paired-comparison' | 'likert' | 'ranking' | 'multiple-choice' | 'rating-scale';
  question: string;
  options?: string[];
  scale?: {
    min: number;
    max: number;
    labels?: { [key: number]: string };
  };
  category?: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: string | number | string[];
  timestamp: Date;
}

export interface AssessmentResults {
  coreValues: {
    topValues: string[];
    valueProfile: string;
    conflictHotspots: string[];
    score: number;
  };
  purposeArchetypes: {
    primary: string;
    secondary: string;
    alignmentIndex: number;
    narrativeInsight: string;
  };
  meaningFulfillment: {
    energySources: string[];
    energyDrains: string[];
    meaningMisalignmentRisk: number;
    workstyleCongruence: number;
  };
  pactFramework: {
    purpose: number;
    authenticity: number;
    congruence: number;
    trajectory: number;
    overallAlignment: number;
    strengths: string[];
    riskZones: string[];
  };
  careerAlignment: {
    workCultureFitScore: number;
    roleMatchSummary: string[];
    environmentPreferences: string[];
  };
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: AssessmentResponse[];
  startTime: Date;
  sections: AssessmentSection[];
}