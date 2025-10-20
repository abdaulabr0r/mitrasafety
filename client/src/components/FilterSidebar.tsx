import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  inStockOnly: boolean;
  onInStockToggle: (checked: boolean) => void;
  onClearFilters: () => void;
}

const categories = [
  { id: "helmet", name: "Helm Safety" },
  { id: "gloves", name: "Sarung Tangan" },
  { id: "vest", name: "Rompi Safety" },
  { id: "boots", name: "Sepatu Safety" },
  { id: "goggles", name: "Kacamata Pelindung" },
  { id: "mask", name: "Masker & Respirator" },
];

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryToggle,
  inStockOnly,
  onInStockToggle,
  onClearFilters,
}: FilterSidebarProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || inStockOnly || priceRange[0] > 0 || priceRange[1] < 1000000;

  return (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filter</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 text-xs"
            data-testid="button-clear-filters"
          >
            <X className="h-3 w-3" />
            Hapus
          </Button>
        )}
      </div>

      <div className="space-y-4 border-b pb-6">
        <h4 className="font-semibold text-foreground">Kategori</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryToggle(category.id)}
                data-testid={`checkbox-category-${category.id}`}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-b pb-6">
        <h4 className="font-semibold text-foreground">Rentang Harga</h4>
        <div className="space-y-3">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              min={0}
              max={1000000}
              step={10000}
              className="w-full"
              data-testid="slider-price-range"
              dir="ltr"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground px-2">
            <span data-testid="text-price-min">{formatPrice(priceRange[0])}</span>
            <span data-testid="text-price-max">{formatPrice(priceRange[1])}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>Minimum</span>
            <span>Maksimum</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Ketersediaan</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={onInStockToggle}
            data-testid="checkbox-in-stock"
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            Stok tersedia
          </Label>
        </div>
      </div>
    </aside>
  );
}
