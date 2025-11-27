'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Star,
  MapPin,
  Clock,
  Plus,
  Filter,
  Heart,
  Truck,
  RefreshCcw,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalSpent: number;
}

export default function LocalBuyerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'browse' | 'orders' | 'tracking' | 'favorites'>('browse');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load analytics and orders in parallel
      const [analyticsResponse, ordersResponse, productsResponse] = await Promise.all([
        apiClient.analytics.getDashboard(),
        apiClient.orders.getAll(),
        apiClient.products.getAll({ limit: 12 })
      ]);
      
      if (ordersResponse.success && ordersResponse.data) {
        const allOrders = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
        setOrders(allOrders.slice(0, 10));
        
        // Use analytics if available, otherwise calculate from orders
        if (analyticsResponse.success && analyticsResponse.data) {
          const data = analyticsResponse.data;
          setStats({
            totalOrders: data.totalOrders || allOrders.length,
            activeOrders: data.pendingOrders || 0,
            completedOrders: data.completedOrders || 0,
            totalSpent: data.totalSpent || 0,
          });
        } else {
          // Calculate from orders
          const activeOrders = allOrders.filter((o: any) => 
            ['pending', 'processing', 'shipped'].includes(o.status)
          ).length;
          const completedOrders = allOrders.filter((o: any) => o.status === 'delivered').length;
          const totalSpent = allOrders.reduce((sum: number, o: any) => 
            sum + (o.totalAmount || o.pricing?.totalAmount || 0), 0
          );
          
          setStats({
            totalOrders: allOrders.length,
            activeOrders,
            completedOrders,
            totalSpent,
          });
        }
      } else {
        // Fallback demo data
        setStats({
          totalOrders: 24,
          activeOrders: 5,
          completedOrders: 19,
          totalSpent: 15420,
        });
      }

      if (productsResponse.success && productsResponse.data) {
        setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Set fallback data
      setStats({
        totalOrders: 24,
        activeOrders: 5,
        completedOrders: 19,
        totalSpent: 15420,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toString() || '0',
      change: 'All time',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Active Orders',
      value: stats?.activeOrders?.toString() || '0',
      change: 'In progress',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Completed',
      value: stats?.completedOrders?.toString() || '0',
      change: 'Delivered',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Spent',
      value: `$${stats?.totalSpent?.toFixed(0) || '0'}`,
      change: 'All time',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const deliveryTracking = [
    {
      orderId: 'ORD-2504',
      product: 'Organic Tomatoes (5kg)',
      status: 'In Transit',
      location: 'Near Main Market',
      eta: '15 mins',
      driver: 'Ramesh Kumar',
      driverPhone: '+91 98765 43210',
    },
    {
      orderId: 'ORD-2503',
      product: 'Fresh Mangoes (3kg)',
      status: 'Out for Delivery',
      location: 'Central Junction',
      eta: '30 mins',
      driver: 'Suresh Singh',
      driverPhone: '+91 98765 43211',
    },
  ];

  const favorites = [
    { id: 1, name: 'Organic Tomatoes', price: 5, unit: 'kg', farmer: 'Rajesh Kumar', rating: 4.8 },
    { id: 2, name: 'Fresh Mangoes', price: 15, unit: 'kg', farmer: 'Priya Sharma', rating: 4.9 },
    { id: 3, name: 'Green Chillies', price: 6, unit: 'kg', farmer: 'Amit Patel', rating: 4.7 },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🛒 Local Buyer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Browse fresh local produce.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className={`text-sm font-semibold ${stat.color}`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'browse'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Browse Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'tracking'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Delivery Tracking
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'favorites'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Favorites
            </button>
          </div>

          {/* Browse Products Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search local produce..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <Card key={product._id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={product.thumbnail} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-red-50">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {product.description?.slice(0, 60)}...
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-green-600">
                          ${product.price}/{product.unit}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                      <Button className="w-full">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order._id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          Order #{order._id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} items
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Total: ${order.totalAmount}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        {order.status === 'delivered' && (
                          <Button size="sm">
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Delivery Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="space-y-4">
              {deliveryTracking.map((delivery, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {delivery.product}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Order ID: {delivery.orderId}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
                        {delivery.status}
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Current Location</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Estimated Arrival</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.eta}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Driver</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.driver} • {delivery.driverPhone}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track on Map (GPS)
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {favorites.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            By {item.farmer}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600 mb-3">
                          ${item.price}/{item.unit}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Buy Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
