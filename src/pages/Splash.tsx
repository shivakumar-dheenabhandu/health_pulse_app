import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-wellness">
      <div className="animate-scale-in">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl">
            <Heart className="w-20 h-20 text-white" strokeWidth={2} />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 text-center">HealSync</h1>
        <p className="text-xl text-white/90 text-center font-medium">Your Health, Simplified</p>
      </div>
      
      <div className="absolute bottom-12 animate-fade-in">
        <p className="text-white/70 text-sm">One App. Total Care.</p>
      </div>
    </div>
  );
};

export default Splash;
