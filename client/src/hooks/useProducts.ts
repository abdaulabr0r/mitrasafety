import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product, InsertProduct } from '@shared/schema';

const API_BASE = '/api';

interface SearchProductsParams {
  query?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

// Fetch all products
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${API_BASE}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });
}

// Search products with filters
export function useSearchProducts(params: SearchProductsParams) {
  const queryParams = new URLSearchParams();
  
  if (params.query) queryParams.append('query', params.query);
  if (params.categories?.length) queryParams.append('categories', params.categories.join(','));
  if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
  if (params.inStockOnly) queryParams.append('inStockOnly', 'true');

  return useQuery({
    queryKey: ['products', 'search', params],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${API_BASE}/products?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      return response.json();
    },
    enabled: Object.keys(params).length > 0,
  });
}

// Fetch single product
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async (): Promise<Product> => {
      const response = await fetch(`${API_BASE}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

// Create product mutation
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: InsertProduct): Promise<Product> => {
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}