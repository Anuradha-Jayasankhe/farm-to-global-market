import { useState, useEffect } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

export interface Order {
  _id: string;
  orderNumber: string;
  buyer: string;
  buyerName: string;
  items: Array<{
    product: string;
    productName: string;
    quantity: number;
    price: number;
    unit: string;
    seller: string;
    sellerName: string;
    image: string;
  }>;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: string;
  payment: {
    method: string;
    status: string;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phone: string;
  };
  createdAt: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.orders.getAll();
      if (response.success) {
        setOrders(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch orders');
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
    fetchOrders();
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
}

export function useOrder(id: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.orders.getById(id);
        if (response.success) {
          setOrder(response.data);
        } else {
          setError(response.message || 'Failed to fetch order');
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

    fetchOrder();
  }, [id]);

  return { order, loading, error };
}
