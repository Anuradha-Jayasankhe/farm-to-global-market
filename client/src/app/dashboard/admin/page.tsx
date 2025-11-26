'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Package,
  TrendingUp,
  DollarSign,
  BarChart3,
  ShieldCheck,
  AlertCircle,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    activeUsers: 0,
  });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load analytics
      const analyticsResponse = await apiClient.analytics.getDashboard();
      if (analyticsResponse.success && analyticsResponse.data) {
        const data = analyticsResponse.data;
        setStats({
          totalUsers: data.totalUsers || 0,
          totalProducts: data.totalProducts || 0,
          totalOrders: data.totalOrders || 0,
          totalRevenue: data.totalRevenue || 0,
          pendingApprovals: 0, // TODO: Add to backend
          activeUsers: data.totalUsers || 0, // Use totalUsers for now
        });
      }

      // Load recent products for approval
      const productsResponse = await apiClient.products.getAll({ limit: 5 });
      if (productsResponse.success) {
        setRecentProducts(productsResponse.data || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      change: `${stats.activeUsers} active`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      change: `${stats.pendingApprovals} pending`,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      change: 'All time',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Platform Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: 'This month',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Platform overview and management
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

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* System Alerts */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>System Alerts & Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.pendingApprovals > 0 && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Pending Product Approvals
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {stats.pendingApprovals} products waiting for approval
                        </p>
                        <Button size="sm" variant="outline">Review Products</Button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        System Health
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        All services running normally
                      </p>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Platform Growth
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        +25% new users this month
                      </p>
                      <Button size="sm" variant="outline">View Analytics</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="w-4 h-4 mr-2" />
                  Manage Products
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Review Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Products */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Products</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : recentProducts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Seller</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Stock</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProducts.map(product => (
                        <tr key={product._id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={product.thumbnail} alt={product.name} className="w-10 h-10 rounded object-cover" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{product.sellerName}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">${product.price}/{product.unit}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{product.stock}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.isApproved ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            }`}>
                              {product.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">View</Button>
                              {!product.isApproved && (
                                <Button size="sm" variant="outline">Approve</Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No products found</div>
              )}
            </CardContent>
          </Card>

          {/* Platform Statistics */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                  <BarChart3 className="w-16 h-16 text-gray-400" />
                  <p className="ml-4 text-gray-600 dark:text-gray-400">Chart visualization</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-linear-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
                  <TrendingUp className="w-16 h-16 text-gray-400" />
                  <p className="ml-4 text-gray-600 dark:text-gray-400">Chart visualization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
