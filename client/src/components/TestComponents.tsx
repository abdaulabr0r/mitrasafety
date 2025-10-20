import { useState } from "react";
import CategoryCard from "./CategoryCard";
import FilterSidebar from "./FilterSidebar";
import { Card } from "./ui/card";

// Test component untuk memverifikasi perbaikan
export default function TestComponents() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const testCategories = [
    { id: "helmet", name: "Helm Safety", icon: "🪖", productCount: 24 },
    { id: "gloves", name: "Sarung Tangan", icon: "🧤", productCount: 18 },
    { id: "vest", name: "Rompi Safety", icon: "🦺", productCount: 15 },
    { id: "boots", name: "Sepatu Safety", icon: "👢", productCount: 12 },
    { id: "goggles", name: "Kacamata Pelindung", icon: "🥽", productCount: 20 },
    { id: "mask", name: "Masker & Respirator", icon: "😷", productCount: 16 },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedCategories([]);
    setInStockOnly(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Test Components - Perbaikan</h1>
      
      {/* Test Category Cards dengan Icon */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Test Category Cards (Icon Emoji)</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testCategories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon={category.icon}
              productCount={category.productCount}
              onClick={() => console.log(`Clicked: ${category.name}`)}
            />
          ))}
        </div>
      </Card>

      {/* Test Price Range Slider */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Test Price Range Slider (Kiri ke Kanan)</h2>
        <div className="max-w-md">
          <FilterSidebar
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            inStockOnly={inStockOnly}
            onInStockToggle={setInStockOnly}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        <div className="mt-4 p-4 bg-muted rounded-md">
          <h3 className="font-medium mb-2">Current Values:</h3>
          <p>Price Range: Rp {priceRange[0].toLocaleString()} - Rp {priceRange[1].toLocaleString()}</p>
          <p>Selected Categories: {selectedCategories.join(', ') || 'None'}</p>
          <p>In Stock Only: {inStockOnly ? 'Yes' : 'No'}</p>
        </div>
      </Card>

      {/* Test Individual Emoji Display */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Test Individual Emoji Display</h2>
        <div className="grid grid-cols-6 gap-4 text-center">
          {testCategories.map((category) => (
            <div key={category.id} className="p-4 border rounded-md">
              <div 
                className="text-4xl mb-2 emoji"
                role="img" 
                aria-label={`Icon ${category.name}`}
                style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}
              >
                {category.icon}
              </div>
              <p className="text-xs text-muted-foreground">{category.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}