'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Package, 
  Truck,
  FileText,
  DollarSign,
  Ship,
  CheckCircle,
  Clock,
  MapPin,
  Download,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function GlobalBuyerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'catalog' | 'missions' | 'shipments' | 'docs' | 'payments'>('catalog');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const analyticsResponse = await apiClient.analytics.getDashboard();
      if (analyticsResponse.success && analyticsResponse.data) {
        setStats({
          totalOrders: analyticsResponse.data.totalOrders || 0,
          totalSpent: analyticsResponse.data.totalRevenue || 0,
          activeShipments: 5,
          completedOrders: 28,
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
      title: 'Total Orders',
      value: stats?.totalOrders?.toString() || '0',
      change: 'All time',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Active Shipments',
      value: stats?.activeShipments?.toString() || '0',
      change: 'In transit',
      icon: Ship,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Completed Orders',
      value: stats?.completedOrders?.toString() || '0',
      change: 'Delivered',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Spent',
      value: `$${stats?.totalSpent?.toLocaleString() || '0'}`,
      change: 'All time',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  const exportProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      category: 'Grains',
      origin: 'Punjab, India',
      minOrder: '10 Tonnes',
      price: '$850/tonne',
      certifications: ['Organic', 'Fair Trade', 'Export Quality'],
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    },
    {
      id: 2,
      name: 'Organic Turmeric Powder',
      category: 'Spices',
      origin: 'Kerala, India',
      minOrder: '5 Tonnes',
      price: '$3,200/tonne',
      certifications: ['Organic', 'USDA', 'ISO 22000'],
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    },
    {
      id: 3,
      name: 'Alphonso Mango Pulp',
      category: 'Processed Foods',
      origin: 'Maharashtra, India',
      minOrder: '2 Tonnes',
      price: '$2,400/tonne',
      certifications: ['GI Tag', 'Export Quality', 'FSSAI'],
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400',
    },
  ];

  const bulkMissions = [
    {
      id: 'MISS-501',
      product: 'Premium Basmati Rice',
      quantity: '50 Tonnes',
      destination: 'Dubai, UAE',
      status: 'Preparing',
      progress: 45,
      estimatedShip: '2025-12-05',
      value: '$42,500',
    },
    {
      id: 'MISS-502',
      product: 'Organic Tea',
      quantity: '20 Tonnes',
      destination: 'London, UK',
      status: 'In Transit',
      progress: 70,
      estimatedShip: '2025-11-28',
      value: '$38,000',
    },
  ];

  const activeShipments = [
    {
      id: 'SHIP-7801',
      product: 'Premium Basmati Rice (30T)',
      destination: 'New York, USA',
      status: 'In Transit',
      vessel: 'MV Ocean Pearl',
      departure: '2025-11-15',
      eta: '2025-12-10',
      location: 'Indian Ocean',
      customsStatus: 'Cleared',
    },
    {
      id: 'SHIP-7802',
      product: 'Turmeric Powder (15T)',
      destination: 'Sydney, Australia',
      status: 'At Port',
      vessel: 'MV Pacific Star',
      departure: '2025-11-18',
      eta: '2025-12-05',
      location: 'Singapore Port',
      customsStatus: 'In Progress',
    },
  ];

  const documents = [
    { id: 1, name: 'Commercial Invoice', order: 'ORD-7801', date: '2025-11-15', type: 'PDF' },
    { id: 2, name: 'Bill of Lading', order: 'SHIP-7801', date: '2025-11-16', type: 'PDF' },
    { id: 3, name: 'Certificate of Origin', order: 'ORD-7801', date: '2025-11-15', type: 'PDF' },
    { id: 4, name: 'Phytosanitary Certificate', order: 'ORD-7802', date: '2025-11-18', type: 'PDF' },
    { id: 5, name: 'Packing List', order: 'ORD-7801', date: '2025-11-15', type: 'PDF' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🌍 Global/Export Buyer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Manage international orders and shipments.
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
              onClick={() => setActiveTab('catalog')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'catalog'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Export Catalog
            </button>
            <button
              onClick={() => setActiveTab('missions')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'missions'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Bulk Missions
            </button>
            <button
              onClick={() => setActiveTab('shipments')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'shipments'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Shipment Tracking
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'docs'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'payments'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              International Payments
            </button>
          </div>

          {/* Export Catalog Tab */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search export products..."
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

              <div className="grid lg:grid-cols-3 gap-4">
                {exportProducts.map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                          {product.category}
                        </span>
                        <span className="text-xs text-gray-500">{product.origin}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      <div className="space-y-1 mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Min Order: <span className="font-semibold">{product.minOrder}</span>
                        </p>
                        <p className="text-lg font-bold text-green-600">{product.price}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.certifications.map((cert, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                      <Button className="w-full">Request Quote</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Bulk Missions Tab */}
          {activeTab === 'missions' && (
            <div className="space-y-4">
              {bulkMissions.map(mission => (
                <Card key={mission.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {mission.product}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Mission ID: {mission.id} • {mission.quantity}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        mission.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {mission.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Destination</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{mission.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Est. Ship Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{mission.estimatedShip}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Value</p>
                        <p className="font-semibold text-green-600">{mission.value}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mission.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${mission.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Shipment Tracking Tab */}
          {activeTab === 'shipments' && (
            <div className="space-y-4">
              {activeShipments.map(shipment => (
                <Card key={shipment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {shipment.product}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Shipment ID: {shipment.id} • {shipment.vessel}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {shipment.status}
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Current Location</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Destination</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Estimated Arrival</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.eta}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Customs Status</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.customsStatus}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track on Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'docs' && (
            <Card>
              <CardHeader>
                <CardTitle>Export Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Document</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Order/Shipment</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map(doc => (
                        <tr key={doc.id} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{doc.name}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.order}</td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{doc.date}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded text-xs font-medium">
                              {doc.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* International Payments Tab */}
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
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$385,000</p>
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
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$42,500</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$128,000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Letter of Credit (L/C)</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Secure international payment method</p>
                      </div>
                      <Button size="sm">Setup</Button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Wire Transfer (SWIFT)</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Direct bank-to-bank transfer</p>
                      </div>
                      <Button size="sm">Setup</Button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">PayPal International</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Quick payment processing</p>
                      </div>
                      <Button size="sm">Setup</Button>
                    </div>
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
