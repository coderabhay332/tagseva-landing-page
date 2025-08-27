"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { 
  IdCard, 
  Component, 
  CardSim, 
  CreditCard, 
  LayoutPanelTop, 
  ChevronUp 
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string[];
}

const features: Feature[] = [
  {
    id: "auth",
    icon: IdCard,
    title: "User Authentication & Management",
    description: "Secure user registration and profile management system",
    details: [
      "Multi-factor authentication with OTP verification",
      "Comprehensive profile management with document validation",
      "Role-based access control for users and administrators"
    ]
  },
  {
    id: "application",
    icon: Component,
    title: "Application Creation & Management",
    description: "Streamlined FastTag application process with tracking",
    details: [
      "Step-by-step application wizard with progress tracking",
      "Real-time application status updates and notifications",
      "Vehicle details management with multiple vehicle support"
    ]
  },
  {
    id: "documents",
    icon: CardSim,
    title: "Document Upload & Management",
    description: "Secure document handling with validation and storage",
    details: [
      "Drag-and-drop file upload with format validation",
      "Automatic document verification and quality checks",
      "Secure cloud storage with encryption and backup"
    ]
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Payment Processing",
    description: "Integrated payment gateway supporting multiple methods",
    details: [
      "Supports net banking, debit/credit cards & UPI payments",
      "Automatic fee calculation by vehicle type and bank",
      "Secure transaction processing with instant confirmation"
    ]
  },
  {
    id: "admin",
    icon: LayoutPanelTop,
    title: "Admin Dashboard",
    description: "Comprehensive administrative panel for approvals and tracking",
    details: [
      "Real-time application monitoring and approval workflows",
      "Analytics dashboard with reports and insights",
      "Bulk operations and automated notification system"
    ]
  }
];

interface FeatureCardProps {
  feature: Feature;
  isExpanded: boolean;
  onToggle: () => void;
}

function FeatureCard({ feature, isExpanded, onToggle }: FeatureCardProps) {
  const IconComponent = feature.icon;

  return (
    <Card className="group relative overflow-hidden bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <div className="w-full text-left">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-primary/5 transition-colors duration-300">
                    <IconComponent className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <ChevronUp 
                  className={`h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-300 ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardHeader>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <CardContent className="pt-0 pb-6">
            <div className="space-y-3">
              {feature.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-muted">
            <div className="h-6 w-6 bg-muted-foreground/20 rounded" />
          </div>
          <div className="h-4 w-4 bg-muted-foreground/20 rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-3/4 bg-muted-foreground/20 rounded" />
          <div className="h-4 w-full bg-muted-foreground/10 rounded" />
          <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />
        </div>
      </CardHeader>
    </Card>
  );
}

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className = "" }: FeaturesSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate loading state
    const loadTimer = setTimeout(() => {
      if (Math.random() > 0.9) { // 10% chance of error for demo
        setHasError(true);
      }
      setIsLoading(false);
    }, Math.random() * 300 + 300); // 300-600ms

    return () => clearTimeout(loadTimer);
  }, []);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    
    const retryTimer = setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 300 + 300);

    return () => clearTimeout(retryTimer);
  };

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  if (hasError) {
    return (
      <section className={`py-16 px-4 ${className}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="p-8 rounded-lg border border-destructive/20 bg-destructive/5">
              <p className="text-destructive font-medium mb-4">
                Failed to load features. Please try again.
              </p>
              <Button 
                onClick={handleRetry}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
            Core Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to get FastTag
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete end-to-end solution for FastTag applications with secure processing and real-time tracking
          </p>
        </div>

        {/* Features Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                isExpanded={expandedCards.has(feature.id)}
                onToggle={() => toggleCard(feature.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}