import FilterSidebar from '../FilterSidebar';
import { useState } from 'react';

export default function FilterSidebarExample() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="p-4 max-w-xs">
      <FilterSidebar
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        selectedCategories={selectedCategories}
        onCategoryToggle={(cat) => {
          setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
          );
        }}
        inStockOnly={inStockOnly}
        onInStockToggle={setInStockOnly}
        onClearFilters={() => {
          setPriceRange([0, 1000000]);
          setSelectedCategories([]);
          setInStockOnly(false);
        }}
      />
    </div>
  );
}
