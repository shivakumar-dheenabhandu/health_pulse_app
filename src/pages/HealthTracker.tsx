import { useState } from "react";
import { Plus, Download, TrendingUp } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const mockData = [
  { date: "Jan 1", bp: 120, sugar: 95 },
  { date: "Jan 5", bp: 118, sugar: 92 },
  { date: "Jan 10", bp: 122, sugar: 98 },
  { date: "Jan 15", bp: 119, sugar: 94 },
  { date: "Jan 20", bp: 121, sugar: 96 },
  { date: "Jan 25", bp: 117, sugar: 91 },
  { date: "Jan 30", bp: 120, sugar: 95 },
];

const yearlyData = [
  { month: "Jan", bp: 119, sugar: 94 },
  { month: "Feb", bp: 120, sugar: 95 },
  { month: "Mar", bp: 118, sugar: 93 },
  { month: "Apr", bp: 121, sugar: 96 },
  { month: "May", bp: 119, sugar: 94 },
  { month: "Jun", bp: 120, sugar: 95 },
];

const HealthTracker = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reading added successfully!");
    setShowAddForm(false);
  };

  const handleExportData = () => {
    toast.success("Health report exported successfully!");
  };

  return (
    <MainLayout>
      <header className="gradient-primary text-white py-6 px-4 card-shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Health Tracker</h1>
          <p className="text-white/90">Monitor your vitals and trends</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="gradient-primary border-0 flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Reading
          </Button>
          <Button
            onClick={handleExportData}
            variant="outline"
            className="flex-1 sm:flex-initial"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {showAddForm && (
          <Card className="card-shadow border-0 animate-slide-up">
            <CardHeader>
              <CardTitle>Add New Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddReading} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bp-systolic">BP Systolic</Label>
                  <Input id="bp-systolic" type="number" placeholder="120" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bp-diastolic">BP Diastolic</Label>
                  <Input id="bp-diastolic" type="number" placeholder="80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sugar">Blood Sugar (mg/dL)</Label>
                  <Input id="sugar" type="number" placeholder="95" />
                </div>
                <div className="md:col-span-3">
                  <Button type="submit" className="w-full gradient-secondary border-0">
                    Save Reading
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          <Card className="card-shadow border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">119</div>
              <p className="text-xs text-muted-foreground">Avg BP (Systolic)</p>
              <div className="flex items-center justify-center mt-2 text-secondary text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Normal
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">78</div>
              <p className="text-xs text-muted-foreground">Avg BP (Diastolic)</p>
              <div className="flex items-center justify-center mt-2 text-secondary text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Normal
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-secondary mb-1">94</div>
              <p className="text-xs text-muted-foreground">Avg Sugar (mg/dL)</p>
              <div className="flex items-center justify-center mt-2 text-secondary text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Normal
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">42</div>
              <p className="text-xs text-muted-foreground">Total Readings</p>
              <div className="flex items-center justify-center mt-2 text-muted-foreground text-xs">
                This Month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts with Tabs */}
        <Card className="card-shadow border-0 animate-slide-up">
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                <TabsTrigger value="yearly">Yearly View</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="space-y-6">
                <div>
                  <h3 className="font-bold mb-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    Blood Pressure Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="bp"
                        stroke="hsl(207 77% 51%)"
                        strokeWidth={3}
                        dot={{ fill: "hsl(207 77% 51%)", r: 4 }}
                        name="BP (mmHg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="font-bold mb-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                    Blood Sugar Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sugar"
                        stroke="hsl(134 43% 45%)"
                        strokeWidth={3}
                        dot={{ fill: "hsl(134 43% 45%)", r: 4 }}
                        name="Sugar (mg/dL)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="space-y-6">
                <div>
                  <h3 className="font-bold mb-4">Yearly Average - Blood Pressure</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="bp" fill="hsl(207 77% 51%)" name="BP (mmHg)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="font-bold mb-4">Yearly Average - Blood Sugar</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                      <YAxis stroke="hsl(var(--foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sugar" fill="hsl(134 43% 45%)" name="Sugar (mg/dL)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Readings */}
        <Card className="card-shadow border-0 animate-slide-up">
          <CardHeader>
            <CardTitle>Recent Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockData.slice(-5).reverse().map((reading, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
                >
                  <div>
                    <p className="font-medium">{reading.date}</p>
                    <p className="text-sm text-muted-foreground">BP: {reading.bp}/78 mmHg • Sugar: {reading.sugar} mg/dL</p>
                  </div>
                  <div className="text-secondary text-sm font-medium">Normal</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
};

export default HealthTracker;
