"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronUp, PanelRight } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  password?: string;
}

export default function HeroHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (activeTab === "signup") {
      if (!data.name.trim()) newErrors.name = "Name is required";
      if (!data.mobile.trim()) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^\d{10}$/.test(data.mobile)) {
        newErrors.mobile = "Mobile number must be 10 digits";
      }
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsDialogOpen(false);
    
    // Reset form
    setFormData({ name: "", email: "", mobile: "", password: "" });
    setErrors({});
    
    toast.success("Account created — continue to application");
  };

  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "For Businesses", href: "#business" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Main Header */}
      <div className="w-full bg-card border-b border-border sticky top-0 z-50">
        <header className="w-full px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">TagSeva</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Sign In */}
            <div className="hidden md:block">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center">Get Started with TagSeva</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signup" className="space-y-4 mt-6">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            disabled={isLoading}
                          />
                          {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={isLoading}
                          />
                          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input
                            id="mobile"
                            placeholder="Enter 10-digit mobile number"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange("mobile", e.target.value)}
                            disabled={isLoading}
                          />
                          {errors.mobile && <p className="text-destructive text-sm">{errors.mobile}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            disabled={isLoading}
                          />
                          {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Creating Account..." : "Continue"}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signin" className="space-y-4 mt-6">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <Input
                            id="signin-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={isLoading}
                          />
                          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <Input
                            id="signin-password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            disabled={isLoading}
                          />
                          {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <PanelRight className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 mt-8">
                    <nav className="flex flex-col gap-4">
                      {navigationItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.href)}
                          className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </nav>
                    
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">Sign In</Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="w-full px-4 pb-16 pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
                    <span className="text-primary">FastTag Made Simple</span> – Apply, Pay & Track with TagSeva
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Complete your FastTag application online with document upload, secure payment processing, and home delivery service.
                  </p>
                  
                  <div className="bg-accent rounded-lg p-4 border-l-4 border-primary">
                    <p className="text-sm font-medium text-foreground">
                      FastTag delivered to your door (+₹100 delivery fee)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="text-base px-8">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  
                  <button
                    onClick={() => handleNavClick("#how-it-works")}
                    className="text-primary hover:text-primary/80 transition-colors text-sm font-medium underline underline-offset-4"
                  >
                    Learn how it works
                  </button>
                </div>
              </div>

              {/* Right Column - Illustration */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-secondary to-accent rounded-lg p-6 border border-border">
                  <div className="bg-card rounded-lg p-6 space-y-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ChevronUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">FastTag Application</h3>
                        <p className="text-sm text-muted-foreground">Quick & Secure Process</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Application Fee</span>
                        <span className="font-medium text-foreground">₹400</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Delivery Fee</span>
                        <span className="font-medium text-foreground">₹100</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-foreground">Total Amount</span>
                        <span className="font-bold text-primary">₹500</span>
                      </div>
                    </div>
                    
                    <div className="bg-secondary rounded-md p-3">
                      <p className="text-xs text-muted-foreground">
                        ⏱️ Estimated delivery: 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}