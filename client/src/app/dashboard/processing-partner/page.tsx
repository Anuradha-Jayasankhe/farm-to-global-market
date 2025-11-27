'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Clock, 
  DollarSign, 
  CheckCircle,
  XCircle,
  TrendingUp,
  Box,
  Layers,
  Image as ImageIcon,
  BarChart3,
  Eye,
  Truck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProcessingPartnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'capacity' | 'packaging' | 'inventory' | 'payments'>('orders');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [analyticsResponse, ordersResponse] = await Promise.all([
        apiClient.analytics.getDashboard(),
        apiClient.orders.getAll()
      ]);

      if (analyticsResponse.success && analyticsResponse.data) {
        const orders = ordersResponse.success && Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
        setOrders(orders.slice(0, 10));

        const pendingOrders = orders.filter((order: any) => 
          ['pending', 'processing'].includes(order.status)
        ).length;
        const completedOrders = orders.filter((order: any) => 
          order.status === 'delivered'
        ).length;

        setStats({
          totalRevenue: analyticsResponse.data.totalRevenue || 0,
          totalOrders: analyticsResponse.data.totalOrders || orders.length || 0,
          pendingOrders: pendingOrders || 8,
          completedOrders: completedOrders || 42,
        });
      } else {
        // Fallback demo data
        setStats({
          totalRevenue: 145780,
          totalOrders: 58,
          pendingOrders: 12,
          completedOrders: 46,
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Fallback demo data on error
      setStats({
        totalRevenue: 145780,
        totalOrders: 58,
        pendingOrders: 12,
        completedOrders: 46,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const response = await apiClient.orders.updateStatus(orderId, 'processing');
      if (response.success) {
        alert('Order accepted successfully!');
        await loadDashboardData();
      } else {
        alert('Failed to accept order');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order');
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to reject this order?')) return;
    
    try {
      const response = await apiClient.orders.updateStatus(orderId, 'cancelled');
      if (response.success) {
        alert('Order rejected successfully!');
        await loadDashboardData();
      } else {
        alert('Failed to reject order');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('Failed to reject order');
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders?.toString() || '0',
      change: 'Needs action',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Completed Orders',
      value: stats?.completedOrders?.toString() || '0',
      change: 'This month',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Processing Capacity',
      value: '75%',
      change: 'Utilized',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const pendingOrders = [
    {
      id: 'ORD-2501',
      farmer: 'Rajesh Kumar',
      product: 'Organic Tomatoes',
      quantity: '500 kg',
      rawPrice: 2500,
      processingType: 'Dehydration + Packaging',
      deadline: '2025-12-05',
      estimatedRevenue: 7500,
      status: 'pending',
    },
    {
      id: 'ORD-2502',
      farmer: 'Priya Sharma',
      product: 'Fresh Mangoes',
      quantity: '300 kg',
      rawPrice: 4500,
      processingType: 'Pulping + Bottling',
      deadline: '2025-12-03',
      estimatedRevenue: 13500,
      status: 'pending',
    },
    {
      id: 'ORD-2503',
      farmer: 'Amit Patel',
      product: 'Green Chillies',
      quantity: '200 kg',
      rawPrice: 1200,
      processingType: 'Drying + Grinding',
      deadline: '2025-12-08',
      estimatedRevenue: 4800,
      status: 'pending',
    },
  ];

  const activeProcessing = [
    {
      id: 'ORD-2498',
      product: 'Turmeric Powder',
      stage: 'Drying',
      progress: 65,
      startDate: '2025-11-20',
      expectedCompletion: '2025-11-28',
    },
    {
      id: 'ORD-2495',
      product: 'Mango Pulp',
      stage: 'Packaging',
      progress: 85,
      startDate: '2025-11-18',
      expectedCompletion: '2025-11-26',
    },
  ];

  const capacityData = [
    { facility: 'Dehydration Unit', capacity: 500, used: 380, unit: 'kg/day' },
    { facility: 'Packaging Line', capacity: 1000, used: 750, unit: 'units/day' },
    { facility: 'Cold Storage', capacity: 5000, used: 3200, unit: 'kg' },
    { facility: 'Quality Control', capacity: 200, used: 145, unit: 'batches/day' },
  ];

  const inventory = [
    { item: 'Packaging Boxes (500g)', quantity: 5000, reorderLevel: 1000, status: 'good' },
    { item: 'Vacuum Seal Bags', quantity: 800, reorderLevel: 1000, status: 'low' },
    { item: 'Labels & Stickers', quantity: 3500, reorderLevel: 500, status: 'good' },
    { item: 'Desiccant Packets', quantity: 2000, reorderLevel: 500, status: 'good' },
  ];

  const recentPayments = [
    { id: 'PAY-501', farmer: 'Rajesh Kumar', amount: 2500, commission: 5000, date: '2025-11-23', status: 'completed' },
    { id: 'PAY-502', farmer: 'Meena Devi', amount: 1800, commission: 3600, date: '2025-11-22', status: 'completed' },
    { id: 'PAY-503', farmer: 'Suresh Singh', amount: 3200, commission: 6400, date: '2025-11-21', status: 'pending' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🏭 Processing Partner Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Manage orders and processing operations.
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
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'orders'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Orders Management
            </button>
            <button
              onClick={() => setActiveTab('capacity')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'capacity'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Processing Capacity
            </button>
            <button
              onClick={() => setActiveTab('packaging')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'packaging'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Packaging & Preview
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'inventory'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Inventory
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'payments'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Payments & Commission
            </button>
          </div>

          {/* Orders Management Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Pending Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    Pending Orders - Requires Action
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingOrders.map((order) => (
                      <div key={order.id} className="p-6 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {order.product}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              From: {order.farmer} • Order ID: {order.id}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-xs font-medium">
                            Pending
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Quantity</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{order.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Raw Price</p>
                            <p className="font-semibold text-gray-900 dark:text-white">${order.rawPrice}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Processing Type</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{order.processingType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Deadline</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{order.deadline}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Est. Revenue</p>
                            <p className="font-semibold text-green-600">${order.estimatedRevenue}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleAcceptOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Order
                          </Button>
                          <Button 
                            onClick={() => handleRejectOrder(order.id)}
                            variant="outline"
                            className="border-red-500 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Processing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Currently Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProcessing.map((item) => (
                      <div key={item.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {item.product}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Order ID: {item.id} • Stage: {item.stage}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
                            In Progress
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Started: {item.startDate}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            Expected: {item.expectedCompletion}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Processing Capacity Tab */}
          {activeTab === 'capacity' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Capacity Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {capacityData.map((facility) => (
                      <div key={facility.facility}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{facility.facility}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {facility.used} / {facility.capacity} {facility.unit}
                            </p>
                          </div>
                          <span className={`text-lg font-bold ${
                            (facility.used / facility.capacity) > 0.8 ? 'text-red-600' :
                            (facility.used / facility.capacity) > 0.6 ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {Math.round((facility.used / facility.capacity) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all ${
                              (facility.used / facility.capacity) > 0.8 ? 'bg-red-600' :
                              (facility.used / facility.capacity) > 0.6 ? 'bg-yellow-600' :
                              'bg-green-600'
                            }`}
                            style={{ width: `${(facility.used / facility.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Packaging Tab */}
          {activeTab === 'packaging' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Packaging Design & Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Product Name
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g., Organic Turmeric Powder"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Package Size
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800">
                          <option>100g</option>
                          <option>250g</option>
                          <option>500g</option>
                          <option>1kg</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Design Theme
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800">
                          <option>Premium Organic</option>
                          <option>Traditional</option>
                          <option>Modern Minimal</option>
                          <option>Export Ready</option>
                        </select>
                      </div>
                      <Button className="w-full">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Generate AI Preview
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex items-center justify-center">
                      <div className="text-center">
                        <Box className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          AI-generated packaging preview will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Packaging Materials Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Item</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Reorder Level</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{item.item}</td>
                            <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">{item.quantity}</td>
                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.reorderLevel}</td>
                            <td className="py-3 px-4">
                              {item.status === 'low' ? (
                                <span className="flex items-center gap-1 text-red-600">
                                  <AlertCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">Low Stock</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-sm font-medium">Good</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <Button size="sm" variant="outline">Reorder</Button>
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

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Commission</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$15,000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pending Payments</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$3,200</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Avg Commission Rate</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">20%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments & Commission</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Payment ID</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Farmer</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Paid to Farmer</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Your Commission</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPayments.map((payment) => (
                          <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{payment.id}</td>
                            <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{payment.farmer}</td>
                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">${payment.amount}</td>
                            <td className="py-3 px-4 text-sm font-semibold text-green-600">+${payment.commission}</td>
                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{payment.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                payment.status === 'completed'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                              }`}>
                                {payment.status}
                              </span>
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
        </div>
      </main>
    </>
  );
}
