import { useState } from "react";
import { AssessmentWelcome } from "@/components/assessment/AssessmentWelcome";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { AssessmentQuestion } from "@/components/assessment/AssessmentQuestion";
import { AssessmentResults } from "@/components/assessment/AssessmentResults";
import { useAssessment } from "@/hooks/useAssessment";

type AssessmentPhase = 'welcome' | 'assessment' | 'results';

const Index = () => {
  const [phase, setPhase] = useState<AssessmentPhase>('welcome');
  
  const {
    assessmentState,
    recordResponse,
    nextQuestion,
    previousQuestion,
    calculateResults,
    getCurrentQuestion,
    getResponse,
    isCompleted,
    resetAssessment
  } = useAssessment();

  const handleStart = () => {
    setPhase('assessment');
  };

  const handleNext = () => {
    nextQuestion();
    if (isCompleted()) {
      setPhase('results');
    }
  };

  const handleRestart = () => {
    resetAssessment();
    setPhase('welcome');
  };

  const handleAnswer = (questionId: string, value: string | number | string[]) => {
    recordResponse(questionId, value);
  };

  if (phase === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-insight">
        <AssessmentWelcome onStart={handleStart} />
      </div>
    );
  }

  if (phase === 'results') {
    const results = calculateResults();
    return (
      <div className="min-h-screen bg-gradient-insight">
        <AssessmentResults results={results} onRestart={handleRestart} />
      </div>
    );
  }

  // Assessment phase
  const currentQuestion = getCurrentQuestion();
  const currentResponse = currentQuestion ? getResponse(currentQuestion.id) : null;
  
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const currentSection = assessmentState.sections[assessmentState.currentSection];
  const totalQuestions = assessmentState.sections.reduce((acc, section) => acc + section.questions.length, 0);
  const currentQuestionNumber = assessmentState.sections
    .slice(0, assessmentState.currentSection)
    .reduce((acc, section) => acc + section.questions.length, 0) + assessmentState.currentQuestion + 1;

  return (
    <div className="min-h-screen bg-gradient-insight">
      <div className="container mx-auto py-8">
        <AssessmentProgress
          currentSection={assessmentState.currentSection}
          totalSections={assessmentState.sections.length}
          sectionTitles={assessmentState.sections.map(s => s.title)}
        />
        
        <AssessmentQuestion
          question={currentQuestion}
          sectionTitle={currentSection.title}
          sectionObjective={currentSection.objective}
          questionNumber={currentQuestionNumber}
          totalQuestions={totalQuestions}
          value={currentResponse || null}
          onAnswer={(value) => handleAnswer(currentQuestion.id, value)}
          onNext={handleNext}
          onPrevious={previousQuestion}
          canGoNext={true}
          canGoPrevious={assessmentState.currentSection > 0 || assessmentState.currentQuestion > 0}
        />
      </div>
    </div>
  );
};

export default Index;