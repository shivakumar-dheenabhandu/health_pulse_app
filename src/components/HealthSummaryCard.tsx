import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HealthSummaryCardProps {
  title: string;
  value: string;
  unit?: string;
  status: "normal" | "warning" | "alert";
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
}

const HealthSummaryCard = ({ 
  title, 
  value, 
  unit, 
  status, 
  icon: Icon,
  trend 
}: HealthSummaryCardProps) => {
  const statusColors = {
    normal: "text-secondary",
    warning: "text-accent",
    alert: "text-destructive"
  };

  const statusBg = {
    normal: "bg-secondary/10",
    warning: "bg-accent/10",
    alert: "bg-destructive/10"
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→"
  };

  return (
    <Card className="card-shadow border-0 transition-smooth hover:scale-105">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`${statusBg[status]} p-2 rounded-lg`}>
            <Icon className={`w-5 h-5 ${statusColors[status]}`} strokeWidth={2} />
          </div>
          {trend && (
            <span className={`text-lg font-bold ${statusColors[status]}`}>
              {trendIcons[trend]}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        <p className={`text-xs mt-2 ${statusColors[status]}`}>
          {status === "normal" ? "Normal" : status === "warning" ? "Monitor" : "Attention Needed"}
        </p>
      </CardContent>
    </Card>
  );
};

export default HealthSummaryCard;
