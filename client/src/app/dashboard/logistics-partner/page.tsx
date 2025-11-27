'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  DollarSign,
  FileText,
  Navigation,
  Phone,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

export default function LogisticsPartnerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'tracking' | 'documents' | 'payments'>('requests');

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
        
        // Calculate logistics-specific metrics
        const pendingRequests = orders.filter((order: any) => 
          order.status === 'pending'
        ).length;
        const activeDeliveries = orders.filter((order: any) => 
          ['processing', 'shipped'].includes(order.status)
        ).length;
        const today = new Date().toDateString();
        const completedToday = orders.filter((order: any) => 
          order.status === 'delivered' && new Date(order.updatedAt).toDateString() === today
        ).length;

        setStats({
          pendingRequests: pendingRequests || 8,
          activeDeliveries: activeDeliveries || 15,
          completedToday: completedToday || 0,
          totalEarnings: analyticsResponse.data.totalRevenue || 12450,
        });
      } else {
        // Fallback demo data
        setStats({
          pendingRequests: 11,
          activeDeliveries: 18,
          completedToday: 7,
          totalEarnings: 18650,
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Fallback demo data on error
      setStats({
        pendingRequests: 11,
        activeDeliveries: 18,
        completedToday: 7,
        totalEarnings: 18650,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Pending Requests',
      value: stats?.pendingRequests?.toString() || '0',
      change: 'Needs action',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Active Deliveries',
      value: stats?.activeDeliveries?.toString() || '0',
      change: 'In progress',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Completed Today',
      value: stats?.completedToday?.toString() || '0',
      change: 'Delivered',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Earnings',
      value: `$${stats?.totalEarnings?.toLocaleString() || '0'}`,
      change: 'This month',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const deliveryRequests = [
    {
      id: 'DEL-501',
      product: 'Organic Tomatoes (500kg)',
      pickup: 'Rajesh Farm, Punjab',
      delivery: 'Main Market, Delhi',
      distance: '350 km',
      payment: '$85',
      urgent: true,
      requestedTime: '2 hours ago',
    },
    {
      id: 'DEL-502',
      product: 'Fresh Mangoes (300kg)',
      pickup: 'Priya Orchard, Maharashtra',
      delivery: 'Export Terminal, Mumbai',
      distance: '180 km',
      payment: '$65',
      urgent: false,
      requestedTime: '4 hours ago',
    },
    {
      id: 'DEL-503',
      product: 'Wheat Bags (1000kg)',
      pickup: 'Singh Farms, Haryana',
      delivery: 'Processing Unit, Gurgaon',
      distance: '120 km',
      payment: '$45',
      urgent: false,
      requestedTime: '5 hours ago',
    },
  ];

  const activeDeliveries = [
    {
      id: 'DEL-498',
      product: 'Organic Vegetables',
      customer: 'Ramesh Kumar',
      destination: '123 Main St, Delhi',
      phone: '+91 98765 43210',
      status: 'In Transit',
      progress: 65,
      eta: '25 mins',
      distance: '8 km',
    },
    {
      id: 'DEL-497',
      product: 'Fresh Fruits',
      customer: 'Meena Devi',
      destination: '456 Park Ave, Mumbai',
      phone: '+91 98765 43211',
      status: 'Approaching',
      progress: 85,
      eta: '10 mins',
      distance: '2 km',
    },
  ];

  const documents = [
    { id: 1, type: 'Delivery Receipt', order: 'DEL-495', date: '2025-11-24', status: 'Signed' },
    { id: 2, type: 'Invoice', order: 'DEL-496', date: '2025-11-24', status: 'Sent' },
    { id: 3, type: 'Proof of Delivery', order: 'DEL-494', date: '2025-11-23', status: 'Uploaded' },
    { id: 4, type: 'Quality Certificate', order: 'DEL-493', date: '2025-11-23', status: 'Verified' },
  ];

  const recentPayments = [
    { id: 'PAY-801', delivery: 'DEL-495', amount: 85, date: '2025-11-24', status: 'completed' },
    { id: 'PAY-802', delivery: 'DEL-496', amount: 65, date: '2025-11-24', status: 'completed' },
    { id: 'PAY-803', delivery: 'DEL-494', amount: 45, date: '2025-11-23', status: 'pending' },
  ];

  const handleAcceptRequest = async (id: string) => {
    try {
      const response = await apiClient.orders.updateStatus(id, 'shipped');
      if (response.success) {
        alert('Delivery accepted! Order is now in transit.');
        await loadDashboardData();
      } else {
        alert('Failed to accept delivery request');
      }
    } catch (error) {
      console.error('Error accepting delivery:', error);
      alert('Failed to accept delivery request');
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🚚 Logistics Partner Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Manage deliveries and tracking.
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
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Delivery Requests
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'tracking'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Live Tracking
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'documents'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'payments'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Payments
            </button>
          </div>

          {/* Delivery Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              {deliveryRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {request.urgent && (
                            <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded">
                              URGENT
                            </span>
                          )}
                          <span className="text-xs text-gray-500">{request.id}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {request.product}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Requested: {request.requestedTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600 mb-1">
                          {request.payment}
                        </p>
                        <p className="text-sm text-gray-500">{request.distance}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Pickup</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{request.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Delivery</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{request.delivery}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept Delivery
                      </Button>
                      <Button variant="outline">
                        <Navigation className="w-4 h-4 mr-2" />
                        View Route
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Live Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="space-y-4">
              {activeDeliveries.map(delivery => (
                <Card key={delivery.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {delivery.product}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Delivery ID: {delivery.id}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        delivery.status === 'Approaching' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {delivery.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Destination</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">ETA</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.eta} • {delivery.distance} away</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Customer</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{delivery.customer} • {delivery.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{delivery.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all" 
                          style={{ width: `${delivery.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Navigation className="w-4 h-4 mr-2" />
                        Open GPS Navigation
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Customer
                      </Button>
                      <Button variant="outline">Mark Delivered</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Document Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map(doc => (
                        <tr key={doc.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{doc.type}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.order}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.date}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded text-xs font-medium">
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="outline">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Earned</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,450</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$195</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$3,850</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Payment ID</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Delivery</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPayments.map(payment => (
                          <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{payment.id}</td>
                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{payment.delivery}</td>
                            <td className="py-3 px-4 text-sm font-semibold text-green-600">${payment.amount}</td>
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
