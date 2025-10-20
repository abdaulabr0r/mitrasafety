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
    <aside className="w-full space-y-6" role="complementary" aria-label="Filter produk">
      {/* Header filter - Filter header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground" id="filter-heading">Filter</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 text-xs"
            data-testid="button-clear-filters"
            aria-label="Hapus semua filter yang aktif"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            Hapus
          </Button>
        )}
      </div>

      {/* Grup filter kategori - Category filter group */}
      <fieldset className="space-y-4 border-b pb-6">
        <legend className="font-semibold text-foreground" id="category-filter-legend">Kategori</legend>
        <div className="space-y-3" role="group" aria-labelledby="category-filter-legend">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onCategoryToggle(category.id)}
                data-testid={`checkbox-category-${category.id}`}
                aria-label={`Filter kategori ${category.name}`}
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
      </fieldset>

      {/* Grup filter harga - Price filter group */}
      <fieldset className="space-y-4 border-b pb-6">
        <legend className="font-semibold text-foreground" id="price-filter-legend">Rentang Harga</legend>
        <div className="space-y-3" role="group" aria-labelledby="price-filter-legend">
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
              aria-label={`Rentang harga dari ${formatPrice(priceRange[0])} sampai ${formatPrice(priceRange[1])}`}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground px-2" aria-live="polite" aria-atomic="true">
            <span data-testid="text-price-min" aria-label={`Harga minimum ${formatPrice(priceRange[0])}`}>{formatPrice(priceRange[0])}</span>
            <span data-testid="text-price-max" aria-label={`Harga maksimum ${formatPrice(priceRange[1])}`}>{formatPrice(priceRange[1])}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>Minimum</span>
            <span>Maksimum</span>
          </div>
        </div>
      </fieldset>

      {/* Grup filter ketersediaan - Availability filter group */}
      <fieldset className="space-y-4">
        <legend className="font-semibold text-foreground" id="availability-filter-legend">Ketersediaan</legend>
        <div className="flex items-center space-x-2" role="group" aria-labelledby="availability-filter-legend">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={onInStockToggle}
            data-testid="checkbox-in-stock"
            aria-label="Tampilkan hanya produk dengan stok tersedia"
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            Stok tersedia
          </Label>
        </div>
      </fieldset>
    </aside>
  );
}
