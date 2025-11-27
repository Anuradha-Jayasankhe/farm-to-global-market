'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Package,
  TruckIcon,
  DollarSign,
  Search,
  Filter,
  Heart,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface BuyerStats {
  totalOrders: number;
  totalSpent: number;
  activeOrders: number;
  savedProducts: number;
}

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<BuyerStats>({
    totalOrders: 0,
    totalSpent: 0,
    activeOrders: 0,
    savedProducts: 0,
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load buyer analytics and orders
      const [analyticsResponse, ordersResponse] = await Promise.all([
        apiClient.analytics.getDashboard(),
        apiClient.orders.getAll()
      ]);
      
      if (ordersResponse.success && ordersResponse.data) {
        const orderData = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
        setOrders(orderData.slice(0, 5));
        
        // Use analytics data if available, otherwise calculate from orders
        if (analyticsResponse.success && analyticsResponse.data) {
          const data = analyticsResponse.data;
          setStats({
            totalOrders: data.totalOrders || orderData.length,
            totalSpent: data.totalSpent || 0,
            activeOrders: data.pendingOrders || 0,
            savedProducts: 0, // TODO: Add wishlist feature
          });
        } else {
          // Fallback calculation from orders
          const totalSpent = orderData.reduce((sum: number, order: any) => 
            sum + (order.totalAmount || order.pricing?.totalAmount || 0), 0
          );
          const activeOrders = orderData.filter((order: any) => 
            ['pending', 'processing', 'shipped'].includes(order.status)
          ).length;
          
          setStats({
            totalOrders: orderData.length,
            totalSpent,
            activeOrders,
            savedProducts: 0,
          });
        }
      } else {
        // Fallback demo data
        setStats({
          totalOrders: 15,
          totalSpent: 8450,
          activeOrders: 3,
          savedProducts: 8,
        });
      }

      // Load recommended products
      const productsResponse = await apiClient.products.getAll({ limit: 6 });
      if (productsResponse.success && productsResponse.data) {
        setRecentProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Set fallback demo data
      setStats({
        totalOrders: 15,
        totalSpent: 8450,
        activeOrders: 3,
        savedProducts: 8,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders.toString(),
      icon: TruckIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Saved Items',
      value: stats.savedProducts.toString(),
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
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
              Buyer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Explore fresh products from local farmers.
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

          {/* Quick Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search for products, farmers, or categories..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <Link href="/marketplace">
                  <Button className="bg-gradient-primary text-white">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Orders */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
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
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {order.items?.length || 0} items • ${order.totalAmount}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Track Order</Button>
                          <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">No orders yet</p>
                    <Link href="/marketplace">
                      <Button>Start Shopping</Button>
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
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    View Cart
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  My Wishlist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TruckIcon className="w-4 h-4 mr-2" />
                  Track Orders
                </Button>
                <Link href="/community">
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Products */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recentProducts.map(product => (
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
                        {product.sellerName}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ${product.price}/{product.unit}
                        </span>
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
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
