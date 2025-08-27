"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Tags,
  Copyright,
  MessageSquareDot,
  Linkedin,
  Rss
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Successfully subscribed to updates!", {
        description: "You'll receive the latest TagSeva news and updates."
      });
      
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-muted border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Left: Brand and tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Tags className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-semibold text-foreground">
                TagSeva
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional document delivery services across India with transparent pricing and reliable tracking.
            </p>
          </div>

          {/* Center: Navigation links */}
          <div className="lg:flex lg:justify-center">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Quick Links</h3>
              <nav className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 lg:flex-col lg:space-x-0 lg:space-y-2">
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/support"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </a>
              </nav>
            </div>
          </div>

          {/* Right: Social links and subscription */}
          <div className="space-y-6">
            {/* Social icons */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/tagseva"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow TagSeva on Twitter"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/tagseva"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow TagSeva on LinkedIn"
                  className="text-muted-foreground hover:text-[#0077B5] transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/tagseva"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow TagSeva on Instagram"
                  className="text-muted-foreground hover:text-[#E4405F] transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.017 0C8.396 0 7.99.011 6.756.058 5.521.106 4.677.276 3.944.523a6.958 6.958 0 0 0-2.515 1.637A6.956 6.956 0 0 0 .823 4.675C.576 5.408.406 6.251.358 7.486.011 8.72 0 9.126 0 12.017s.011 3.297.058 4.532c.048 1.235.218 2.079.465 2.812a6.956 6.956 0 0 0 1.637 2.515 6.956 6.956 0 0 0 2.515 1.637c.733.247 1.577.417 2.812.465 1.235.047 1.641.058 4.532.058s3.297-.011 4.532-.058c1.235-.048 2.079-.218 2.812-.465a6.956 6.956 0 0 0 2.515-1.637 6.956 6.956 0 0 0 1.637-2.515c.247-.733.417-1.577.465-2.812.047-1.235.058-1.641.058-4.532s-.011-3.297-.058-4.532c-.048-1.235-.218-2.079-.465-2.812a6.956 6.956 0 0 0-1.637-2.515A6.956 6.956 0 0 0 19.325.823C18.592.576 17.748.406 16.513.358 15.279.011 14.873 0 12.017 0zm0 2.17c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.227.415.559.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.054 1.17-.249 1.805-.413 2.227a3.81 3.81 0 0 1-.896 1.382 3.744 3.744 0 0 1-1.382.896c-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.054-1.805-.249-2.227-.413a3.81 3.81 0 0 1-1.382-.896 3.744 3.744 0 0 1-.896-1.382c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.227.217-.559.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.265-.058 1.645-.07 4.849-.07zm0 3.683a6.147 6.147 0 1 0 0 12.294 6.147 6.147 0 0 0 0-12.294zm0 10.14a3.993 3.993 0 1 1 0-7.986 3.993 3.993 0 0 1 0 7.986zm7.846-10.405a1.437 1.437 0 1 1-2.874 0 1.437 1.437 0 0 1 2.874 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter subscription */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">Subscribe for Updates</h3>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className="text-sm"
                      disabled={isSubmitting}
                    />
                    {emailError && (
                      <p className="text-xs text-destructive mt-1">{emailError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting}
                    className="shrink-0"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        <span className="sr-only">Subscribing...</span>
                      </div>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Copyright className="h-4 w-4" />
              <span>2024 TagSeva. All rights reserved.</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Made in India with ❤️
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}