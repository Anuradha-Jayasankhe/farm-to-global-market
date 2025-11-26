'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  BarChart3,
  Box,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Star,
  Filter,
  Search,
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  status: 'active' | 'out_of_stock' | 'discontinued';
}

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  product: string;
  quantity: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export default function AccessoriesSellerDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'analytics'>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock data
  const stats = {
    totalProducts: 45,
    activeOrders: 28,
    monthlyRevenue: 125000,
    avgRating: 4.6,
    totalSales: 340,
    lowStock: 8,
  };

  const mockProducts: Product[] = [
    {
      _id: '1',
      name: 'Organic Fertilizer (50kg)',
      category: 'Fertilizers',
      price: 1200,
      stock: 150,
      sold: 230,
      rating: 4.7,
      status: 'active',
    },
    {
      _id: '2',
      name: 'Drip Irrigation Kit',
      category: 'Irrigation',
      price: 8500,
      stock: 35,
      sold: 89,
      rating: 4.8,
      status: 'active',
    },
    {
      _id: '3',
      name: 'Garden Hand Tools Set',
      category: 'Tools',
      price: 2500,
      stock: 5,
      sold: 156,
      rating: 4.5,
      status: 'active',
    },
    {
      _id: '4',
      name: 'Pesticide Sprayer',
      category: 'Equipment',
      price: 3200,
      stock: 0,
      sold: 67,
      rating: 4.3,
      status: 'out_of_stock',
    },
  ];

  const mockOrders: Order[] = [
    {
      _id: '1',
      orderNumber: 'ORD-2024-001',
      customerName: 'Rajesh Kumar',
      product: 'Organic Fertilizer',
      quantity: 10,
      total: 12000,
      status: 'pending',
      date: '2024-11-25',
    },
    {
      _id: '2',
      orderNumber: 'ORD-2024-002',
      customerName: 'Priya Sharma',
      product: 'Drip Irrigation Kit',
      quantity: 2,
      total: 17000,
      status: 'confirmed',
      date: '2024-11-24',
    },
  ];

  useEffect(() => {
    // Load mock data on mount
    setProducts(mockProducts);
    setOrders(mockOrders);
  }, []);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      out_of_stock: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      discontinued: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                🛠️ Accessories Seller Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.firstName}! Manage your farming accessories business.
              </p>
            </div>
            <Link href="/sell-accessories">
              <Button className="bg-gradient-primary text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalProducts}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+5 this month</p>
                  </div>
                  <Package className="w-12 h-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.activeOrders}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{stats.activeOrders} pending</p>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      ₹{(stats.monthlyRevenue / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">+18% from last month</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.avgRating}</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">★★★★★ {stats.totalSales} reviews</p>
                  </div>
                  <Star className="w-12 h-12 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'products', label: 'My Products', icon: Package },
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Low Stock Alert */}
            {stats.lowStock > 0 && (
              <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="font-medium text-orange-900 dark:text-orange-100">Low Stock Alert</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        {stats.lowStock} products are running low on stock. Restock soon to avoid missing sales!
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-purple-600" />
                      Recent Orders
                    </span>
                    <Link href="#" className="text-sm text-blue-600 hover:underline">
                      View All
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{order.orderNumber}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{order.customerName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{order.product}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">₹{order.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Selling Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Top Selling Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProducts
                      .sort((a, b) => b.sold - a.sold)
                      .slice(0, 3)
                      .map((product) => (
                        <div key={product._id} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Box className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{product.sold} units sold</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                            <div className="flex items-center gap-1 text-sm text-yellow-600">
                              <Star className="w-3 h-3 fill-current" />
                              {product.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products List */}
            <div className="grid grid-cols-1 gap-4">
              {mockProducts.map((product) => (
                <Card key={product._id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                          </div>
                          {getStatusBadge(product.status)}
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                            <p className="font-bold text-gray-900 dark:text-white">₹{product.price}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Stock</p>
                            <p className={`font-bold ${product.stock < 10 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                              {product.stock} units
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Sold</p>
                            <p className="font-bold text-gray-900 dark:text-white">{product.sold} units</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <p className="font-bold text-gray-900 dark:text-white">{product.rating}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Quantity</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order._id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{order.orderNumber}</td>
                          <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{order.customerName}</td>
                          <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{order.product}</td>
                          <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{order.quantity}</td>
                          <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">₹{order.total}</td>
                          <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                          <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                          <td className="py-4 px-4">
                            <Button size="sm" variant="outline">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">This Month</span>
                      <span className="font-bold text-gray-900 dark:text-white">₹125,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                      <span className="font-bold text-gray-900 dark:text-white">₹106,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Growth</span>
                      <span className="font-bold text-green-600 dark:text-green-400">+18%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Fertilizers', percentage: 35, color: 'bg-blue-500' },
                      { name: 'Tools', percentage: 28, color: 'bg-green-500' },
                      { name: 'Irrigation', percentage: 22, color: 'bg-purple-500' },
                      { name: 'Equipment', percentage: 15, color: 'bg-yellow-500' },
                    ].map((category) => (
                      <div key={category.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{category.name}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{category.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className={`${category.color} h-2 rounded-full`} style={{ width: `${category.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
