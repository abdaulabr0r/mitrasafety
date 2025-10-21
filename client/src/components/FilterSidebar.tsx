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
  selectedProtections: string[];
  onProtectionToggle: (value: string) => void;
  selectedStandards: string[];
  onStandardToggle: (value: string) => void;
  selectedHazards: string[];
  onHazardToggle: (value: string) => void;
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

const protectionGroups = [
  {
    id: "impact",
    label: "Perlindungan Impact & Kompresi",
    options: [
      { value: "impact:steel-toe", label: "Steel Toe (S3)" },
      { value: "impact:composite-shell", label: "Cangkang Komposit" },
      { value: "puncture:kevlar-midsole", label: "Midsole Kevlar" },
    ],
  },
  {
    id: "electrical",
    label: "Perlindungan Listrik & Anti-Statik",
    options: [
      { value: "electrical:class-e", label: "Helm Class E" },
      { value: "electrical:eh", label: "Sepatu EH Certified" },
    ],
  },
  {
    id: "visibility",
    label: "Visibilitas & Lingkungan",
    options: [
      { value: "visibility:hi-vis-class2", label: "Hi-Vis Class 2" },
      { value: "surface:slip-resistant", label: "Sol Anti-Slip" },
      { value: "vision:anti-fog", label: "Anti-Fog Lens" },
    ],
  },
  {
    id: "respiratory",
    label: "Perlindungan Pernapasan & Tangan",
    options: [
      { value: "respiratory:n95", label: "Respirator N95" },
      { value: "hand:cut-level-a3", label: "Cut Level A3" },
      { value: "surface:grip-support", label: "Grip Anti-Oli" },
    ],
  },
];

const standardGroups = [
  {
    id: "impact-standards",
    label: "Standar Impact & Kompresi",
    options: [
      { value: "SNI 1811:2007", label: "SNI 1811:2007" },
      { value: "EN ISO 20345 S3", label: "EN ISO 20345 S3" },
      { value: "ANSI Z89.1 Class E", label: "ANSI Z89.1 Class E" },
    ],
  },
  {
    id: "electrical-standards",
    label: "Standar Listrik & Anti-Statik",
    options: [
      { value: "ASTM F2413 EH", label: "ASTM F2413 EH" },
      { value: "NIOSH N95", label: "NIOSH N95" },
    ],
  },
  {
    id: "optics-standards",
    label: "Standar Optik & Visibilitas",
    options: [
      { value: "EN 166:2001", label: "EN 166:2001" },
      { value: "ISO 20471 Class 2", label: "ISO 20471 Class 2" },
    ],
  },
  {
    id: "hand-standards",
    label: "Standar Proteksi Tangan",
    options: [
      { value: "ANSI/ISEA 105 A3", label: "ANSI/ISEA 105 A3" },
    ],
  },
];

const hazardGroups = [
  {
    id: "impact-hazards",
    label: "Risiko Impact & Kompresi",
    options: [
      { value: "Impact Hazard", label: "Impact Hazard" },
      { value: "Head Impact", label: "Head Impact" },
    ],
  },
  {
    id: "electrical-hazards",
    label: "Risiko Kelistrikan",
    options: [
      { value: "Electrical Hazard", label: "Electrical Hazard" },
    ],
  },
  {
    id: "surface-hazards",
    label: "Risiko Permukaan Kerja",
    options: [
      { value: "Oil & Slip Hazard", label: "Oil & Slip Hazard" },
      { value: "Roadway Work Zone", label: "Roadway Work Zone" },
    ],
  },
  {
    id: "environment-hazards",
    label: "Risiko Lingkungan",
    options: [
      { value: "Dust & Debris", label: "Dust & Debris" },
      { value: "UV Exposure", label: "UV Exposure" },
      { value: "Dust & Particulate", label: "Dust & Particulate" },
      { value: "Abrasion Hazard", label: "Abrasion Hazard" },
    ],
  },
];

const toId = (prefix: string, value: string) => `${prefix}-${value.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`;

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryToggle,
  inStockOnly,
  onInStockToggle,
  selectedProtections,
  onProtectionToggle,
  selectedStandards,
  onStandardToggle,
  selectedHazards,
  onHazardToggle,
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
    selectedCategories.length > 0 ||
    inStockOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000000 ||
    selectedProtections.length > 0 ||
    selectedStandards.length > 0 ||
    selectedHazards.length > 0;

  return (
    <aside className="w-full space-y-6" role="complementary" aria-label="Filter produk">
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
              <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

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

      <fieldset className="space-y-4 border-t pt-6">
        <legend className="font-semibold text-foreground" id="protection-filter-legend">Fokus Perlindungan</legend>
        <div className="space-y-4" role="group" aria-labelledby="protection-filter-legend">
          {protectionGroups.map((group) => (
            <div key={group.id} className="space-y-2 rounded-md border bg-card/50 p-3">
              <p className="text-sm font-semibold text-foreground">{group.label}</p>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={toId("protection", option.value)}
                      checked={selectedProtections.includes(option.value)}
                      onCheckedChange={() => onProtectionToggle(option.value)}
                      aria-label={`Filter perlindungan ${option.label}`}
                    />
                    <Label htmlFor={toId("protection", option.value)} className="text-sm font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t pt-6">
        <legend className="font-semibold text-foreground" id="standard-filter-legend">Standar Sertifikasi</legend>
        <div className="space-y-4" role="group" aria-labelledby="standard-filter-legend">
          {standardGroups.map((group) => (
            <div key={group.id} className="space-y-2 rounded-md border bg-card/50 p-3">
              <p className="text-sm font-semibold text-foreground">{group.label}</p>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={toId("standard", option.value)}
                      checked={selectedStandards.includes(option.value)}
                      onCheckedChange={() => onStandardToggle(option.value)}
                      aria-label={`Filter standar ${option.label}`}
                    />
                    <Label htmlFor={toId("standard", option.value)} className="text-sm font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t pt-6">
        <legend className="font-semibold text-foreground" id="hazard-filter-legend">Risiko Lingkungan Kerja</legend>
        <div className="space-y-4" role="group" aria-labelledby="hazard-filter-legend">
          {hazardGroups.map((group) => (
            <div key={group.id} className="space-y-2 rounded-md border bg-card/50 p-3">
              <p className="text-sm font-semibold text-foreground">{group.label}</p>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={toId("hazard", option.value)}
                      checked={selectedHazards.includes(option.value)}
                      onCheckedChange={() => onHazardToggle(option.value)}
                      aria-label={`Filter risiko ${option.label}`}
                    />
                    <Label htmlFor={toId("hazard", option.value)} className="text-sm font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
