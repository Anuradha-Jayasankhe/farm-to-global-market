import { useState, useCallback } from 'react';
import { ApiError } from '@/lib/api-client';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for making API calls with loading and error states
 * 
 * @example
 * const { data, loading, error, execute } = useApi(apiClient.products.getAll);
 * 
 * // In component
 * useEffect(() => {
 *   execute({ category: 'crops' });
 * }, []);
 */
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...args);

        if (response.success) {
          setData(response.data);
          options.onSuccess?.(response.data);
        } else {
          throw new ApiError(response.message || 'Request failed');
        }
      } catch (err) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError('An unexpected error occurred');
        setError(apiError);
        options.onError?.(apiError);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for managing mutation operations (POST, PUT, DELETE)
 * Similar to useApi but optimized for mutations
 * 
 * @example
 * const { mutate, loading } = useMutation(apiClient.products.create);
 * 
 * const handleSubmit = async (formData) => {
 *   await mutate(formData);
 * };
 */
export function useMutation<T = any>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: UseApiOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...args);

        if (response.success) {
          options.onSuccess?.(response.data);
          return { success: true, data: response.data };
        } else {
          throw new ApiError(response.message || 'Request failed');
        }
      } catch (err) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError('An unexpected error occurred');
        setError(apiError);
        options.onError?.(apiError);
        return { success: false, error: apiError };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  return { mutate, loading, error };
}

/**
 * Hook for managing form submissions with API calls
 * 
 * @example
 * const { submit, loading, errors } = useFormSubmit(apiClient.auth.register);
 * 
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const result = await submit(formData);
 *   if (result.success) {
 *     router.push('/dashboard');
 *   }
 * };
 */
export function useFormSubmit<T = any>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: UseApiOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = useCallback(
    async (data: T) => {
      try {
        setLoading(true);
        setErrors({});
        setSubmitError(null);

        const response = await apiFunction(data);

        if (response.success) {
          options.onSuccess?.(response.data);
          return { success: true, data: response.data };
        } else {
          throw new ApiError(response.message || 'Request failed');
        }
      } catch (err) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError('An unexpected error occurred');

        // Handle validation errors
        if (apiError.status === 400 && apiError.data?.errors) {
          setErrors(apiError.data.errors);
        } else {
          setSubmitError(apiError.message);
        }

        options.onError?.(apiError);
        return { success: false, error: apiError };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return { submit, loading, errors, submitError, clearError };
}

/**
 * Hook for pagination
 * 
 * @example
 * const { data, loading, page, totalPages, nextPage, prevPage } = usePagination(
 *   apiClient.products.getAll,
 *   { limit: 10 }
 * );
 */
export function usePagination<T = any>(
  apiFunction: (params: any) => Promise<any>,
  initialParams: Record<string, any> = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPage = useCallback(
    async (pageNum: number, params: Record<string, any> = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction({
          ...initialParams,
          ...params,
          page: pageNum,
        });

        if (response.success) {
          setData(response.data?.items || response.data || []);
          setTotalPages(response.data?.totalPages || 1);
          setTotal(response.data?.total || 0);
          setPage(pageNum);
        } else {
          throw new ApiError(response.message || 'Request failed');
        }
      } catch (err) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError('An unexpected error occurred');
        setError(apiError);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, initialParams]
  );

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      fetchPage(page + 1);
    }
  }, [page, totalPages, fetchPage]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      fetchPage(page - 1);
    }
  }, [page, fetchPage]);

  const goToPage = useCallback(
    (pageNum: number) => {
      if (pageNum >= 1 && pageNum <= totalPages) {
        fetchPage(pageNum);
      }
    },
    [totalPages, fetchPage]
  );

  return {
    data,
    loading,
    error,
    page,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
    refetch: () => fetchPage(page),
  };
}
