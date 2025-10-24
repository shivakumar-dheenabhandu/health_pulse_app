import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const medicines = [
  { id: 1, name: "Paracetamol 500mg", price: 25, category: "Pain Relief", stock: "In Stock" },
  { id: 2, name: "Vitamin D3", price: 180, category: "Supplements", stock: "In Stock" },
  { id: 3, name: "Amoxicillin 250mg", price: 120, category: "Antibiotics", stock: "Limited" },
  { id: 4, name: "Cetirizine 10mg", price: 45, category: "Allergy", stock: "In Stock" },
  { id: 5, name: "Metformin 500mg", price: 95, category: "Diabetes", stock: "In Stock" },
  { id: 6, name: "Aspirin 75mg", price: 30, category: "Cardiac", stock: "In Stock" },
];

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (id: number) => {
    setCart([...cart, id]);
    toast.success("Added to cart!");
  };

  return (
    <MainLayout>
      <header className="gradient-primary text-white py-6 px-4 card-shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Order Medicines</h1>
            <p className="text-white/90">Quick delivery to your doorstep</p>
          </div>
          <div className="relative">
            <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search medicines..."
            className="pl-10 h-12 card-shadow border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine, index) => (
            <Card
              key={medicine.id}
              className="card-shadow border-0 transition-smooth hover:scale-105 hover:elevated-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="gradient-secondary border-0 text-white">
                    {medicine.category}
                  </Badge>
                  <Badge variant={medicine.stock === "In Stock" ? "default" : "destructive"} className={medicine.stock === "In Stock" ? "bg-secondary" : ""}>
                    {medicine.stock}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{medicine.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">₹{medicine.price}</p>
                <Button className="w-full gradient-primary border-0" onClick={() => handleAddToCart(medicine.id)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </MainLayout>
  );
};

export default Medicines;
