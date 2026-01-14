import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ServicePageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ServicePage Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-6 md:px-8 max-w-3xl py-24">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Something went wrong
                </h1>
                
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We encountered an error loading this page. Please try again or navigate back to the homepage.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => window.history.back()}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                  </Button>
                  
                  <Button asChild className="gap-2">
                    <Link to="/">
                      <Home className="h-4 w-4" />
                      Homepage
                    </Link>
                  </Button>
                </div>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="mt-8 p-4 bg-muted rounded-lg text-left overflow-auto">
                    <p className="text-sm font-mono text-destructive">
                      {this.state.error.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ServicePageErrorBoundary;
