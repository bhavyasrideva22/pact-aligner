import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface AssessmentProgressProps {
  currentSection: number;
  totalSections: number;
  sectionTitles: string[];
}

export const AssessmentProgress = ({ 
  currentSection, 
  totalSections, 
  sectionTitles 
}: AssessmentProgressProps) => {
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;
  
  return (
    <div className="bg-card shadow-card rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Assessment Progress</h2>
        <span className="text-sm text-muted-foreground">
          Section {currentSection + 1} of {totalSections}
        </span>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="mb-4"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {sectionTitles.slice(0, 6).map((title, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 text-sm"
          >
            {index < currentSection ? (
              <CheckCircle2 className="w-4 h-4 text-assessment-success" />
            ) : index === currentSection ? (
              <Circle className="w-4 h-4 text-assessment-progress fill-current" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground" />
            )}
            <span className={
              index <= currentSection 
                ? "text-foreground font-medium" 
                : "text-muted-foreground"
            }>
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};