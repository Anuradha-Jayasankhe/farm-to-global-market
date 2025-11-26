'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const steps = [
  {
    number: '01',
    title: 'Sign Up & Set Up Profile',
    description: 'Create your account and tell us about your farm. Upload photos, soil details, and location.',
    features: ['Quick 5-minute setup', 'Secure verification', 'Free to start'],
  },
  {
    number: '02',
    title: 'Get AI Recommendations',
    description: 'Our AI analyzes your farm and suggests the most profitable crops and farming strategies.',
    features: ['Crop profitability analysis', 'Growing guides', 'Market demand insights'],
  },
  {
    number: '03',
    title: 'Grow & Harvest',
    description: 'Follow AI-guided farming plans with real-time support for pest detection and crop management.',
    features: ['Step-by-step guidance', 'Pest monitoring', 'Weather alerts'],
  },
  {
    number: '04',
    title: 'Convert to High-Value Products',
    description: 'Use our AI Value Booster to transform raw crops into export-ready premium products.',
    features: ['5x profit increase', 'Local processing partners', 'Quality assurance'],
  },
  {
    number: '05',
    title: 'Sell Globally',
    description: 'List your products on our global marketplace and connect with international buyers.',
    features: ['50+ countries access', 'Compliance support', 'Secure payments'],
  },
];

export default function HowItWorksPage() {
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
              How It Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              From farm to global market in 5 simple steps
            </motion.p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-16 relative"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Number */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-24 w-0.5 h-16 bg-gradient-to-b from-green-600 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-farm py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of farmers already growing their income
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-6 text-lg rounded-full">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
