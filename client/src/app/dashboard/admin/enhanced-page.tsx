'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Package,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Settings,
  ShieldCheck,
  Activity,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

export default function EnhancedAdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'processing' | 'payments' | 'ai' | 'analytics'>('users');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const analyticsResponse = await apiClient.analytics.getDashboard();
      if (analyticsResponse.success && analyticsResponse.data) {
        setStats({
          totalUsers: analyticsResponse.data.totalUsers || 0,
          totalProducts: analyticsResponse.data.totalProducts || 0,
          totalOrders: analyticsResponse.data.totalOrders || 0,
          totalRevenue: analyticsResponse.data.totalRevenue || 0,
          pendingApprovals: 12,
          activeProcessors: 8,
        });
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
      value: stats?.totalUsers?.toString() || '0',
      change: 'All types',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Platform Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`,
      change: 'All time',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals?.toString() || '0',
      change: 'Needs action',
      icon: ShieldCheck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Active Processors',
      value: stats?.activeProcessors?.toString() || '0',
      change: 'Processing network',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const pendingUsers = [
    { id: 1, name: 'Rajesh Kumar', role: 'farmer', location: 'Punjab', registered: '2025-11-24', status: 'pending' },
    { id: 2, name: 'Global Exports Inc', role: 'global_buyer', location: 'Dubai', registered: '2025-11-24', status: 'pending' },
    { id: 3, name: 'Fast Delivery Co', role: 'logistics_partner', location: 'Mumbai', registered: '2025-11-23', status: 'pending' },
  ];

  const activeProcessors = [
    { id: 1, name: 'Premium Processing Ltd', location: 'Maharashtra', capacity: 85, orders: 42, rating: 4.8 },
    { id: 2, name: 'Organic Valley Processing', location: 'Punjab', capacity: 72, orders: 35, rating: 4.6 },
    { id: 3, name: 'Export Ready Solutions', location: 'Gujarat', capacity: 68, orders: 28, rating: 4.9 },
  ];

  const commissionData = [
    { month: 'Oct', farmers: 12500, processors: 8900, buyers: 5400 },
    { month: 'Nov', farmers: 15200, processors: 10800, buyers: 6200 },
  ];

  const aiModels = [
    { name: 'Crop Disease Detection', version: 'v2.4', accuracy: 94, status: 'active', lastUpdated: '2025-11-20' },
    { name: 'Price Prediction', version: 'v1.8', accuracy: 89, status: 'active', lastUpdated: '2025-11-18' },
    { name: 'Yield Optimization', version: 'v3.1', accuracy: 91, status: 'active', lastUpdated: '2025-11-15' },
    { name: 'Weather Forecasting', version: 'v2.0', accuracy: 87, status: 'training', lastUpdated: '2025-11-22' },
  ];

  const handleApproveUser = (id: number) => {
    console.log('Approving user:', id);
  };

  const handleBanUser = (id: number) => {
    console.log('Banning user:', id);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ⚙️ Platform Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Manage the entire platform.
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
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'users'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'processing'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Processing Network
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
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'ai'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              AI Model Controls
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'analytics'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Platform Analytics
            </button>
          </div>

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending User Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingUsers.map(u => (
                      <div key={u.id} className="p-4 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{u.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Role: <span className="font-medium capitalize">{u.role.replace('_', ' ')}</span> • 
                              Location: {u.location} • 
                              Registered: {u.registered}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleApproveUser(u.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleBanUser(u.id)}
                              className="border-red-500 text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Farmers</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">245</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buyers (Local + Global)</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">189</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Partners (All)</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">34</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Processing Network Tab */}
          {activeTab === 'processing' && (
            <div className="space-y-4">
              {activeProcessors.map(proc => (
                <Card key={proc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {proc.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Location: {proc.location} • Rating: ⭐ {proc.rating}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity Used</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{proc.capacity}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{proc.orders}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</p>
                        <p className="text-2xl font-bold text-yellow-600">{proc.rating}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${proc.capacity}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Performance Report</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Payments & Commission Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Platform Commission</p>
                    <p className="text-3xl font-bold text-green-600 mb-1">$45,200</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Farmer Payouts</p>
                    <p className="text-3xl font-bold text-blue-600 mb-1">$128,500</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Processor Commission</p>
                    <p className="text-3xl font-bold text-purple-600 mb-1">$32,400</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Commission Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commissionData.map((data, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{data.month} 2025</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Farmers</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">${data.farmers.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Processors</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">${data.processors.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buyers</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">${data.buyers.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI Model Controls Tab */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              {aiModels.map((model, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {model.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Version: {model.version} • Last Updated: {model.lastUpdated}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        model.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Model Accuracy</span>
                        <span className="font-medium text-gray-900 dark:text-white">{model.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            model.accuracy >= 90 ? 'bg-green-600' : 'bg-yellow-600'
                          }`}
                          style={{ width: `${model.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <Brain className="w-4 h-4 mr-2" />
                        Retrain Model
                      </Button>
                      <Button size="sm" variant="outline">View Metrics</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Platform Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                        <span className="text-lg font-bold text-green-600">+45 users</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Month</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">+38 users</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</span>
                        <span className="text-lg font-bold text-green-600">+18.4%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">1,245</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                        <span className="text-lg font-bold text-green-600">$385,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Avg Transaction</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">$309</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
