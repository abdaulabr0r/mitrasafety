import { create } from 'zustand';
import type { Product } from '@shared/schema';

interface ProductFilters {
  searchQuery: string;
  selectedCategories: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isProductDetailOpen: boolean;
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  openProductDetail: (product: Product) => void;
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
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isProductDetailOpen: false,
  filters: initialFilters,
  isLoading: false,
  error: null,

  setProducts: (products) => {
    set({ products });
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

      return matchesCategory && matchesPrice && matchesStock && matchesSearch;
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