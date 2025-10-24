import { useState } from "react";
import { Download, TrendingUp, Pill, Stethoscope, FlaskConical } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

const monthlyData = [
  { month: "Jan", medicines: 2100, consultations: 2500, tests: 1200 },
  { month: "Feb", medicines: 1850, consultations: 0, tests: 0 },
  { month: "Mar", medicines: 2350, consultations: 3000, tests: 1800 },
];

const yearlyData = [
  { month: "Jan", total: 5800 },
  { month: "Feb", total: 1850 },
  { month: "Mar", total: 7150 },
  { month: "Apr", total: 3600 },
  { month: "May", total: 6200 },
  { month: "Jun", total: 4800 },
  { month: "Jul", total: 5400 },
  { month: "Aug", total: 4500 },
  { month: "Sep", total: 6400 },
  { month: "Oct", total: 4200 },
  { month: "Nov", total: 5100 },
  { month: "Dec", total: 6900 },
];

const categoryData = [
  { name: "Medicines", value: 28400, color: "hsl(270 75% 60%)" },
  { name: "Consultations", value: 19200, color: "hsl(330 70% 55%)" },
  { name: "Lab Tests", value: 12800, color: "hsl(290 60% 75%)" },
];

const recentExpenses = [
  { id: 1, date: "Mar 12", description: "Aspirin 75mg", category: "Medicine", amount: 45 },
  { id: 2, date: "Mar 10", description: "Dr. Consultation - Orthopedic", category: "Consultation", amount: 1800 },
  { id: 3, date: "Mar 7", description: "Thyroid Profile", category: "Lab Test", amount: 550 },
  { id: 4, date: "Mar 5", description: "Omega-3 Fish Oil", category: "Medicine", amount: 320 },
  { id: 5, date: "Mar 2", description: "HbA1c Test", category: "Lab Test", amount: 950 },
];

const Expenses = () => {
  const [viewType, setViewType] = useState<"monthly" | "yearly">("monthly");

  const handleExportReport = () => {
    toast.success("Expense report downloaded successfully!");
  };

  const totalExpenses = categoryData.reduce((sum, cat) => sum + cat.value, 0);

  return (
    <MainLayout>
      <header className="gradient-secondary text-white py-6 px-4 card-shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Expense Tracker</h1>
          <p className="text-white/90">Track your medical spending</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
          <Card className="card-shadow border-0 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-primary">₹{totalExpenses.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">This year</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Pill className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Medicines</p>
              <p className="text-3xl font-bold">₹28,400</p>
              <p className="text-xs text-secondary mt-2">47% of total</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Consultations</p>
              <p className="text-3xl font-bold">₹19,200</p>
              <p className="text-xs text-secondary mt-2">32% of total</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-accent/30 p-2 rounded-lg">
                  <FlaskConical className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Lab Tests</p>
              <p className="text-3xl font-bold">₹12,800</p>
              <p className="text-xs text-secondary mt-2">21% of total</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card className="card-shadow border-0 animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Expense Analytics</CardTitle>
              <Button
                onClick={handleExportReport}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="trend" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="trend">Trend</TabsTrigger>
                <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                <TabsTrigger value="category">Category</TabsTrigger>
              </TabsList>

              <TabsContent value="trend">
                <div className="mb-4 flex justify-end">
                  <div className="inline-flex rounded-lg border border-border p-1">
                    <Button
                      variant={viewType === "monthly" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewType("monthly")}
                      className={viewType === "monthly" ? "gradient-primary border-0" : ""}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={viewType === "yearly" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewType("yearly")}
                      className={viewType === "yearly" ? "gradient-primary border-0" : ""}
                    >
                      Yearly
                    </Button>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={viewType === "monthly" ? monthlyData : yearlyData}>
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
                    {viewType === "monthly" ? (
                      <>
                        <Line type="monotone" dataKey="medicines" stroke="hsl(270 75% 60%)" strokeWidth={2} name="Medicines" />
                        <Line type="monotone" dataKey="consultations" stroke="hsl(330 70% 55%)" strokeWidth={2} name="Consultations" />
                        <Line type="monotone" dataKey="tests" stroke="hsl(290 60% 75%)" strokeWidth={2} name="Tests" />
                      </>
                    ) : (
                      <Line type="monotone" dataKey="total" stroke="hsl(270 75% 60%)" strokeWidth={3} name="Total Expenses" />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="breakdown">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyData}>
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
                    <Bar dataKey="medicines" fill="hsl(270 75% 60%)" name="Medicines" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="consultations" fill="hsl(330 70% 55%)" name="Consultations" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="tests" fill="hsl(290 60% 75%)" name="Tests" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="category">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${((entry.value / totalExpenses) * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="flex flex-col justify-center space-y-4">
                    {categoryData.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="font-bold">₹{category.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="card-shadow border-0 animate-slide-up">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      expense.category === "Medicine" ? "bg-primary/10" :
                      expense.category === "Consultation" ? "bg-secondary/10" : "bg-accent/30"
                    }`}>
                      {expense.category === "Medicine" && <Pill className="w-4 h-4 text-primary" />}
                      {expense.category === "Consultation" && <Stethoscope className="w-4 h-4 text-secondary" />}
                      {expense.category === "Lab Test" && <FlaskConical className="w-4 h-4 text-accent-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                        <span>{expense.date}</span>
                        <span>•</span>
                        <span>{expense.category}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-lg">₹{expense.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
};

export default Expenses;
