'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
  Users,
  Wallet,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';

export default function FarmerFinanceDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'lending'>('overview');

  const stats = [
    {
      title: 'Total Balance',
      value: '$12,450',
      change: '+12.5%',
      trend: 'up',
      icon: Wallet,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Active Loans',
      value: '2',
      change: '$5,000',
      trend: 'neutral',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Lending Portfolio',
      value: '$8,200',
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Monthly Earnings',
      value: '$3,850',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  const loanOptions = [
    {
      name: 'Crop Loan',
      amount: '$5,000 - $50,000',
      interest: '6.5% APR',
      tenure: '6-12 months',
      description: 'Short-term loans for crop cultivation expenses',
      icon: '🌾',
    },
    {
      name: 'Equipment Loan',
      amount: '$10,000 - $100,000',
      interest: '8.0% APR',
      tenure: '12-36 months',
      description: 'Finance tractors, harvesters, and farm machinery',
      icon: '🚜',
    },
    {
      name: 'Land Development',
      amount: '$20,000 - $200,000',
      interest: '7.5% APR',
      tenure: '24-60 months',
      description: 'Loans for irrigation, infrastructure, and land improvement',
      icon: '🏞️',
    },
    {
      name: 'Working Capital',
      amount: '$2,000 - $25,000',
      interest: '9.0% APR',
      tenure: '3-6 months',
      description: 'Quick loans for operational expenses',
      icon: '💰',
    },
  ];

  const myLoans = [
    {
      id: 1,
      type: 'Crop Loan',
      amount: 5000,
      disbursed: 5000,
      outstanding: 3200,
      nextPayment: 800,
      dueDate: '2024-02-15',
      status: 'active',
      interest: 6.5,
    },
    {
      id: 2,
      type: 'Equipment Loan',
      amount: 15000,
      disbursed: 15000,
      outstanding: 12500,
      nextPayment: 1250,
      dueDate: '2024-02-20',
      status: 'active',
      interest: 8.0,
    },
  ];

  const lendingOpportunities = [
    {
      id: 1,
      borrower: 'Rajesh Kumar',
      amount: 3000,
      purpose: 'Seed purchase for wheat cultivation',
      location: 'Punjab',
      tenure: '6 months',
      interest: '10% APR',
      returns: 150,
      riskLevel: 'low',
      verified: true,
    },
    {
      id: 2,
      borrower: 'Priya Sharma',
      amount: 5000,
      purpose: 'Drip irrigation system installation',
      location: 'Maharashtra',
      tenure: '12 months',
      interest: '12% APR',
      returns: 300,
      riskLevel: 'medium',
      verified: true,
    },
    {
      id: 3,
      borrower: 'Amit Patel',
      amount: 2000,
      purpose: 'Organic fertilizer purchase',
      location: 'Gujarat',
      tenure: '4 months',
      interest: '9% APR',
      returns: 60,
      riskLevel: 'low',
      verified: true,
    },
  ];

  const myLending = [
    {
      id: 1,
      borrower: 'Suresh Singh',
      amount: 4000,
      disbursed: '2023-11-15',
      nextPayment: 450,
      dueDate: '2024-02-15',
      status: 'active',
      interest: 11,
      totalReturns: 220,
    },
    {
      id: 2,
      borrower: 'Meena Devi',
      amount: 2500,
      disbursed: '2023-12-01',
      nextPayment: 280,
      dueDate: '2024-02-01',
      status: 'active',
      interest: 10,
      totalReturns: 125,
    },
  ];

  const transactions = [
    { id: 1, type: 'credit', desc: 'Product Sale - Tomatoes', amount: 850, date: '2024-01-28', status: 'completed' },
    { id: 2, type: 'debit', desc: 'Loan Payment - Crop Loan', amount: 800, date: '2024-01-25', status: 'completed' },
    { id: 3, type: 'credit', desc: 'Lending Interest - Suresh Singh', amount: 45, date: '2024-01-22', status: 'completed' },
    { id: 4, type: 'debit', desc: 'Fertilizer Purchase', amount: 320, date: '2024-01-20', status: 'completed' },
    { id: 5, type: 'credit', desc: 'Product Sale - Wheat', amount: 1200, date: '2024-01-18', status: 'completed' },
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
                  💰 Finance Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your loans, lending, and financial statistics
                </p>
              </div>
              <Link href="/dashboard/farmer">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
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
                      {stat.trend === 'up' && (
                        <div className="flex items-center text-green-600">
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">{stat.change}</span>
                        </div>
                      )}
                      {stat.trend === 'down' && (
                        <div className="flex items-center text-red-600">
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">{stat.change}</span>
                        </div>
                      )}
                      {stat.trend === 'neutral' && (
                        <span className="text-sm text-gray-600">{stat.change}</span>
                      )}
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
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'loans'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Loans
            </button>
            <button
              onClick={() => setActiveTab('lending')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'lending'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Lending
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {transactions.map(tx => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'credit' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                            }`}>
                              {tx.type === 'credit' ? (
                                <ArrowDownRight className="w-5 h-5 text-green-600" />
                              ) : (
                                <ArrowUpRight className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">{tx.desc}</p>
                              <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                          </div>
                          <div className={`font-semibold ${
                            tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {tx.type === 'credit' ? '+' : '-'}${tx.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Income</span>
                        <span className="font-semibold text-green-600">+$8,450</span>
                      </div>
                      <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</span>
                        <span className="font-semibold text-red-600">-$4,200</span>
                      </div>
                      <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Loan Payments</span>
                        <span className="font-semibold text-blue-600">-$2,050</span>
                      </div>
                      <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Lending Returns</span>
                        <span className="font-semibold text-purple-600">+$345</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Loans Tab */}
          {activeTab === 'loans' && (
            <div className="space-y-6">
              {/* My Active Loans */}
              <Card>
                <CardHeader>
                  <CardTitle>My Active Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myLoans.map(loan => (
                      <div key={loan.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {loan.type}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {loan.interest}% APR • Loan #L{loan.id}00{loan.id}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">
                            {loan.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Loan Amount</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">${loan.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Outstanding</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">${loan.outstanding.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Payment</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">${loan.nextPayment}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Due Date</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {new Date(loan.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {Math.round((1 - loan.outstanding / loan.amount) * 100)}% Paid
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(1 - loan.outstanding / loan.amount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Pay Now</Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Loan Options */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Loan Options</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {loanOptions.map((loan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="text-4xl mb-3">{loan.icon}</div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {loan.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {loan.description}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Loan Amount</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{loan.amount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Interest Rate</span>
                              <span className="font-semibold text-green-600">{loan.interest}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Tenure</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{loan.tenure}</span>
                            </div>
                          </div>
                          <Button className="w-full">
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Lending Tab */}
          {activeTab === 'lending' && (
            <div className="space-y-6">
              {/* My Lending Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle>My Lending Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myLending.map(lending => (
                      <div key={lending.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {lending.borrower}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {lending.interest}% APR • Disbursed: {lending.disbursed}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
                            {lending.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lent Amount</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">${lending.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Returns Earned</p>
                            <p className="text-lg font-semibold text-green-600">+${lending.totalReturns}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Payment</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">${lending.nextPayment}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Due Date</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              {new Date(lending.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Lending Opportunities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lending Opportunities</h2>
                <div className="space-y-4">
                  {lendingOpportunities.map(opp => (
                    <Card key={opp.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {opp.borrower}
                              </h3>
                              {opp.verified && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {opp.purpose}
                            </p>
                            <p className="text-sm text-gray-500">
                              📍 {opp.location}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            opp.riskLevel === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {opp.riskLevel} risk
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount Needed</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">${opp.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Interest Rate</p>
                            <p className="text-lg font-semibold text-green-600">{opp.interest}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tenure</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{opp.tenure}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expected Returns</p>
                            <p className="text-lg font-semibold text-green-600">+${opp.returns}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button>Lend Now</Button>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
