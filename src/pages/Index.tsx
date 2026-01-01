import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Timer, 
  Users, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Timer,
      title: 'Synced Pomodoro Timers',
      description: 'Study in sync with your group. Everyone sees the same timer, keeping you all focused together.',
    },
    {
      icon: Users,
      title: 'Collaborative Spaces',
      description: 'Share notes in real-time, chat with study partners, and see who\'s actively studying.',
    },
    {
      icon: Zap,
      title: 'Track Your Progress',
      description: 'Build study streaks, earn pomodoros, and climb the leaderboard. Stay motivated!',
    },
  ];

  const benefits = [
    'Free to use',
    'Real-time synchronization',
    'Works on any device',
    'No downloads required',
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero opacity-5" />
        
        {/* Navigation */}
        <nav className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-display font-bold text-2xl">SyncStudy</span>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Study smarter, together
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold max-w-4xl mx-auto leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The best way to
            <span className="text-gradient-primary"> study with friends</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            SyncStudy helps you stay focused and motivated by studying together in real-time. 
            Shared timers, collaborative notes, and friendly competition.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              variant="gradient" 
              size="xl" 
              onClick={() => navigate('/auth')}
              className="gap-2"
            >
              Start Studying Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything you need to study better
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            SyncStudy combines the best productivity techniques with real-time collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative px-8 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to study smarter?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of students who are already using SyncStudy to stay focused and achieve their goals.
            </p>
            <Button 
              size="xl" 
              onClick={() => navigate('/auth')}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-display font-semibold">SyncStudy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SyncStudy. Study together, achieve more.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
