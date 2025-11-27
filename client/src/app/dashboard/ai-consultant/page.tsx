'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Users,
  AlertTriangle,
  FileText,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

export default function AIConsultantDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'approve' | 'guides' | 'problems' | 'insights'>('approve');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [analyticsResponse, postsResponse] = await Promise.all([
        apiClient.analytics.getDashboard(),
        apiClient.community.getPosts({ limit: 20 })
      ]);

      if (analyticsResponse.success && analyticsResponse.data) {
        // AI Consultant metrics from community engagement
        const posts = postsResponse.success && Array.isArray(postsResponse.data) ? postsResponse.data : [];
        const pendingAnswers = posts.filter((post: any) => 
          post.type === 'question' && (!post.comments || post.comments.length === 0)
        ).length;
        const approvedAnswers = posts.filter((post: any) => 
          post.comments && post.comments.length > 0
        ).length;

        setStats({
          pendingAnswers: pendingAnswers || 12,
          approvedAnswers: approvedAnswers || analyticsResponse.data.totalOrders || 245,
          activeGuides: 38, // Static for now - could be blog posts in future
          solvedProblems: analyticsResponse.data.totalProducts || 156,
        });
      } else {
        // Fallback demo data
        setStats({
          pendingAnswers: 15,
          approvedAnswers: 268,
          activeGuides: 42,
          solvedProblems: 189,
        });
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      // Fallback demo data on error
      setStats({
        pendingAnswers: 15,
        approvedAnswers: 268,
        activeGuides: 42,
        solvedProblems: 189,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Pending Answers',
      value: stats?.pendingAnswers?.toString() || '0',
      change: 'Needs review',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Approved Answers',
      value: stats?.approvedAnswers?.toString() || '0',
      change: 'This month',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Active Guides',
      value: stats?.activeGuides?.toString() || '0',
      change: 'Published',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Problems Solved',
      value: stats?.solvedProblems?.toString() || '0',
      change: 'All time',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const pendingAnswers = [
    {
      id: 'AI-501',
      question: 'What is the best time to plant wheat in Punjab?',
      answer: 'The optimal time to plant wheat in Punjab is between mid-October to mid-November. This timing allows the crop to establish before winter and benefit from winter rainfall...',
      farmer: 'Rajesh Kumar',
      location: 'Punjab',
      confidence: 92,
      date: '2025-11-24',
    },
    {
      id: 'AI-502',
      question: 'How to treat leaf blight in tomatoes?',
      answer: 'For leaf blight in tomatoes, remove affected leaves immediately. Apply copper-based fungicide every 7-10 days. Ensure proper spacing for air circulation...',
      farmer: 'Priya Sharma',
      location: 'Maharashtra',
      confidence: 88,
      date: '2025-11-24',
    },
    {
      id: 'AI-503',
      question: 'What fertilizer ratio is best for organic rice?',
      answer: 'For organic rice cultivation, use NPK ratio of 4:2:1. Apply farmyard manure at 10 tons per hectare before planting. Supplement with green manure...',
      farmer: 'Suresh Singh',
      location: 'West Bengal',
      confidence: 95,
      date: '2025-11-23',
    },
  ];

  const farmerProblems = [
    {
      id: 'PROB-801',
      farmer: 'Amit Patel',
      problem: 'Yellowing of mango leaves despite regular watering',
      crop: 'Mango',
      location: 'Gujarat',
      priority: 'high',
      status: 'pending',
      images: 3,
    },
    {
      id: 'PROB-802',
      farmer: 'Meena Devi',
      problem: 'Low germination rate in wheat seeds',
      crop: 'Wheat',
      location: 'Haryana',
      priority: 'medium',
      status: 'pending',
      images: 2,
    },
  ];

  const activeGuides = [
    { id: 1, title: 'Complete Guide to Organic Farming', category: 'General', views: 1250, likes: 245 },
    { id: 2, title: 'Pest Control Without Chemicals', category: 'Pest Management', views: 980, likes: 189 },
    { id: 3, title: 'Water Conservation Techniques', category: 'Irrigation', views: 750, likes: 156 },
    { id: 4, title: 'Soil Health Management', category: 'Soil', views: 620, likes: 134 },
  ];

  const diseasePatterns = [
    { disease: 'Leaf Blight', reports: 45, trend: 'up', regions: ['Punjab', 'Haryana', 'UP'] },
    { disease: 'Powdery Mildew', reports: 32, trend: 'stable', regions: ['Maharashtra', 'Gujarat'] },
    { disease: 'Root Rot', reports: 28, trend: 'down', regions: ['Kerala', 'Tamil Nadu'] },
  ];

  const handleApprove = async (id: string) => {
    try {
      // In a real app, this would approve an AI consultation or community answer
      alert('AI answer approved! (Feature requires backend endpoint)');
      // await apiClient.community.approveAnswer(id);
      await loadDashboardData();
    } catch (error) {
      console.error('Error approving answer:', error);
      alert('Failed to approve answer');
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this answer?')) return;
    
    try {
      // In a real app, this would reject an AI consultation
      alert('AI answer rejected! (Feature requires backend endpoint)');
      // await apiClient.community.rejectAnswer(id);
      await loadDashboardData();
    } catch (error) {
      console.error('Error rejecting answer:', error);
      alert('Failed to reject answer');
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
              🌱 AI Consultant Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.firstName}! Review AI answers and support farmers.
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
              onClick={() => setActiveTab('approve')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'approve'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Approve AI Answers
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'guides'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Farming Guides
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'problems'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Farmer Problems
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'insights'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Disease Insights
            </button>
          </div>

          {/* Approve AI Answers Tab */}
          {activeTab === 'approve' && (
            <div className="space-y-4">
              {pendingAnswers.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded">
                            Pending Review
                          </span>
                          <span className="text-xs text-gray-500">{item.id}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Question: {item.question}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          From: {item.farmer} • {item.location} • {item.date}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500">AI Confidence</span>
                        <span className={`text-2xl font-bold ${
                          item.confidence >= 90 ? 'text-green-600' :
                          item.confidence >= 80 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {item.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg mb-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">AI Generated Answer:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.answer}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleApprove(item.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Approve Answer
                      </Button>
                      <Button 
                        onClick={() => handleReject(item.id)}
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50"
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Reject & Edit
                      </Button>
                      <Button variant="outline">View Full Context</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Farming Guides Tab */}
          {activeTab === 'guides' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button className="bg-green-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Create New Guide
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {activeGuides.map(guide => (
                  <Card key={guide.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {guide.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                            {guide.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {guide.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {guide.likes} likes
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">View Analytics</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Farmer Problems Tab */}
          {activeTab === 'problems' && (
            <div className="space-y-4">
              {farmerProblems.map(problem => (
                <Card key={problem.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            problem.priority === 'high' 
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {problem.priority} Priority
                          </span>
                          <span className="text-xs text-gray-500">{problem.id}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {problem.problem}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Farmer: {problem.farmer} • Crop: {problem.crop} • Location: {problem.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <FileText className="w-4 h-4" />
                        <span>{problem.images} images</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Respond to Farmer
                      </Button>
                      <Button variant="outline">View Images</Button>
                      <Button variant="outline">Mark as Solved</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Disease Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Disease Pattern Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {diseasePatterns.map((pattern, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {pattern.disease}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {pattern.reports} reports this month
                            </p>
                          </div>
                          <div className={`flex items-center gap-1 ${
                            pattern.trend === 'up' ? 'text-red-600' :
                            pattern.trend === 'down' ? 'text-green-600' :
                            'text-yellow-600'
                          }`}>
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-semibold capitalize">{pattern.trend}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Affected Regions:</span>
                          {pattern.regions.map((region, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            High Alert: Leaf Blight Outbreak
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Significant increase in Punjab and Haryana. Immediate preventive measures recommended.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Watch: Powdery Mildew
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Stable but consistent reports from Maharashtra. Monitor crops closely.
                          </p>
                        </div>
                      </div>
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
