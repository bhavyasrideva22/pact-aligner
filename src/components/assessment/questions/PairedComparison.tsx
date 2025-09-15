import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface PairedComparisonProps {
  question: string;
  optionA: string;
  optionB: string;
  value: string | null;
  onChange: (value: string) => void;
}

export const PairedComparison = ({ 
  question, 
  optionA, 
  optionB, 
  value, 
  onChange 
}: PairedComparisonProps) => {
  return (
    <Card className="p-6 shadow-assessment">
      <h3 className="text-lg font-medium mb-6 text-foreground text-center">
        {question}
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Button
          variant={value === optionA ? "default" : "outline"}
          className="flex-1 h-auto p-6 transition-bounce"
          onClick={() => onChange(optionA)}
        >
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Option A</div>
            <div className="text-sm leading-relaxed">{optionA}</div>
          </div>
        </Button>
        
        <div className="flex items-center justify-center p-4">
          <div className="text-muted-foreground text-sm font-medium">OR</div>
        </div>
        
        <Button
          variant={value === optionB ? "default" : "outline"}
          className="flex-1 h-auto p-6 transition-bounce"
          onClick={() => onChange(optionB)}
        >
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Option B</div>
            <div className="text-sm leading-relaxed">{optionB}</div>
          </div>
        </Button>
      </div>
    </Card>
  );
};