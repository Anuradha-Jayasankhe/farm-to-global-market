'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'List up to 5 products',
      'Basic marketplace access',
      'Community forums',
      'Mobile app access',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Basic',
    price: 15,
    period: 'month',
    description: 'For growing farms',
    features: [
      'List up to 50 products',
      'AI crop recommendations',
      'Pest detection (10/month)',
      'Local marketplace priority',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: 49,
    period: 'month',
    description: 'Most popular for serious farmers',
    features: [
      'Unlimited products',
      'AI Value Booster access',
      'Unlimited pest detection',
      'Global marketplace access',
      'AI packaging generator',
      'Processing partner network',
      'Advanced analytics',
      'Dedicated support',
      'Export compliance help',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Premium',
    price: 149,
    period: 'month',
    description: 'For large-scale operations',
    features: [
      'Everything in Pro',
      'White-label branding',
      'API access',
      'Custom integrations',
      'Bulk processing discounts',
      'Account manager',
      'Training & onboarding',
      'Priority processing',
      'Custom export solutions',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Choose the plan that fits your farm
            </motion.p>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4"
            >
              <span className={`text-lg ${!isAnnual ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    isAnnual ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isAnnual ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500'}`}>
                Annual
                <span className="ml-2 text-sm text-green-600 dark:text-green-400">(Save 20%)</span>
              </span>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${
                    plan.popular 
                      ? 'border-green-600 border-2 shadow-2xl scale-105' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">
                          ${isAnnual ? Math.round(plan.price * 12 * 0.8) : plan.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{isAnnual ? 'year' : plan.period}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href={plan.name === 'Premium' ? '/contact' : '/register'}>
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? 'bg-gradient-primary hover:opacity-90 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Can I change plans later?',
                  a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and local payment methods in your country.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! Basic, Pro, and Premium plans come with a 14-day free trial. No credit card required.',
                },
                {
                  q: 'What happens if I exceed my product limit?',
                  a: 'We\'ll notify you and give you the option to upgrade or remove products to stay within your limit.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
