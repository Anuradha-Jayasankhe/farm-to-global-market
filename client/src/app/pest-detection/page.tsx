'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Upload,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface DetectionResult {
  pest: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  treatment: string[];
  preventiveMeasures: string[];
}

export default function PestDetectionPage() {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageUpload = () => {
    setStep('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        pest: 'Banana Weevil (Cosmopolites sordidus)',
        confidence: 94.5,
        severity: 'High',
        description: 'Adult banana weevil detected on leaf. This is a major pest that can cause significant damage to banana plants by boring into the pseudostem and rhizome.',
        treatment: [
          'Apply neem-based pesticide immediately',
          'Remove and destroy infested plant parts',
          'Use pheromone traps around affected areas',
          'Apply beneficial nematodes to soil',
        ],
        preventiveMeasures: [
          'Regular monitoring and early detection',
          'Clean farming practices',
          'Use healthy planting material',
          'Maintain proper plant spacing',
          'Remove dead plant material promptly',
        ],
      });
      setStep('results');
    }, 2000);
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
                AI Pest Detection
              </h1>
              <p className="text-xl text-white/90">
                Instant pest identification and treatment recommendations
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {step === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-12">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Camera className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Upload Crop Image
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Take a clear photo of the affected plant part for instant AI analysis
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                      <Button
                        onClick={handleImageUpload}
                        className="h-24 bg-gradient-primary text-white hover:opacity-90"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Camera className="w-8 h-8" />
                          <span>Take Photo</span>
                        </div>
                      </Button>
                      <Button
                        onClick={handleImageUpload}
                        variant="outline"
                        className="h-24"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8" />
                          <span>Upload Image</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Photography Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Ensure good lighting - natural daylight works best</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Focus on the affected area - get close-up shots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Include surrounding healthy tissue for comparison</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Take multiple angles if possible</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Camera className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Analyzing Image...
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI is identifying pests and diseases
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'results' && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Detection Result */}
              <Card className="border-2 border-primary">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {result.pest}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Confidence: {result.confidence}%
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.severity === 'High'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : result.severity === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}
                        >
                          {result.severity} Severity
                        </span>
                      </div>
                    </div>
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {result.description}
                  </p>
                </CardContent>
              </Card>

              {/* Treatment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Recommended Treatment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {result.treatment.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="w-6 h-6 bg-gradient-primary text-white rounded-full flex items-center justify-center shrink-0 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <Button className="w-full mt-6 bg-gradient-primary text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Nearby Agricultural Stores
                  </Button>
                </CardContent>
              </Card>

              {/* Prevention */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Preventive Measures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.preventiveMeasures.map((measure, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{measure}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setStep('upload');
                    setResult(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Scan Another Image
                </Button>
                <Button className="flex-1 bg-gradient-primary text-white">
                  Save to My Records
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
