import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, LogOut, Settings, Bell, Moon, Users, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const handleExportData = () => {
    toast.success("Health data exported successfully!");
  };

  return (
    <MainLayout>
      <header className="gradient-wellness text-white py-6 px-4 card-shadow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Profile</h1>
          <p className="text-white/90">Manage your account and preferences</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Info */}
        <Card className="card-shadow border-0 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="gradient-primary text-white text-3xl font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold mb-1">John Doe</h2>
                <p className="text-muted-foreground mb-3">Member since January 2025</p>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <User className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Mail className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">john.doe@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Phone className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">January 15, 1990</p>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">123 Health Street, Wellness City, 560001</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Stats */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up">
          <Card className="card-shadow border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24</div>
              <p className="text-sm text-muted-foreground">Orders</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">12</div>
              <p className="text-sm text-muted-foreground">Lab Tests</p>
            </CardContent>
          </Card>

          <Card className="card-shadow border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <p className="text-sm text-muted-foreground">Consultations</p>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <Card className="card-shadow border-0 animate-slide-up">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <Label htmlFor="notifications" className="font-medium cursor-pointer">
                    Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive health reminders and updates</p>
                </div>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center space-x-3">
                <Moon className="w-5 h-5 text-primary" />
                <div>
                  <Label htmlFor="dark-mode" className="font-medium cursor-pointer">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-smooth">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Family Profiles</p>
                  <p className="text-sm text-muted-foreground">Manage family member health</p>
                </div>
              </div>
              <span className="text-sm text-primary">Setup →</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
          <Button
            onClick={handleExportData}
            variant="outline"
            className="h-14"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Health Data
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="h-14 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Privacy Notice */}
        <Card className="card-shadow border-0 bg-accent/10 animate-slide-up">
          <CardContent className="p-6">
            <p className="text-sm text-center text-muted-foreground">
              Your health data is encrypted and stored securely. We follow strict privacy guidelines to protect your information.
            </p>
          </CardContent>
        </Card>
      </main>
    </MainLayout>
  );
};

export default Profile;
