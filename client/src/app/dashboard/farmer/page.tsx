'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Package,
  BarChart3,
  AlertCircle,
  Plus,
  Eye,
  Droplets,
  Cloud,
  Sprout,
  Camera,
  Users,
  ShoppingCart,
  CreditCard,
  Satellite,
  FileText,
  Zap,
  Box,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  totalViews: number;
  revenueChange: number;
  ordersChange: number;
}

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  rainfall: string;
}

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData>({
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainfall: 'Low chance'
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load analytics
      const analyticsResponse = await apiClient.analytics.getDashboard();
      if (analyticsResponse.success && analyticsResponse.data) {
        setStats({
          totalRevenue: analyticsResponse.data.totalRevenue || 0,
          totalOrders: analyticsResponse.data.totalOrders || 0,
          activeProducts: analyticsResponse.data.totalProducts || 0,
          totalViews: analyticsResponse.data.totalViews || 0,
          revenueChange: 0,
          ordersChange: 0,
        });
      }

      // Load farmer's products
      const productsResponse = await apiClient.products.getAll({ limit: 5 });
      if (productsResponse.success) {
        setProducts(productsResponse.data?.slice(0, 5) || []);
      }

      // Load recent orders
      const ordersResponse = await apiClient.orders.getAll();
      if (ordersResponse.success) {
        setOrders(ordersResponse.data?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`,
      change: `+${stats?.revenueChange || 0}%`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Active Products',
      value: stats?.activeProducts?.toString() || '0',
      change: 'Listed',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toString() || '0',
      change: `+${stats?.ordersChange || 0}`,
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Product Views',
      value: stats?.totalViews?.toLocaleString() || '0',
      change: 'This month',
      icon: Eye,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  const quickActions = [
    {
      title: 'Sell Raw Products',
      description: 'List fresh produce',
      icon: Package,
      href: '/sell',
      color: 'bg-blue-500',
    },
    {
      title: 'Value Booster',
      description: 'Convert to export goods',
      icon: Zap,
      href: '/value-booster',
      color: 'bg-purple-500',
    },
    {
      title: 'AI Consultation',
      description: 'Crop & disease help',
      icon: Sprout,
      href: '/ai-consultation',
      color: 'bg-green-500',
    },
    {
      title: 'Satellite Insights',
      description: 'Monitor crop health',
      icon: Satellite,
      href: '/pest-detection',
      color: 'bg-orange-500',
    },
    {
      title: 'Community',
      description: 'Connect with farmers',
      icon: Users,
      href: '/community',
      color: 'bg-pink-500',
    },
    {
      title: 'Buy Accessories',
      description: 'Seeds, tools, equipment',
      icon: ShoppingCart,
      href: '/accessories',
      color: 'bg-indigo-500',
    },
    {
      title: 'Finance Dashboard',
      description: 'Loans & statistics',
      icon: CreditCard,
      href: '/dashboard/farmer/finance',
      color: 'bg-teal-500',
    },
    {
      title: 'Packaging Generator',
      description: 'Design product labels',
      icon: Box,
      href: '/packaging-generator',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  🌾 Farmer Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back, {user?.firstName}! Here's your farm overview.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/sell">
                  <Button className="bg-gradient-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Sell Product
                  </Button>
                </Link>
                <Link href="/value-booster">
                  <Button variant="outline" className="border-purple-500 text-purple-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Value Booster
                  </Button>
                </Link>
              </div>
            </div>

            {/* Weather Widget */}
            <Card className="bg-linear-to-r from-blue-500 to-cyan-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Cloud className="w-12 h-12" />
                    <div>
                      <p className="text-2xl font-bold">{weather.temp}°C</p>
                      <p className="text-sm opacity-90">{weather.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">Humidity: {weather.humidity}%</span>
                    </div>
                    <p className="text-sm opacity-90">{weather.rainfall}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

          {/* Quick Actions Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={action.href}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* AI Alerts & Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  AI Alerts & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Disease Alert: Leaf Blight Detected
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        AI detected potential leaf blight in Section B. Immediate action recommended.
                      </p>
                      <Link href="/pest-detection">
                        <Button size="sm" variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Price Opportunity: Tomatoes +30%
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Market demand for organic tomatoes increased. Consider listing more.
                      </p>
                      <Link href="/marketplace">
                        <Button size="sm" variant="outline">List Products</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Droplets className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Water Schedule: Irrigation Due
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Next irrigation recommended tomorrow morning at 6 AM.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Water Crops - Section A</p>
                    <p className="text-sm text-gray-500">Tomorrow, 6:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Apply Fertilizer</p>
                    <p className="text-sm text-gray-500">In 2 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Harvest Tomatoes</p>
                    <p className="text-sm text-gray-500">In 5 days</p>
                  </div>
                </div>
                <Link href="/dashboard/farmer/tasks">
                  <Button variant="outline" className="w-full mt-3">View All Tasks</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Products */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Products</CardTitle>
              <Link href="/marketplace">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Stock</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Views</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={product.thumbnail} alt={product.name} className="w-10 h-10 rounded object-cover" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">${product.price}/{product.unit}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{product.stock} {product.unit}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{product.views || 0}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">No products yet. Add your first product!</p>
                  <Link href="/sell">
                    <Button className="mt-4 bg-gradient-primary text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Sell Product
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order._id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">#{order._id.slice(-6)}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{order.items?.[0]?.productName || 'N/A'}</td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">${order.totalAmount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                              'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No orders yet</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
