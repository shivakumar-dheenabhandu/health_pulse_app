import { useState } from "react";
import { Stethoscope, FlaskConical, Calendar, Clock, Video, Search } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const doctorSpecialties = [
  { id: 1, name: "General Physician", available: 12, fee: "₹500", icon: Stethoscope },
  { id: 2, name: "Cardiologist", available: 8, fee: "₹1200", icon: Stethoscope },
  { id: 3, name: "Diabetologist", available: 5, fee: "₹900", icon: Stethoscope },
  { id: 4, name: "Dermatologist", available: 10, fee: "₹700", icon: Stethoscope },
  { id: 5, name: "Orthopedic", available: 6, fee: "₹1000", icon: Stethoscope },
  { id: 6, name: "Pediatrician", available: 9, fee: "₹600", icon: Stethoscope },
];

const labTests = [
  { id: 1, name: "Complete Blood Count (CBC)", price: "₹350", time: "4 hours", icon: FlaskConical },
  { id: 2, name: "Lipid Profile", price: "₹800", time: "6 hours", icon: FlaskConical },
  { id: 3, name: "Thyroid Profile", price: "₹650", time: "8 hours", icon: FlaskConical },
  { id: 4, name: "Blood Sugar (Fasting)", price: "₹100", time: "2 hours", icon: FlaskConical },
  { id: 5, name: "Liver Function Test", price: "₹900", time: "6 hours", icon: FlaskConical },
  { id: 6, name: "Kidney Function Test", price: "₹850", time: "6 hours", icon: FlaskConical },
];

const upcomingAppointments = [
  { id: 1, type: "Doctor", name: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "Mar 15, 2025", time: "10:00 AM" },
  { id: 2, type: "Lab Test", name: "Complete Blood Count", location: "Home Collection", date: "Mar 17, 2025", time: "8:00 AM" },
];

const ConsultTests = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookDoctor = (specialty: string) => {
    toast.success(`Booking ${specialty}...`);
  };

  const handleBookTest = (test: string) => {
    toast.success(`Booking ${test}...`);
  };

  return (
    <MainLayout>
      <header className="gradient-wellness text-white py-6 px-4 card-shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Consult & Tests</h1>
          <p className="text-white/90">Book appointments and lab tests</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Upcoming Appointments */}
        <section className="animate-fade-in">
          <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="card-shadow border-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={appointment.type === "Doctor" ? "default" : "secondary"} className="mb-2">
                      {appointment.type}
                    </Badge>
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{appointment.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {appointment.type === "Doctor" ? appointment.specialty : appointment.location}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search */}
        <div className="relative animate-slide-up">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search doctors or tests..."
            className="pl-10 h-12 card-shadow border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs for Doctors and Tests */}
        <Card className="card-shadow border-0 animate-slide-up">
          <CardContent className="p-6">
            <Tabs defaultValue="doctors" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="doctors">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctors
                </TabsTrigger>
                <TabsTrigger value="tests">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Lab Tests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="doctors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctorSpecialties
                    .filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((specialty, index) => (
                      <Card
                        key={specialty.id}
                        className="border border-border transition-smooth hover:shadow-md"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <Stethoscope className="w-6 h-6 text-primary" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {specialty.available} available
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg mb-2">{specialty.name}</h3>
                          <p className="text-2xl font-bold text-primary mb-4">{specialty.fee}</p>
                          <Button
                            className="w-full gradient-primary border-0"
                            onClick={() => handleBookDoctor(specialty.name)}
                          >
                            Book Consultation
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="tests">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {labTests
                    .filter((test) => test.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((test, index) => (
                      <Card
                        key={test.id}
                        className="border border-border transition-smooth hover:shadow-md"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="bg-secondary/10 p-3 rounded-lg">
                              <FlaskConical className="w-6 h-6 text-secondary" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {test.time}
                            </Badge>
                          </div>
                          <h3 className="font-bold mb-2">{test.name}</h3>
                          <p className="text-2xl font-bold text-secondary mb-4">{test.price}</p>
                          <Button
                            className="w-full gradient-secondary border-0"
                            onClick={() => handleBookTest(test.name)}
                          >
                            Book Test
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
          <Card className="card-shadow border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Video Consultation</h3>
              <p className="text-sm text-muted-foreground">Connect with doctors from home</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FlaskConical className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Home Collection</h3>
              <p className="text-sm text-muted-foreground">Sample collection at your doorstep</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6 text-center">
              <div className="bg-accent/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-bold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-muted-foreground">Book at your convenience</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </MainLayout>
  );
};

export default ConsultTests;
