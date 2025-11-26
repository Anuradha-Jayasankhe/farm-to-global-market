'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Download,
  RefreshCw,
  Palette,
  Type,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const brandStyles = [
  { id: 'modern', name: 'Modern Minimalist', colors: ['#2D5016', '#F4E4C1'] },
  { id: 'traditional', name: 'Traditional', colors: ['#8B4513', '#FFE4B5'] },
  { id: 'premium', name: 'Premium Gold', colors: ['#000000', '#FFD700'] },
  { id: 'organic', name: 'Organic Natural', colors: ['#4A7C59', '#F5F5DC'] },
];

export default function PackagingGeneratorPage() {
  const [step, setStep] = useState<'input' | 'generating' | 'preview'>('input');
  const [productName, setProductName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');

  const handleGenerate = () => {
    if (!productName) return;
    
    setStep('generating');
    setTimeout(() => {
      setStep('preview');
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
              <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                AI Packaging Generator
              </h1>
              <p className="text-xl text-white/90">
                Create professional product packaging in seconds with AI
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {step === 'input' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Product Name
                      </label>
                      <Input
                        placeholder="e.g., Organic Mango Chips"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Product Type
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
                        <option>Dried Fruits</option>
                        <option>Powders</option>
                        <option>Oils</option>
                        <option>Snacks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Brand Style
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {brandStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              selectedStyle === style.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex gap-2 mb-2">
                              {style.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-8 h-8 rounded"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <div className="font-medium text-sm">{style.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Information (Optional)
                      </label>
                      <Input placeholder="Tagline, certifications, etc." />
                    </div>

                    <Button
                      onClick={handleGenerate}
                      className="w-full bg-gradient-primary text-white hover:opacity-90"
                      disabled={!productName}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Packaging Design
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Preview Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Preview Area
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your generated design will appear here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}

          {step === 'generating' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Generating Your Design...
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI is creating a professional packaging design for you
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Design Preview */}
                <Card>
                  <CardContent className="p-8">
                    <div className="aspect-square bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-8 flex flex-col items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🥭</div>
                        <h2 className="text-3xl font-bold mb-2">{productName}</h2>
                        <p className="text-lg mb-6">100% Natural & Organic</p>
                        <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                          <p className="text-sm">Premium Quality</p>
                          <p className="text-sm">Farm Fresh</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Design Details */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Design Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Color Palette
                        </h4>
                        <div className="flex gap-2">
                          <div className="w-12 h-12 rounded bg-green-600" />
                          <div className="w-12 h-12 rounded bg-green-800" />
                          <div className="w-12 h-12 rounded bg-white border border-gray-300" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Typography
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Primary: Montserrat Bold
                          <br />
                          Secondary: Open Sans Regular
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Certifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm rounded-full">
                            Organic
                          </span>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-sm rounded-full">
                            FDA Approved
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleGenerate}
                      variant="outline"
                      className="flex-1"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button className="flex-1 bg-gradient-primary text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Alternative Variations */}
              <Card>
                <CardHeader>
                  <CardTitle>Alternative Designs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <button
                        key={i}
                        className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-lg hover:ring-2 ring-primary transition-all"
                      >
                        <div className="p-4 text-center">
                          <div className="text-4xl mb-2">🥭</div>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            Variation {i}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Features */}
          {step === 'input' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                What You Get
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Custom Branding
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI-generated designs tailored to your product and style
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Type className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Professional Typography
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Carefully selected fonts that match your brand identity
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Print-Ready Files
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      High-resolution files ready for production
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
