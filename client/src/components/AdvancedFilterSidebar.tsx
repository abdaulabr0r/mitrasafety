import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Shield, Zap, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdvancedFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedSafetyStandards: string[];
  onSafetyStandardToggle: (standard: string) => void;
  inStockOnly: boolean;
  onInStockToggle: (inStock: boolean) => void;
  onClearFilters: () => void;
}

// Structured safety standards based on research recommendations
const safetyStandards = {
  "head-protection": {
    label: "Perlindungan Kepala",
    icon: Shield,
    standards: [
      { id: "sni-1811", label: "SNI 1811 (Helm Industri)", tooltip: "Standar helm keselamatan industri Indonesia" },
      { id: "ansi-z89", label: "ANSI Z89.1 (Head Protection)", tooltip: "Standar perlindungan kepala Amerika" },
      { id: "en-397", label: "EN 397 (Industrial Safety Helmets)", tooltip: "Standar Eropa untuk helm keselamatan" }
    ]
  },
  "electrical-hazard": {
    label: "Bahaya Listrik",
    icon: Zap,
    standards: [
      { id: "astm-f2413", label: "ASTM F2413 (Electrical Hazard)", tooltip: "Perlindungan dari sengatan listrik" },
      { id: "iec-61340", label: "IEC 61340 (ESD Protection)", tooltip: "Perlindungan dari listrik statis" }
    ]
  },
  "visibility": {
    label: "Visibilitas Tinggi",
    icon: Eye,
    standards: [
      { id: "en-iso-20471", label: "EN ISO 20471 (High Visibility)", tooltip: "Pakaian visibilitas tinggi" },
      { id: "ansi-107", label: "ANSI/ISEA 107 (High-Vis Apparel)", tooltip: "Standar pakaian visibilitas tinggi Amerika" }
    ]
  }
};

const categories = [
  { id: "helmet", label: "Helm Safety", count: 24 },
  { id: "gloves", label: "Sarung Tangan", count: 18 },
  { id: "vest", label: "Rompi Safety", count: 15 },
  { id: "boots", label: "Sepatu Safety", count: 12 },
  { id: "goggles", label: "Kacamata Pelindung", count: 20 },
  { id: "mask", label: "Masker & Respirator", count: 16 }
];

export default function AdvancedFilterSidebar({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryToggle,
  selectedSafetyStandards,
  onSafetyStandardToggle,
  inStockOnly,
  onInStockToggle,
  onClearFilters
}: AdvancedFilterProps) {
  const [openSections, setOpenSections] = useState<string[]>(["categories", "price"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedSafetyStandards.length > 0 ||
    inStockOnly ||
    priceRange[0] > 0 || 
    priceRange[1] < 1000000;

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Filter Produk</h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-xs"
          >
            Hapus Semua
          </Button>
        )}
      </div>

      {/* Categories Filter */}
      <Collapsible 
        open={openSections.includes("categories")}
        onOpenChange={() => toggleSection("categories")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
          Kategori Produk
          <motion.div
            animate={{ rotate: openSections.includes("categories") ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.includes("categories") && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2 pt-2"
              >
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => onCategoryToggle(category.id)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                    >
                      {category.label}
                    </label>
                    <span className="text-xs text-muted-foreground">
                      ({category.count})
                    </span>
                  </div>
                ))}
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Safety Standards Filter - Hierarchical as per research */}
      <Collapsible 
        open={openSections.includes("safety")}
        onOpenChange={() => toggleSection("safety")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
          Standar Keselamatan
          <motion.div
            animate={{ rotate: openSections.includes("safety") ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.includes("safety") && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pt-2"
              >
                {Object.entries(safetyStandards).map(([key, group]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <group.icon className="h-3 w-3" />
                      {group.label}
                    </div>
                    <div className="ml-5 space-y-2">
                      {group.standards.map((standard) => (
                        <div key={standard.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={standard.id}
                            checked={selectedSafetyStandards.includes(standard.id)}
                            onCheckedChange={() => onSafetyStandardToggle(standard.id)}
                          />
                          <label
                            htmlFor={standard.id}
                            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                            title={standard.tooltip}
                          >
                            {standard.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Price Range Filter */}
      <Collapsible 
        open={openSections.includes("price")}
        onOpenChange={() => toggleSection("price")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
          Rentang Harga
          <motion.div
            animate={{ rotate: openSections.includes("price") ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </CollapsibleTrigger>
        <AnimatePresence>
          {openSections.includes("price") && (
            <CollapsibleContent forceMount>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pt-2"
              >
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                    max={1000000}
                    min={0}
                    step={10000}
                    className="w-full"
                    dir="ltr"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground px-2 opacity-70">
                  <span>Minimum</span>
                  <span>Maksimum</span>
                </div>
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={onInStockToggle}
        />
        <label
          htmlFor="in-stock"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          Hanya yang tersedia
        </label>
      </div>
    </Card>
  );
}