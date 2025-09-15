import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LikertScaleProps {
  question: string;
  value: number | null;
  onChange: (value: number) => void;
  scale?: {
    min: number;
    max: number;
    labels?: { [key: number]: string };
  };
}

export const LikertScale = ({ 
  question, 
  value, 
  onChange,
  scale = { min: 1, max: 5 }
}: LikertScaleProps) => {
  const { min, max, labels } = scale;
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  
  const getLabel = (num: number) => {
    if (labels) return labels[num];
    if (max === 5) {
      const defaultLabels: { [key: number]: string } = {
        1: "Strongly Disagree",
        2: "Disagree", 
        3: "Neutral",
        4: "Agree",
        5: "Strongly Agree"
      };
      return defaultLabels[num];
    }
    return num.toString();
  };
  
  return (
    <Card className="p-6 shadow-assessment">
      <h3 className="text-lg font-medium mb-6 text-foreground">
        {question}
      </h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <Button
            key={option}
            variant={value === option ? "default" : "outline"}
            className="w-full justify-start h-auto p-4 transition-smooth"
            onClick={() => onChange(option)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{option}</span>
              <span className="text-sm opacity-75">{getLabel(option)}</span>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};