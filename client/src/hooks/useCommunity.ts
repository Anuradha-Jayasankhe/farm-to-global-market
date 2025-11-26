import { useState, useEffect } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

export interface CommunityPost {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  title: string;
  content: string;
  category: string;
  images?: string[];
  likes: string[];
  comments: Array<{
    _id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar?: string;
    };
    content: string;
    createdAt: string;
  }>;
  views: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useCommunityPosts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 0,
    limit: 10,
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.community.getPosts(params);
      if (response.success) {
        setPosts(response.data || []);
        setPagination(response.pagination || pagination);
      } else {
        setError(response.message || 'Failed to fetch posts');
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
    fetchPosts();
  }, [params?.category, params?.search, params?.page]);

  return { posts, loading, error, pagination, refetch: fetchPosts };
}
