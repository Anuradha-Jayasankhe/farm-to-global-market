// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const API_TIMEOUT = 30000; // 30 seconds

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
    subscription: {
      plan: string;
      isActive: boolean;
    };
    isEmailVerified: boolean;
  };
}

// API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Token Management
export const tokenManager = {
  get: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  set: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },

  remove: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
};

// Base Fetch Wrapper
async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = tokenManager.get();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Network error or server is down
    throw new ApiError(error.message || 'Network error', 0);
  }
}

// API Client
export const apiClient = {
  // Authentication
  auth: {
    register: async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string;
      role?: string;
    }): Promise<ApiResponse<AuthResponse>> => {
      return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    login: async (credentials: {
      email: string;
      password: string;
    }): Promise<ApiResponse<AuthResponse>> => {
      return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    logout: async (): Promise<ApiResponse> => {
      return apiFetch('/auth/logout', {
        method: 'POST',
      });
    },

    getProfile: async (): Promise<ApiResponse> => {
      return apiFetch('/auth/me');
    },

    verifyEmail: async (token: string): Promise<ApiResponse> => {
      return apiFetch(`/auth/verify-email/${token}`);
    },

    forgotPassword: async (email: string): Promise<ApiResponse> => {
      return apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },

    resetPassword: async (
      token: string,
      password: string
    ): Promise<ApiResponse> => {
      return apiFetch(`/auth/reset-password/${token}`, {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
    },
  },

  // Products
  products: {
    getAll: async (params?: {
      category?: string;
      search?: string;
      page?: number;
      limit?: number;
    }): Promise<ApiResponse> => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return apiFetch(`/products${query}`);
    },

    getById: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/products/${id}`);
    },

    create: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse> => {
      return apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/products/${id}`, {
        method: 'DELETE',
      });
    },

    approve: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/products/${id}/approve`, {
        method: 'PUT',
      });
    },

    reject: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/products/${id}/reject`, {
        method: 'PUT',
      });
    },
  },

  // Orders
  orders: {
    getAll: async (): Promise<ApiResponse> => {
      return apiFetch('/orders');
    },

    getById: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/orders/${id}`);
    },

    create: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    updateStatus: async (id: string, status: string): Promise<ApiResponse> => {
      return apiFetch(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    },
  },

  // AI Services
  ai: {
    cropPlanner: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/ai/crop-planner', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    pestDetection: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/ai/pest-detection', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    valueBooster: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/ai/value-booster', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    packagingGenerator: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/ai/packaging-generator', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    getHistory: async (): Promise<ApiResponse> => {
      return apiFetch('/ai/history');
    },
  },

  // Community
  community: {
    getPosts: async (params?: {
      category?: string;
      page?: number;
      limit?: number;
    }): Promise<ApiResponse> => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return apiFetch(`/community/posts${query}`);
    },

    getPostById: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/community/posts/${id}`);
    },

    createPost: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/community/posts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    updatePost: async (id: string, data: any): Promise<ApiResponse> => {
      return apiFetch(`/community/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    deletePost: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/community/posts/${id}`, {
        method: 'DELETE',
      });
    },

    likePost: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/community/posts/${id}/like`, {
        method: 'POST',
      });
    },

    addComment: async (id: string, content: string): Promise<ApiResponse> => {
      return apiFetch(`/community/posts/${id}/comment`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
    },
  },

  // File Upload
  upload: {
    image: async (file: File): Promise<ApiResponse> => {
      const formData = new FormData();
      formData.append('image', file);

      return apiFetch('/upload/image', {
        method: 'POST',
        headers: {
          // Don't set Content-Type, let browser set it with boundary
        },
        body: formData,
      });
    },

    images: async (files: File[]): Promise<ApiResponse> => {
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));

      return apiFetch('/upload/images', {
        method: 'POST',
        headers: {},
        body: formData,
      });
    },
  },

  // Notifications
  notifications: {
    getAll: async (): Promise<ApiResponse> => {
      return apiFetch('/notifications');
    },

    getUnread: async (): Promise<ApiResponse> => {
      return apiFetch('/notifications/unread');
    },

    markAsRead: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/notifications/${id}/read`, {
        method: 'PUT',
      });
    },

    markAllAsRead: async (): Promise<ApiResponse> => {
      return apiFetch('/notifications/read-all', {
        method: 'PUT',
      });
    },

    delete: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/notifications/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Analytics
  analytics: {
    getDashboard: async (): Promise<ApiResponse> => {
      return apiFetch('/analytics/dashboard');
    },

    getSales: async (): Promise<ApiResponse> => {
      return apiFetch('/analytics/sales');
    },

    getProducts: async (): Promise<ApiResponse> => {
      return apiFetch('/analytics/products');
    },

    getUsers: async (): Promise<ApiResponse> => {
      return apiFetch('/analytics/users');
    },

    getRevenue: async (): Promise<ApiResponse> => {
      return apiFetch('/analytics/revenue');
    },
  },

  // Users (Admin)
  users: {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      role?: string;
      search?: string;
    }): Promise<ApiResponse> => {
      const query = params ? `?${new URLSearchParams(params as any)}` : '';
      return apiFetch(`/users${query}`);
    },

    getById: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/users/${id}`);
    },

    getProfile: async (): Promise<ApiResponse> => {
      return apiFetch('/users/me');
    },

    updateProfile: async (data: any): Promise<ApiResponse> => {
      return apiFetch('/users/me', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    update: async (id: string, data: any): Promise<ApiResponse> => {
      return apiFetch(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    delete: async (id: string): Promise<ApiResponse> => {
      return apiFetch(`/users/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Payments
  payments: {
    createIntent: async (amount: number): Promise<ApiResponse> => {
      return apiFetch('/payments/create-payment-intent', {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });
    },

    getTransactions: async (): Promise<ApiResponse> => {
      return apiFetch('/payments/transactions');
    },
  },
};

// Request Interceptor (for logging, analytics, etc.)
export const addRequestInterceptor = (
  interceptor: (config: RequestInit) => RequestInit
) => {
  // Implementation for request interceptor
};

// Response Interceptor (for error handling, retry logic, etc.)
export const addResponseInterceptor = (
  interceptor: (response: Response) => Response
) => {
  // Implementation for response interceptor
};

export default apiClient;
