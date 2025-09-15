import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Star } from "lucide-react";

interface RankingQuestionProps {
  question: string;
  options: string[];
  maxSelections: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export const RankingQuestion = ({ 
  question, 
  options, 
  maxSelections,
  value,
  onChange 
}: RankingQuestionProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(value || []);
  
  const handleToggleItem = (item: string) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : selectedItems.length < maxSelections 
        ? [...selectedItems, item]
        : selectedItems;
    
    setSelectedItems(newSelection);
    onChange(newSelection);
  };
  
  const getRank = (item: string) => {
    const index = selectedItems.indexOf(item);
    return index >= 0 ? index + 1 : null;
  };
  
  return (
    <Card className="p-6 shadow-assessment">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-foreground">
          {question}
        </h3>
        <p className="text-sm text-muted-foreground">
          Select your top {maxSelections} choices. Click to add/remove items.
        </p>
        <div className="mt-2">
          <Badge variant="outline">
            {selectedItems.length} of {maxSelections} selected
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => {
          const rank = getRank(option);
          const isSelected = rank !== null;
          
          return (
            <Button
              key={option}
              variant={isSelected ? "default" : "outline"}
              className="h-auto p-4 justify-start relative transition-smooth"
              onClick={() => handleToggleItem(option)}
              disabled={!isSelected && selectedItems.length >= maxSelections}
            >
              <div className="flex items-center gap-3 w-full">
                {isSelected && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">#{rank}</span>
                  </div>
                )}
                <span className="flex-1 text-left">{option}</span>
              </div>
            </Button>
          );
        })}
      </div>
      
      {selectedItems.length > 0 && (
        <div className="mt-6 p-4 bg-accent-light rounded-lg">
          <h4 className="font-medium mb-2 text-accent-foreground">Your Ranking:</h4>
          <ol className="text-sm space-y-1">
            {selectedItems.map((item, index) => (
              <li key={item} className="flex items-center gap-2">
                <span className="font-bold text-accent">#{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Card>
  );
};