import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { trackConversion } from '@/utils/analytics';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    value: number;
  }[];
}

const questions: Question[] = [
  {
    id: 'climate_commitment',
    question: 'How clear and credible is your climate commitment to external stakeholders?',
    options: [
      { label: 'Very clear - we have a comprehensive strategy', value: 4 },
      { label: 'Somewhat clear - but could be stronger', value: 3 },
      { label: 'Unclear - struggling to articulate it', value: 2 },
      { label: 'No formal commitment yet', value: 1 },
    ],
  },
  {
    id: 'stakeholder_trust',
    question: 'How confident are you in your stakeholder trust regarding climate initiatives?',
    options: [
      { label: 'Very confident - strong reputation', value: 4 },
      { label: 'Moderately confident', value: 3 },
      { label: 'Concerned about skepticism', value: 2 },
      { label: 'Facing credibility challenges', value: 1 },
    ],
  },
  {
    id: 'communication_strategy',
    question: 'Do you have a strategic climate communications framework?',
    options: [
      { label: 'Yes - comprehensive and tested', value: 4 },
      { label: 'Partial framework in place', value: 3 },
      { label: 'Ad-hoc communications only', value: 2 },
      { label: 'No framework currently', value: 1 },
    ],
  },
  {
    id: 'competitive_positioning',
    question: 'How well does your climate narrative differentiate you from competitors?',
    options: [
      { label: 'Strong differentiation', value: 4 },
      { label: 'Some differentiation', value: 3 },
      { label: 'Similar to competitors', value: 2 },
      { label: 'Not differentiated', value: 1 },
    ],
  },
  {
    id: 'internal_alignment',
    question: 'How aligned is your organization on climate messaging?',
    options: [
      { label: 'Fully aligned across all levels', value: 4 },
      { label: 'Mostly aligned with some gaps', value: 3 },
      { label: 'Significant alignment issues', value: 2 },
      { label: 'No clear alignment', value: 1 },
    ],
  },
];

const AssessmentQuiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: selectedAnswer,
    };
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (isLastQuestion) {
      setShowResults(true);
      const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
      trackConversion.quizCompleted('climate_readiness', totalScore);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || null);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 80) {
      return {
        level: 'Advanced',
        color: 'text-green-600',
        bgColor: 'bg-green-600',
        message: 'You have a strong climate communications foundation!',
        recommendation: 'Focus on optimization and thought leadership positioning to stay ahead of the curve.',
      };
    } else if (percentage >= 60) {
      return {
        level: 'Developing',
        color: 'text-blue-600',
        bgColor: 'bg-blue-600',
        message: 'You\'re on the right track with room for strategic improvement.',
        recommendation: 'Strengthen your framework with expert guidance to maximize credibility and impact.',
      };
    } else if (percentage >= 40) {
      return {
        level: 'Emerging',
        color: 'text-amber-600',
        bgColor: 'bg-amber-600',
        message: 'You have foundational elements but need strategic support.',
        recommendation: 'Partner with experts to build a comprehensive climate communications strategy.',
      };
    } else {
      return {
        level: 'Starting Out',
        color: 'text-red-600',
        bgColor: 'bg-red-600',
        message: 'Time to establish a solid climate communications foundation.',
        recommendation: 'Start with a strategic assessment to identify key priorities and quick wins.',
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const results = calculateResults();
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      const maxScore = questions.length * 4;

      // Format assessment details
      const assessmentDetails = questions.map((q, idx) => 
        `${idx + 1}. ${q.question}\n   Answer: ${q.options.find(opt => opt.value === answers[q.id])?.label || 'N/A'} (${answers[q.id]} points)`
      ).join('\n\n');

      const message = `CLIMATE COMMUNICATIONS READINESS ASSESSMENT RESULTS

SCORE: ${totalScore}/${maxScore} - ${results.level}

ASSESSMENT: ${results.message}

RECOMMENDATION: ${results.recommendation}

DETAILED RESPONSES:
${assessmentDetails}

---
The user would like to schedule a consultation to discuss these results.`;

      // Send email via edge function
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          message: message,
          submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        },
      });

      if (error) throw error;

      toast({
        title: 'Consultation Request Sent!',
        description: 'We\'ll be in touch shortly to schedule your consultation.',
      });

      setShowConsultationForm(false);
      trackConversion.leadSubmission('assessment_consultation');
    } catch (error) {
      console.error('Error submitting consultation request:', error);
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) {
    const results = calculateResults();
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 4;

    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 md:p-12 glass-card text-center">
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${results.bgColor} mb-6`}>
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Climate Communications Readiness
              </h2>
              <div className={`text-5xl font-bold mb-2 ${results.color}`}>
                {results.level}
              </div>
              <p className="text-xl text-muted-foreground mb-6">
                Score: {totalScore} / {maxScore}
              </p>
            </div>

            <div className="space-y-6 text-left mb-8">
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-2">Assessment</h3>
                <p className="text-muted-foreground">{results.message}</p>
              </div>

              <div className="p-6 bg-background/80 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-2">Recommendation</h3>
                <p className="text-muted-foreground">{results.recommendation}</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-primary/10 to-background rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Schedule a free consultation to discuss your results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Download our Climate Communications Playbook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Explore our proven frameworks and case studies</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <Button
                onClick={() => setShowConsultationForm(true)}
                size="lg"
                className="flex-1"
              >
                Schedule Consultation
              </Button>
              <Button
                onClick={resetQuiz}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Retake Assessment
              </Button>
            </div>
          </Card>

          <Dialog open={showConsultationForm} onOpenChange={setShowConsultationForm}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Your Consultation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your assessment results will be shared with our team to prepare for your consultation.
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowConsultationForm(false)}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ClipboardList className="h-4 w-4" />
            2-Minute Assessment
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Climate Communications Readiness Check
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover where you stand and what's possible
          </p>
        </div>

        <Card className="p-8 md:p-12 glass-card">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 leading-tight">
              {questions[currentQuestion].question}
            </h3>

            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5 ${
                    selectedAnswer === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 sm:flex-none"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="flex-1 sm:flex-none"
            >
              {isLastQuestion ? 'See Results' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AssessmentQuiz;
