import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Users, TrendingUp, ArrowRight } from "lucide-react";

interface AssessmentWelcomeProps {
  onStart: () => void;
}

export const AssessmentWelcome = ({ onStart }: AssessmentWelcomeProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-gradient-assessment text-white px-4 py-2 rounded-full text-sm font-medium">
          <Target className="w-4 h-4" />
          Professional Career Assessment
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-assessment bg-clip-text text-transparent">
          Vision Clarity & Future Mapping
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your purpose, align your values, and design a career that truly fulfills you through our comprehensive PVCA assessment.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center shadow-card">
          <div className="w-12 h-12 bg-gradient-assessment rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Purpose Discovery</h3>
          <p className="text-sm text-muted-foreground">
            Identify your core motivations and life purpose archetypes
          </p>
        </Card>
        
        <Card className="p-6 text-center shadow-card">
          <div className="w-12 h-12 bg-gradient-assessment rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Values Alignment</h3>
          <p className="text-sm text-muted-foreground">
            Discover your core values and resolve internal conflicts
          </p>
        </Card>
        
        <Card className="p-6 text-center shadow-card">
          <div className="w-12 h-12 bg-gradient-assessment rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold mb-2">Career Mapping</h3>
          <p className="text-sm text-muted-foreground">
            Get personalized career recommendations and next steps
          </p>
        </Card>
      </div>

      {/* Assessment Info */}
      <Card className="p-6 shadow-assessment">
        <h2 className="text-2xl font-semibold mb-4">What You'll Discover</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <div>
                <h4 className="font-medium">Core Values Hierarchy</h4>
                <p className="text-sm text-muted-foreground">Your prioritized values and conflict resolution strategies</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <div>
                <h4 className="font-medium">Purpose Archetype</h4>
                <p className="text-sm text-muted-foreground">Your dominant life purpose and motivation style</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <div>
                <h4 className="font-medium">PACT Framework Score</h4>
                <p className="text-sm text-muted-foreground">Purpose, Authenticity, Congruence, and Trajectory alignment</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <div>
                <h4 className="font-medium">Fulfillment Factors</h4>
                <p className="text-sm text-muted-foreground">What energizes you and what drains your motivation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">5</Badge>
              <div>
                <h4 className="font-medium">Career Environment Match</h4>
                <p className="text-sm text-muted-foreground">Ideal work cultures and role recommendations</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="mt-0.5">6</Badge>
              <div>
                <h4 className="font-medium">Actionable Next Steps</h4>
                <p className="text-sm text-muted-foreground">Personalized career experiments and development path</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Time and Privacy */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>Estimated time: 20-30 minutes</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Your responses are private and secure
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-gradient-assessment text-white font-semibold px-8 py-4 text-lg shadow-assessment transition-bounce hover:scale-105"
        >
          Start Assessment
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          No signup required • Free comprehensive report
        </p>
      </div>
    </div>
  );
};