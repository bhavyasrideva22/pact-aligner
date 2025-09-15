import { useState } from "react";
import { AssessmentState, AssessmentResponse, AssessmentResults } from "@/types/assessment";
import { assessmentSections } from "@/data/assessmentData";

export const useAssessment = () => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    startTime: new Date(),
    sections: assessmentSections
  });

  const recordResponse = (questionId: string, value: string | number | string[]) => {
    const response: AssessmentResponse = {
      questionId,
      value,
      timestamp: new Date()
    };

    setAssessmentState(prev => ({
      ...prev,
      responses: [...prev.responses.filter(r => r.questionId !== questionId), response]
    }));
  };

  const nextQuestion = () => {
    const currentSection = assessmentState.sections[assessmentState.currentSection];
    const isLastQuestionInSection = assessmentState.currentQuestion === currentSection.questions.length - 1;
    
    if (isLastQuestionInSection) {
      // Mark current section as completed
      const updatedSections = [...assessmentState.sections];
      updatedSections[assessmentState.currentSection].completed = true;
      
      // Move to next section
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0,
        sections: updatedSections
      }));
    } else {
      // Move to next question in current section
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    }
  };

  const previousQuestion = () => {
    if (assessmentState.currentQuestion > 0) {
      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (assessmentState.currentSection > 0) {
      const prevSection = assessmentState.sections[assessmentState.currentSection - 1];
      setAssessmentState(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSection.questions.length - 1
      }));
    }
  };

  const calculateResults = (): AssessmentResults => {
    // This is a simplified calculation - in a real app you'd have more sophisticated scoring
    const responses = assessmentState.responses;
    
    // Calculate PACT Framework scores
    const pactPurpose = Number(responses.find(r => r.questionId === 'pact_purpose')?.value) * 10 || 70;
    const pactAuthenticity = Number(responses.find(r => r.questionId === 'pact_authenticity')?.value) * 10 || 75;
    const pactCongruence = Number(responses.find(r => r.questionId === 'pact_congruence')?.value) * 10 || 65;
    const pactTrajectory = Number(responses.find(r => r.questionId === 'pact_trajectory')?.value) * 10 || 60;
    
    const overallAlignment = Math.round((pactPurpose + pactAuthenticity + pactCongruence + pactTrajectory) / 4);
    
    // Get top values from ranking
    const valuesResponse = responses.find(r => r.questionId === 'values_ranking');
    const topValues = Array.isArray(valuesResponse?.value) ? valuesResponse.value : ['Autonomy', 'Creativity', 'Growth', 'Impact', 'Learning'];
    
    // Determine primary archetype from likert responses
    const archetypeScores = {
      Creator: Number(responses.find(r => r.questionId === 'archetype_creator')?.value) || 3,
      Healer: Number(responses.find(r => r.questionId === 'archetype_healer')?.value) || 3,
      Builder: Number(responses.find(r => r.questionId === 'archetype_builder')?.value) || 3,
      Seeker: Number(responses.find(r => r.questionId === 'archetype_seeker')?.value) || 3,
      'Justice-Seeker': Number(responses.find(r => r.questionId === 'archetype_justice')?.value) || 3,
      Guide: Number(responses.find(r => r.questionId === 'archetype_guide')?.value) || 3,
    };
    
    const sortedArchetypes = Object.entries(archetypeScores).sort(([,a], [,b]) => b - a);
    const primaryArchetype = sortedArchetypes[0][0];
    const secondaryArchetype = sortedArchetypes[1][0];
    
    // Get energy sources from ranking
    const energyResponse = responses.find(r => r.questionId === 'energy_ranking');
    const energySources = Array.isArray(energyResponse?.value) ? energyResponse.value.slice(0, 3) : ['Creative problem solving', 'Learning new skills', 'Making a visible impact'];
    
    return {
      coreValues: {
        topValues,
        valueProfile: "Growth-Oriented Innovator",
        conflictHotspots: ["Autonomy vs Collaboration", "Growth vs Stability"],
        score: 85
      },
      purposeArchetypes: {
        primary: primaryArchetype,
        secondary: secondaryArchetype,
        alignmentIndex: Math.round(sortedArchetypes[0][1] * 20),
        narrativeInsight: `You are driven by ${primaryArchetype.toLowerCase()} motivations, with a strong secondary pull toward being a ${secondaryArchetype.toLowerCase()}. This combination suggests you thrive when you can innovate and create while making a meaningful impact on others.`
      },
      meaningFulfillment: {
        energySources,
        energyDrains: ["Repetitive tasks", "Micromanagement"],
        meaningMisalignmentRisk: 25,
        workstyleCongruence: 78
      },
      pactFramework: {
        purpose: pactPurpose,
        authenticity: pactAuthenticity,
        congruence: pactCongruence,
        trajectory: pactTrajectory,
        overallAlignment,
        strengths: pactPurpose >= 80 ? ["Purpose"] : pactAuthenticity >= 80 ? ["Authenticity"] : [],
        riskZones: pactTrajectory < 60 ? ["Trajectory"] : pactCongruence < 60 ? ["Congruence"] : []
      },
      careerAlignment: {
        workCultureFitScore: 82,
        roleMatchSummary: ["Innovation Manager", "Product Designer", "Creative Director", "Startup Founder"],
        environmentPreferences: ["Startup", "Creative Agency", "Innovation Lab"]
      }
    };
  };

  const getCurrentQuestion = () => {
    const currentSection = assessmentState.sections[assessmentState.currentSection];
    return currentSection?.questions[assessmentState.currentQuestion];
  };

  const getResponse = (questionId: string) => {
    return assessmentState.responses.find(r => r.questionId === questionId)?.value;
  };

  const isCompleted = () => {
    return assessmentState.currentSection >= assessmentState.sections.length;
  };

  const resetAssessment = () => {
    setAssessmentState({
      currentSection: 0,
      currentQuestion: 0,
      responses: [],
      startTime: new Date(),
      sections: assessmentSections.map(section => ({ ...section, completed: false }))
    });
  };

  return {
    assessmentState,
    recordResponse,
    nextQuestion,
    previousQuestion,
    calculateResults,
    getCurrentQuestion,
    getResponse,
    isCompleted,
    resetAssessment
  };
};