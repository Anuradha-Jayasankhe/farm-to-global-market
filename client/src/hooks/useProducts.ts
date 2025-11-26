import { useState, useEffect } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  seller: string;
  sellerName: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  rating: number;
  reviews: number;
  isOrganic: boolean;
  certifications?: string[];
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
  refetch: () => Promise<void>;
}

export function useProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
}): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 0,
    limit: 12,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.products.getAll(params);
      if (response.success) {
        setProducts(response.data || []);
        setPagination(response.pagination || pagination);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [params?.category, params?.search, params?.page, params?.limit, params?.minPrice, params?.maxPrice]);

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchProducts,
  };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.products.getById(id);
        if (response.success) {
          setProduct(response.data);
        } else {
          setError(response.message || 'Failed to fetch product');
        }
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
