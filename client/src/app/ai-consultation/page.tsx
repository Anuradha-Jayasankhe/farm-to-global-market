'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, MapPin, Droplets, Sun, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const mockRecommendations = [
  {
    cropName: 'Organic Tomatoes',
    suitabilityScore: 95,
    estimatedYield: '25 tons/hectare',
    estimatedProfit: '$15,000',
    growingDuration: '90-120 days',
    waterRequirement: 'Medium',
    bestPlantingMonth: ['March', 'April', 'September'],
    marketDemand: 'Very High',
  },
  {
    cropName: 'Sweet Corn',
    suitabilityScore: 88,
    estimatedYield: '8 tons/hectare',
    estimatedProfit: '$8,500',
    growingDuration: '75-90 days',
    waterRequirement: 'High',
    bestPlantingMonth: ['April', 'May'],
    marketDemand: 'High',
  },
  {
    cropName: 'Green Beans',
    suitabilityScore: 82,
    estimatedYield: '12 tons/hectare',
    estimatedProfit: '$10,000',
    growingDuration: '50-60 days',
    waterRequirement: 'Medium',
    bestPlantingMonth: ['March', 'April', 'August'],
    marketDemand: 'High',
  },
];

export default function AICropPlannerPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                AI Crop Planner
              </h1>
              <p className="text-xl text-white/90">
                Get personalized crop recommendations powered by AI
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
                  <CardTitle>Tell Us About Your Farm</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload details and let AI recommend the best crops for maximum profit
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Land Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Land Photo</label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Upload photo of your land
                      </p>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Land Size (acres)</label>
                      <Input type="number" placeholder="5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Soil Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <option>Clay</option>
                        <option>Sandy</option>
                        <option>Loamy</option>
                        <option>Silty</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location
                      </label>
                      <Input placeholder="City, State" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Droplets className="w-4 h-4 inline mr-1" />
                        Water Availability
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <option>Abundant</option>
                        <option>Moderate</option>
                        <option>Limited</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Farming Type</label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                        <option>Organic</option>
                        <option>Conventional</option>
                        <option>Mixed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget (Optional)</label>
                      <Input type="number" placeholder="$5,000" />
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        AI is analyzing your farm...
                      </>
                    ) : (
                      'Get AI Recommendations'
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
                  Your Personalized Crop Recommendations
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on AI analysis of your farm conditions
                </p>
              </div>

              {mockRecommendations.map((crop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {crop.cropName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Market Demand: <span className="font-semibold text-green-600">{crop.marketDemand}</span>
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{crop.suitabilityScore}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Suitability Score</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Est. Yield</p>
                          <p className="font-bold text-gray-900 dark:text-white">{crop.estimatedYield}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Est. Profit</p>
                          <p className="font-bold text-green-600">{crop.estimatedProfit}</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                          <p className="font-bold text-gray-900 dark:text-white">{crop.growingDuration}</p>
                        </div>
                        <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Water Need</p>
                          <p className="font-bold text-gray-900 dark:text-white">{crop.waterRequirement}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Best Planting Months:
                        </p>
                        <div className="flex gap-2">
                          {crop.bestPlantingMonth.map(month => (
                            <span key={month} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                              {month}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-primary hover:opacity-90 text-white">
                          View Full Guide
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Compare with Others
                        </Button>
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
                  Analyze Different Farm
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
