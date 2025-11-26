/**
 * API Client Usage Examples
 * Copy these patterns into your components
 */

import React from 'react';
import { apiClient } from '@/lib/api-client';
import { useApi, useMutation, useFormSubmit, usePagination } from '@/hooks/useApi';

// ============================================
// 1. AUTHENTICATION EXAMPLES
// ============================================

// Login Component
export function LoginExample() {
  const { submit, loading, submitError } = useFormSubmit(apiClient.auth.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submit({
      email: 'farmer@example.com',
      password: 'password123'
    });

    if (result.success) {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      {submitError && <div className="error">{submitError}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// Register Component
export function RegisterExample() {
  const { submit, loading, errors } = useFormSubmit(apiClient.auth.register);

  const handleRegister = async (formData: any) => {
    const result = await submit({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: 'farmer'
    });

    if (result.success) {
      console.log('Registration successful');
    }
  };

  return (
    <form>
      {errors.email && <span className="error">{errors.email}</span>}
      {errors.password && <span className="error">{errors.password}</span>}
      {/* Form implementation */}
    </form>
  );
}

// ============================================
// 2. PRODUCTS EXAMPLES
// ============================================

// Fetch Products List
export function ProductsListExample() {
  const { data, loading, error, execute } = useApi(apiClient.products.getAll);

  // Fetch on mount
  React.useEffect(() => {
    execute({ category: 'crops', page: 1, limit: 20 });
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((product: any) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// Fetch Single Product
export function ProductDetailExample({ productId }: { productId: string }) {
  const { data: product, loading, error, execute } = useApi(apiClient.products.getById);

  React.useEffect(() => {
    execute(productId);
  }, [productId, execute]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
    </div>
  );
}

// Create Product (Farmer Dashboard)
export function CreateProductExample() {
  const { mutate, loading, error } = useMutation(apiClient.products.create, {
    onSuccess: () => {
      alert('Product created successfully!');
    }
  });

  const handleSubmit = async (productData: any) => {
    await mutate(productData);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({
        name: 'Fresh Tomatoes',
        description: 'Organic tomatoes',
        price: 5.99,
        category: 'vegetables',
        quantity: 100
      });
    }}>
      {/* Form fields */}
      {error && <div className="error">{error.message}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}

// ============================================
// 3. PAGINATION EXAMPLE
// ============================================

export function PaginatedProductsExample() {
  const {
    data: products,
    loading,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage
  } = usePagination(apiClient.products.getAll, { limit: 10 });

  React.useEffect(() => {
    goToPage(1);
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      
      <div className="products-grid">
        {products?.map((product: any) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

// ============================================
// 4. AI FEATURES EXAMPLES
// ============================================

// Crop Planner
export function CropPlannerExample() {
  const { mutate, loading } = useMutation(apiClient.ai.cropPlanner);

  const getPlannerRecommendations = async () => {
    const result = await mutate({
      location: {
        city: 'New York',
        state: 'NY',
        country: 'USA'
      },
      soilType: 'clay',
      climate: 'temperate',
      farmSize: 10,
      budget: 5000
    });

    if (result.success) {
      console.log('Recommendations:', result.data);
    }
  };

  return (
    <button onClick={getPlannerRecommendations} disabled={loading}>
      {loading ? 'Analyzing...' : 'Get Crop Recommendations'}
    </button>
  );
}

// Pest Detection
export function PestDetectionExample() {
  const { mutate, loading } = useMutation(apiClient.ai.pestDetection);

  const detectPest = async (imageFile: File) => {
    // First upload image
    const uploadResult = await apiClient.upload.image(imageFile);
    
    if (uploadResult.success) {
      const result = await mutate({
        imageUrl: uploadResult.data.url,
        cropType: 'tomato'
      });

      if (result.success) {
        console.log('Detection result:', result.data);
      }
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          detectPest(e.target.files[0]);
        }
      }}
      disabled={loading}
    />
  );
}

// ============================================
// 5. ORDERS EXAMPLES
// ============================================

// Create Order
export function CreateOrderExample() {
  const { mutate, loading } = useMutation(apiClient.orders.create);

  const placeOrder = async (cartItems: any[]) => {
    const result = await mutate({
      items: cartItems,
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: 'card'
    });

    if (result.success) {
      console.log('Order placed:', result.data);
    }
  };

  return (
    <button onClick={() => placeOrder([])} disabled={loading}>
      {loading ? 'Placing Order...' : 'Place Order'}
    </button>
  );
}

// Get Orders (User Dashboard)
export function OrdersListExample() {
  const { data: orders, loading, execute } = useApi(apiClient.orders.getAll);

  React.useEffect(() => {
    execute();
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      {orders?.map((order: any) => (
        <div key={order.id}>
          <h3>Order #{order.orderNumber}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 6. COMMUNITY EXAMPLES
// ============================================

// Get Community Posts
export function CommunityPostsExample() {
  const { data: posts, loading, execute } = useApi(apiClient.community.getPosts);

  React.useEffect(() => {
    execute({ category: 'farming-tips' });
  }, []);

  const likePost = async (postId: string) => {
    await apiClient.community.likePost(postId);
    execute(); // Refresh posts
  };

  return (
    <div>
      {posts?.map((post: any) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => likePost(post.id)}>
            Like ({post.likes?.length || 0})
          </button>
        </div>
      ))}
    </div>
  );
}

// Create Post
export function CreatePostExample() {
  const { mutate, loading } = useMutation(apiClient.community.createPost);

  const createPost = async (postData: any) => {
    await mutate({
      title: postData.title,
      content: postData.content,
      category: 'farming-tips',
      tags: ['organic', 'sustainability']
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      createPost({ title: 'My Post', content: 'Content here' });
    }}>
      {/* Form implementation */}
      <button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Create Post'}
      </button>
    </form>
  );
}

// ============================================
// 7. NOTIFICATIONS EXAMPLE
// ============================================

export function NotificationsExample() {
  const { data: notifications, execute } = useApi(apiClient.notifications.getUnread);

  React.useEffect(() => {
    execute();
  }, []);

  const markAsRead = async (notificationId: string) => {
    await apiClient.notifications.markAsRead(notificationId);
    execute(); // Refresh
  };

  return (
    <div>
      {notifications?.map((notif: any) => (
        <div key={notif.id} onClick={() => markAsRead(notif.id)}>
          <p>{notif.message}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 8. FILE UPLOAD EXAMPLE
// ============================================

export function ImageUploadExample() {
  const [uploading, setUploading] = React.useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await apiClient.upload.image(file);
      if (response.success) {
        console.log('Uploaded image URL:', response.data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          handleUpload(e.target.files[0]);
        }
      }}
      disabled={uploading}
    />
  );
}

// ============================================
// 9. ANALYTICS EXAMPLE (Admin Dashboard)
// ============================================

export function AnalyticsDashboardExample() {
  const { data: analytics, loading, execute } = useApi(apiClient.analytics.getDashboard);

  React.useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Loading analytics...</div>;

  return (
    <div className="analytics-dashboard">
      <div>Total Sales: ${analytics?.totalSales}</div>
      <div>Total Orders: {analytics?.totalOrders}</div>
      <div>Total Users: {analytics?.totalUsers}</div>
    </div>
  );
}

// ============================================
// 10. ERROR HANDLING EXAMPLE
// ============================================

export function ErrorHandlingExample() {
  const { data, loading, error, execute } = useApi(apiClient.products.getAll, {
    onError: (error) => {
      // Global error handling
      if (error.status === 401) {
        // Redirect to login
        window.location.href = '/login';
      } else if (error.status === 403) {
        alert('You do not have permission to access this resource');
      } else if (error.status === 0) {
        alert('Cannot connect to server. Please check your internet connection.');
      }
    }
  });

  return (
    <div>
      {error && (
        <div className="error-banner">
          {error.message}
          <button onClick={() => execute()}>Retry</button>
        </div>
      )}
      {/* Rest of component */}
    </div>
  );
}
