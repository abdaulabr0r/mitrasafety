import { create } from 'zustand';
import type { Product } from '@shared/schema';

type OptimizedMediaVariant = {
  format: string;
  sizeKB?: number;
  note?: string;
  url?: string;
};

type SafetyProduct = Omit<Product, 'protectionLevels' | 'complianceStandards' | 'hazardClasses' | 'optimizedMedia'> & {
  protectionLevels: string[];
  complianceStandards: string[];
  hazardClasses: string[];
  optimizedMedia: OptimizedMediaVariant[];
};

interface ProductFilters {
  searchQuery: string;
  selectedCategories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  protectionFilters: string[];
  standardFilters: string[];
  hazardFilters: string[];
}

interface ProductStore {
  products: SafetyProduct[];
  filteredProducts: SafetyProduct[];
  selectedProduct: SafetyProduct | null;
  isProductDetailOpen: boolean;
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: SafetyProduct | null) => void;
  openProductDetail: (product: SafetyProduct) => void;
  closeProductDetail: () => void;
  updateFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialFilters: ProductFilters = {
  searchQuery: '',
  selectedCategories: [],
  priceRange: [0, 1000000],
  inStockOnly: false,
  protectionFilters: [],
  standardFilters: [],
  hazardFilters: [],
};

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string');
      }
    } catch (error) {
      console.warn('Failed to parse array field from product payload:', error);
    }
  }

  return [];
};

const parseMediaArray = (value: unknown): OptimizedMediaVariant[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is OptimizedMediaVariant =>
      !!item && typeof item === 'object' && 'format' in item
    );
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is OptimizedMediaVariant =>
          !!item && typeof item === 'object' && 'format' in item
        );
      }
    } catch (error) {
      console.warn('Failed to parse optimized media from product payload:', error);
    }
  }

  return [];
};

const normalizeProduct = (product: Product): SafetyProduct => ({
  ...product,
  protectionLevels: parseStringArray((product as Product & { protectionLevels?: unknown }).protectionLevels),
  complianceStandards: parseStringArray((product as Product & { complianceStandards?: unknown }).complianceStandards),
  hazardClasses: parseStringArray((product as Product & { hazardClasses?: unknown }).hazardClasses),
  optimizedMedia: parseMediaArray((product as Product & { optimizedMedia?: unknown }).optimizedMedia),
});

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isProductDetailOpen: false,
  filters: initialFilters,
  isLoading: false,
  error: null,

  setProducts: (products) => {
    const normalized = products.map(normalizeProduct);
    set({ products: normalized });
    get().applyFilters();
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },

  openProductDetail: (product) => {
    set({ 
      selectedProduct: product,
      isProductDetailOpen: true 
    });
  },

  closeProductDetail: () => {
    set({ 
      selectedProduct: null,
      isProductDetailOpen: false 
    });
  },

  updateFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFilters();
  },

  clearFilters: () => {
    set({ filters: initialFilters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, filters } = get();
    
    const filtered = products.filter((product) => {
      const matchesCategory = 
        filters.selectedCategories.length === 0 || 
        filters.selectedCategories.includes(product.category);
      
      const matchesPrice = 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      
      const matchesStock = 
        !filters.inStockOnly || product.inStock;
      
      const matchesSearch = 
        filters.searchQuery === '' ||
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesProtection =
        filters.protectionFilters.length === 0 ||
        filters.protectionFilters.every((tag) => product.protectionLevels.includes(tag));

      const matchesStandards =
        filters.standardFilters.length === 0 ||
        filters.standardFilters.every((tag) => product.complianceStandards.includes(tag));

      const matchesHazards =
        filters.hazardFilters.length === 0 ||
        filters.hazardFilters.every((tag) => product.hazardClasses.includes(tag));

      return matchesCategory && matchesPrice && matchesStock && matchesSearch && matchesProtection && matchesStandards && matchesHazards;
    });

    set({ filteredProducts: filtered });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },
}));