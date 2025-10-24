import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  onClick?: () => void;
  gradient?: "primary" | "secondary" | "wellness";
}

const DashboardCard = ({ title, icon: Icon, description, onClick, gradient = "primary" }: DashboardCardProps) => {
  const gradientClass = gradient === "primary" ? "gradient-primary" : gradient === "secondary" ? "gradient-secondary" : "gradient-wellness";
  
  return (
    <Card 
      className="card-shadow border-0 cursor-pointer transition-smooth hover:scale-105 hover:elevated-shadow overflow-hidden"
      onClick={onClick}
    >
      <div className={`h-2 ${gradientClass}`} />
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`${gradientClass} p-3 rounded-xl`}>
            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
