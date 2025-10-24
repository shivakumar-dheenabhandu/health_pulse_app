import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pill, FlaskConical, Stethoscope, Plus, Bell, TrendingUp } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import HealthSummaryCard from "@/components/HealthSummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [reminders] = useState([
    { id: 1, title: "Take Metformin", time: "9:00 AM", type: "medicine" },
    { id: 2, title: "BP Check-up", time: "Tomorrow, 10:00 AM", type: "appointment" },
    { id: 3, title: "Blood Test", time: "Mar 15, 2025", type: "test" },
  ]);

  const quickActions = [
    { icon: Stethoscope, label: "Book Doctor", path: "/consult-tests", gradient: "gradient-primary" },
    { icon: Pill, label: "Order Medicine", path: "/medicines", gradient: "gradient-secondary" },
    { icon: Plus, label: "Add Reading", path: "/health-tracker", gradient: "gradient-accent" },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <header className="gradient-wellness text-white py-6 px-4 card-shadow">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">Good Morning!</h1>
              <p className="text-white/90">Here's your health summary</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/30 text-white relative"
              onClick={() => navigate("/reminders")}
            >
              <Bell className="w-5 h-5" />
              {reminders.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {reminders.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Health Summary Cards */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Health Overview</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/health-tracker")}
              className="text-primary"
            >
              View All →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <HealthSummaryCard
              title="Blood Pressure"
              value="120/80"
              unit="mmHg"
              status="normal"
              icon={TrendingUp}
              trend="stable"
            />
            <HealthSummaryCard
              title="Blood Sugar"
              value="95"
              unit="mg/dL"
              status="normal"
              icon={TrendingUp}
              trend="down"
            />
            <HealthSummaryCard
              title="Monthly Expense"
              value="₹4,250"
              status="normal"
              icon={TrendingUp}
              trend="up"
            />
            <HealthSummaryCard
              title="Active Meds"
              value="3"
              status="normal"
              icon={Pill}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={action.label}
                className="card-shadow border-0 cursor-pointer transition-smooth hover:scale-105 overflow-hidden"
                onClick={() => navigate(action.path)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${action.gradient} p-4 rounded-2xl mx-auto w-fit mb-3`}>
                    <action.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-medium">{action.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Reminders */}
        <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Reminders</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/reminders")}
              className="text-primary"
            >
              View All →
            </Button>
          </div>
          <Card className="card-shadow border-0">
            <CardContent className="p-4 space-y-3">
              {reminders.map((reminder, index) => (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between p-3 rounded-lg bg-muted/50 transition-smooth hover:bg-muted ${
                    index < reminders.length - 1 ? "mb-2" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      reminder.type === "medicine" ? "bg-primary/10" :
                      reminder.type === "appointment" ? "bg-secondary/10" : "bg-accent/10"
                    }`}>
                      {reminder.type === "medicine" && <Pill className="w-4 h-4 text-primary" />}
                      {reminder.type === "appointment" && <Stethoscope className="w-4 h-4 text-secondary" />}
                      {reminder.type === "test" && <FlaskConical className="w-4 h-4 text-accent-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{reminder.title}</p>
                      <p className="text-xs text-muted-foreground">{reminder.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {reminder.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="card-shadow border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Latest Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paracetamol 500mg</span>
                  <span className="font-medium">₹25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vitamin D3</span>
                  <span className="font-medium">₹180</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Metformin 500mg</span>
                  <span className="font-medium">₹95</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Upcoming Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Complete Blood Count</span>
                  <Badge variant="secondary" className="text-xs">Mar 15</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lipid Profile</span>
                  <Badge variant="secondary" className="text-xs">Mar 20</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Dashboard;
