'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Package, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Package },
  ];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="text-center">
                <CardContent className="p-12">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Order Placed Successfully!
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Order #F2G-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    We've sent a confirmation email with order details.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/dashboard">
                      <Button className="bg-gradient-primary text-white">
                        View Orders
                      </Button>
                    </Link>
                    <Link href="/marketplace">
                      <Button variant="outline">Continue Shopping</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        currentStep >= step.number
                          ? 'bg-gradient-primary text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        currentStep >= step.number
                          ? 'text-primary'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-4 rounded ${
                        currentStep > step.number
                          ? 'bg-gradient-primary'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            First Name
                          </label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Last Name
                          </label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address Line 1
                        </label>
                        <Input placeholder="123 Farm Road" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Address Line 2
                        </label>
                        <Input placeholder="Apartment, suite, etc. (optional)" />
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            City
                          </label>
                          <Input placeholder="City" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            State
                          </label>
                          <Input placeholder="State" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ZIP Code
                          </label>
                          <Input placeholder="12345" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <Input placeholder="+1 (555) 000-0000" />
                      </div>

                      <Button
                        onClick={() => setCurrentStep(2)}
                        className="w-full bg-gradient-primary text-white"
                      >
                        Continue to Payment
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV
                          </label>
                          <Input placeholder="123" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <Input placeholder="John Doe" />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setCurrentStep(1)}
                          variant="outline"
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(3)}
                          className="flex-1 bg-gradient-primary text-white"
                        >
                          Review Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        John Doe
                        <br />
                        123 Farm Road
                        <br />
                        City, State 12345
                        <br />
                        +1 (555) 000-0000
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">
                        •••• •••• •••• 3456
                      </p>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-gradient-primary text-white"
                    >
                      Place Order
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center shrink-0">
                        <span className="text-2xl">🥭</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          Organic Mango Dried Slices
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: 2
                        </p>
                        <p className="text-sm font-medium text-primary">$31.98</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Subtotal</span>
                      <span>$31.98</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Shipping</span>
                      <span>$5.99</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Tax</span>
                      <span>$3.04</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>$41.01</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
