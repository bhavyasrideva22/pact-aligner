import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults as Results } from "@/types/assessment";
import { 
  Target, 
  User, 
  TrendingUp, 
  Briefcase,
  Award,
  AlertTriangle,
  Download,
  Share2
} from "lucide-react";

interface AssessmentResultsProps {
  results: Results;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getAlignmentColor = (score: number) => {
    if (score >= 80) return "text-assessment-success";
    if (score >= 50) return "text-assessment-warning";
    return "text-destructive";
  };

  const getAlignmentLabel = (score: number) => {
    if (score >= 80) return "Highly Aligned";
    if (score >= 50) return "Partially Aligned";
    return "Needs Attention";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-assessment bg-clip-text text-transparent">
          Your PVCA Assessment Results
        </h1>
        <p className="text-muted-foreground">
          Comprehensive insights into your purpose, values, and career alignment
        </p>
      </div>

      {/* Overall Alignment Score */}
      <Card className="p-6 shadow-assessment">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Overall Career Alignment</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="text-4xl font-bold text-primary">
              {results.pactFramework.overallAlignment}%
            </div>
            <Badge 
              variant="outline" 
              className={getAlignmentColor(results.pactFramework.overallAlignment)}
            >
              {getAlignmentLabel(results.pactFramework.overallAlignment)}
            </Badge>
          </div>
          <Progress value={results.pactFramework.overallAlignment} className="w-full max-w-md mx-auto" />
        </div>
      </Card>

      {/* PACT Framework Breakdown */}
      <Card className="p-6 shadow-card">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5" />
          PACT Framework Analysis
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-values-impact">{results.pactFramework.purpose}%</div>
            <div className="font-medium">Purpose</div>
            <Progress value={results.pactFramework.purpose} className="w-full" />
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-values-authenticity">{results.pactFramework.authenticity}%</div>
            <div className="font-medium">Authenticity</div>
            <Progress value={results.pactFramework.authenticity} className="w-full" />
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-values-creativity">{results.pactFramework.congruence}%</div>
            <div className="font-medium">Congruence</div>
            <Progress value={results.pactFramework.congruence} className="w-full" />
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-values-growth">{results.pactFramework.trajectory}%</div>
            <div className="font-medium">Trajectory</div>
            <Progress value={results.pactFramework.trajectory} className="w-full" />
          </div>
        </div>

        {results.pactFramework.strengths.length > 0 && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2 text-assessment-success">
                <Award className="w-4 h-4" />
                Strengths
              </h4>
              <div className="space-y-1">
                {results.pactFramework.strengths.map((strength, index) => (
                  <Badge key={index} variant="outline" className="text-assessment-success">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
            
            {results.pactFramework.riskZones.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-assessment-warning">
                  <AlertTriangle className="w-4 h-4" />
                  Areas for Attention
                </h4>
                <div className="space-y-1">
                  {results.pactFramework.riskZones.map((risk, index) => (
                    <Badge key={index} variant="outline" className="text-assessment-warning">
                      {risk}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Core Values & Purpose */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Core Values
          </h3>
          <div className="space-y-3">
            {results.coreValues.topValues.slice(0, 5).map((value, index) => (
              <div key={value} className="flex items-center justify-between">
                <span className="font-medium">#{index + 1} {value}</span>
                <Badge variant="outline">{(100 - index * 15)}% priority</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium mb-1">Value Profile:</div>
            <div className="text-sm text-muted-foreground">{results.coreValues.valueProfile}</div>
          </div>
        </Card>

        <Card className="p-6 shadow-card">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Purpose Archetype
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Primary: {results.purposeArchetypes.primary}</span>
                <Badge className="bg-gradient-assessment text-white">{results.purposeArchetypes.alignmentIndex}%</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Secondary: {results.purposeArchetypes.secondary}
              </div>
              <div className="text-sm leading-relaxed p-3 bg-muted rounded-lg">
                {results.purposeArchetypes.narrativeInsight}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Career Recommendations */}
      <Card className="p-6 shadow-assessment">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Career Environment Recommendations
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {results.careerAlignment.workCultureFitScore}%
            </div>
            <div className="text-sm text-muted-foreground">Culture Fit Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {results.meaningFulfillment.workstyleCongruence}%
            </div>
            <div className="text-sm text-muted-foreground">Workstyle Match</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-values-growth mb-1">
              {100 - results.meaningFulfillment.meaningMisalignmentRisk}%
            </div>
            <div className="text-sm text-muted-foreground">Meaning Alignment</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Recommended Roles:</h4>
            <div className="flex flex-wrap gap-2">
              {results.careerAlignment.roleMatchSummary.map((role, index) => (
                <Badge key={index} variant="outline" className="text-primary">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Energy Sources:</h4>
            <div className="flex flex-wrap gap-2">
              {results.meaningFulfillment.energySources.map((source, index) => (
                <Badge key={index} className="bg-assessment-success text-white">
                  {source}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onRestart}>
          Retake Assessment
        </Button>
        <Button className="bg-gradient-assessment text-white">
          <Download className="w-4 h-4 mr-2" />
          Download Results
        </Button>
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
};