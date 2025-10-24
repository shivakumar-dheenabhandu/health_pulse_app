import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
  gradient?: string;
}

const PlaceholderPage = ({ title, description, gradient = "gradient-primary" }: PlaceholderPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className={`${gradient} text-white py-6 px-4 card-shadow`}>
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-white/90">{description}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="card-shadow border-0 animate-fade-in">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <div className={`w-20 h-20 ${gradient} rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4`}>
                ⚡
              </div>
              <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
              <p className="text-muted-foreground text-lg">
                This feature is under development and will be available soon.
              </p>
            </div>
            <Button
              onClick={() => navigate("/dashboard")}
              className={`${gradient} border-0`}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PlaceholderPage;
