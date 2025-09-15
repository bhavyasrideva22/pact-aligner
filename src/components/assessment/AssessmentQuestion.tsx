import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Question } from "@/types/assessment";
import { LikertScale } from "./questions/LikertScale";
import { PairedComparison } from "./questions/PairedComparison";
import { RankingQuestion } from "./questions/RankingQuestion";

interface AssessmentQuestionProps {
  question: Question;
  sectionTitle: string;
  sectionObjective: string;
  questionNumber: number;
  totalQuestions: number;
  value: string | number | string[] | null;
  onAnswer: (value: string | number | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const AssessmentQuestion = ({
  question,
  sectionTitle,
  sectionObjective,
  questionNumber,
  totalQuestions,
  value,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}: AssessmentQuestionProps) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'likert':
        return (
          <LikertScale
            question={question.question}
            value={value as number | null}
            onChange={onAnswer}
            scale={question.scale}
          />
        );
      
      case 'paired-comparison':
        return (
          <PairedComparison
            question={question.question}
            optionA={question.options?.[0] || ''}
            optionB={question.options?.[1] || ''}
            value={value as string | null}
            onChange={onAnswer}
          />
        );
      
      case 'ranking':
        return (
          <RankingQuestion
            question={question.question}
            options={question.options || []}
            maxSelections={5}
            value={value as string[] || []}
            onChange={onAnswer}
          />
        );
      
      case 'multiple-choice':
        return (
          <Card className="p-6 shadow-assessment">
            <h3 className="text-lg font-medium mb-6 text-foreground">
              {question.question}
            </h3>
            <div className="space-y-3">
              {question.options?.map((option) => (
                <Button
                  key={option}
                  variant={value === option ? "default" : "outline"}
                  className="w-full justify-start h-auto p-4 transition-smooth"
                  onClick={() => onAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        );
      
      case 'rating-scale':
        return (
          <Card className="p-6 shadow-assessment">
            <h3 className="text-lg font-medium mb-6 text-foreground">
              {question.question}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{question.scale?.labels?.[question.scale.min] || question.scale?.min}</span>
                <span>{question.scale?.labels?.[question.scale?.max || 10] || question.scale?.max}</span>
              </div>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: (question.scale?.max || 10) - (question.scale?.min || 1) + 1 }, (_, i) => {
                  const scaleValue = (question.scale?.min || 1) + i;
                  return (
                    <Button
                      key={scaleValue}
                      variant={value === scaleValue ? "default" : "outline"}
                      className="w-12 h-12 p-0 transition-smooth"
                      onClick={() => onAnswer(scaleValue)}
                    >
                      {scaleValue}
                    </Button>
                  );
                })}
              </div>
              {question.scale?.labels && (
                <div className="text-center text-sm text-muted-foreground">
                  {value && question.scale.labels[value as number]}
                </div>
              )}
            </div>
          </Card>
        );
      
      default:
        return null;
    }
  };

  const hasAnswer = () => {
    if (question.type === 'ranking') {
      return Array.isArray(value) && value.length > 0;
    }
    return value !== null && value !== undefined;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{sectionTitle}</h1>
        <p className="text-muted-foreground">{sectionObjective}</p>
        <div className="text-sm text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>

      {/* Question Content */}
      {renderQuestion()}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {hasAnswer() ? "Answer recorded" : "Please select an answer"}
        </div>

        <Button
          onClick={onNext}
          disabled={!canGoNext || !hasAnswer()}
          className="flex items-center gap-2 bg-gradient-assessment text-white"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};