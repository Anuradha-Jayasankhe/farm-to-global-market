'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package,
  TruckIcon,
  DollarSign,
  Factory,
  BarChart3,
  ShoppingCart,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface ProcessorStats {
  totalOrders: number;
  totalSpent: number;
  activeProcessing: number;
  completedBatches: number;
}

export default function ProcessorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProcessorStats>({
    totalOrders: 0,
    totalSpent: 0,
    activeProcessing: 0,
    completedBatches: 0,
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [availableCrops, setAvailableCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load processor analytics, orders, and available crops in parallel
      const [analyticsResponse, ordersResponse, productsResponse] = await Promise.all([
        apiClient.analytics.getDashboard(),
        apiClient.orders.getAll(),
        apiClient.products.getAll({ category: 'crops', limit: 6 })
      ]);
      
      if (ordersResponse.success && Array.isArray(ordersResponse.data)) {
        const orderData = ordersResponse.data;
        setOrders(orderData.slice(0, 5));
        
        // Use analytics data if available
        if (analyticsResponse.success && analyticsResponse.data) {
          const activeProcessing = orderData.filter((order: any) => 
            ['processing', 'shipped'].includes(order.status)
          ).length;
          const completedBatches = orderData.filter((order: any) => 
            order.status === 'delivered'
          ).length;

          setStats({
            totalOrders: analyticsResponse.data.totalOrders || orderData.length || 0,
            totalSpent: analyticsResponse.data.totalSpent || analyticsResponse.data.totalRevenue || 0,
            activeProcessing: analyticsResponse.data.pendingOrders || activeProcessing || 0,
            completedBatches: analyticsResponse.data.completedOrders || completedBatches || 0,
          });
        } else {
          // Fallback calculation from orders
          const totalSpent = orderData.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
          const activeProcessing = orderData.filter((order: any) => 
            ['processing', 'shipped'].includes(order.status)
          ).length;
          
          setStats({
            totalOrders: orderData.length,
            totalSpent,
            activeProcessing,
            completedBatches: orderData.filter((o: any) => o.status === 'delivered').length,
          });
        }
      } else {
        // Fallback demo data
        setStats({
          totalOrders: 34,
          totalSpent: 56780,
          activeProcessing: 7,
          completedBatches: 27,
        });
      }

      // Set available crops for processing
      if (productsResponse.success && Array.isArray(productsResponse.data)) {
        setAvailableCrops(productsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Fallback demo data on error
      setStats({
        totalOrders: 34,
        totalSpent: 56780,
        activeProcessing: 7,
        completedBatches: 27,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Investment',
      value: `$${stats.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Active Processing',
      value: stats.activeProcessing.toString(),
      icon: Factory,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Completed Batches',
      value: stats.completedBatches.toString(),
      icon: Package,
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
              Processor Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Manage your processing operations.
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
            {/* Processing Status */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Processing Orders</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Order #{order._id.slice(-6)}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString()}
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
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {order.items?.length || 0} items • ${order.totalAmount}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Update Status</Button>
                          <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Factory className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No active processing orders</p>
                    <Link href="/marketplace">
                      <Button>Browse Crops</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/marketplace">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Raw Materials
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Factory className="w-4 h-4 mr-2" />
                  Processing Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TruckIcon className="w-4 h-4 mr-2" />
                  Shipping & Logistics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Production Analytics
                </Button>
                <Link href="/value-booster">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Value Optimization
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Available Crops for Processing */}
          <Card>
            <CardHeader>
              <CardTitle>Available Crops for Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {availableCrops.map(product => (
                  <Link key={product._id} href={`/marketplace/${product._id}`}>
                    <div className="group cursor-pointer">
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        From: {product.sellerName}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            ${product.price}/{product.unit}
                          </span>
                          <p className="text-xs text-gray-500">
                            Min Order: {product.minOrder} {product.unit}
                          </p>
                        </div>
                        {product.isOrganic && (
                          <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
                            Organic
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/marketplace">
                  <Button variant="outline">
                    View All Available Crops
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
