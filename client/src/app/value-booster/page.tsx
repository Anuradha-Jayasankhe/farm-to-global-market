'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const mockSuggestions = [
  {
    id: '1',
    name: 'Dehydrated Banana Chips',
    processingType: 'Dehydration',
    currentValue: 250,
    processedValue: 1200,
    profitIncrease: 380,
    processingTime: '3-5 days',
    targetMarkets: ['USA', 'Europe', 'Middle East'],
  },
  {
    id: '2',
    name: 'Banana Powder',
    processingType: 'Powdering',
    currentValue: 250,
    processedValue: 1500,
    profitIncrease: 500,
    processingTime: '5-7 days',
    targetMarkets: ['USA', 'Asia', 'Australia'],
  },
  {
    id: '3',
    name: 'Freeze-Dried Banana Slices',
    processingType: 'Freeze-Drying',
    currentValue: 250,
    processedValue: 2000,
    profitIncrease: 700,
    processingTime: '7-10 days',
    targetMarkets: ['USA', 'Europe', 'Japan'],
  },
];

export default function ValueBoosterPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    quality: 'standard',
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-accent py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                AI Value Booster
              </h1>
              <p className="text-xl text-white/90">
                Transform your crops into high-value export products
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Upload Crop Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Image Upload */}
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Click to upload crop photo or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Crop Name</label>
                      <Input
                        placeholder="e.g., Banana"
                        value={formData.cropName}
                        onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quantity (kg)</label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quality Grade</label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                        value={formData.quality}
                        onChange={(e) => setFormData({...formData, quality: e.target.value})}
                      >
                        <option value="premium">Premium</option>
                        <option value="standard">Standard</option>
                        <option value="basic">Basic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Target Market</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <option>International Export</option>
                        <option>Local Market</option>
                        <option>Both</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !formData.cropName || !formData.quantity}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      'Get Value Boost Suggestions'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  AI-Generated Product Suggestions
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on your {formData.quantity}kg of {formData.cropName}
                </p>
              </div>

              {mockSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {suggestion.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Processing Type: {suggestion.processingType}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Value</p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${suggestion.currentValue}
                              </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Processed Value</p>
                              <p className="text-2xl font-bold text-green-600">
                                ${suggestion.processedValue}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-lg font-semibold text-green-600">
                              +{suggestion.profitIncrease}% Profit Increase
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>⏱️ {suggestion.processingTime}</span>
                            <span>🌍 {suggestion.targetMarkets.join(', ')}</span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center gap-3">
                          <Button className="bg-gradient-primary hover:opacity-90 text-white">
                            Select This Option
                          </Button>
                          <Button variant="outline">
                            View Processing Partners
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="mt-4"
                >
                  Analyze Different Crop
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
