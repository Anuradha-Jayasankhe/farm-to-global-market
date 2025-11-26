'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  ShoppingCart, 
  TrendingUp, 
  Globe, 
  Package, 
  Tractor, 
  Bug, 
  Users 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'AI Farm Consultation',
    description: 'Get AI-powered crop recommendations, soil analysis, and step-by-step growing guides with profit predictions.',
    color: 'from-green-400 to-emerald-600',
    delay: 0.1,
  },
  {
    icon: ShoppingCart,
    title: 'Local Marketplace',
    description: 'Sell fresh produce directly to local buyers, hotels, and supermarkets with real-time pricing.',
    color: 'from-blue-400 to-cyan-600',
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    title: 'AI Value Booster',
    description: 'Convert raw crops into high-value export products like dehydrated goods, powders, and packaged items.',
    color: 'from-yellow-400 to-orange-600',
    highlight: true,
    delay: 0.3,
  },
  {
    icon: Globe,
    title: 'Global Selling Hub',
    description: 'Access international buyers and export markets with compliance support and shipping solutions.',
    color: 'from-purple-400 to-pink-600',
    delay: 0.4,
  },
  {
    icon: Package,
    title: 'AI Packaging Generator',
    description: 'Automatically create professional branding, labels, and export-compliant packaging designs.',
    color: 'from-indigo-400 to-blue-600',
    delay: 0.5,
  },
  {
    icon: Tractor,
    title: 'Accessories Marketplace',
    description: 'Buy and sell farming tools, tractors, seeds, and fertilizers in one convenient platform.',
    color: 'from-green-400 to-teal-600',
    delay: 0.6,
  },
  {
    icon: Bug,
    title: 'AI Pest Detection',
    description: 'Upload plant photos for instant disease identification and treatment recommendations.',
    color: 'from-red-400 to-rose-600',
    delay: 0.7,
  },
  {
    icon: Users,
    title: 'Smart Community',
    description: 'Connect with farmers worldwide, share knowledge, and get advice from AI and experts.',
    color: 'from-cyan-400 to-blue-600',
    delay: 0.8,
  },
];

export default function FeaturesShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            8 Powerful Features
            <span className="block mt-2 bg-gradient-farm bg-clip-text text-transparent">
              One Complete Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6">
            Everything you need to transform your farm into a profitable global business
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <Card className={`
                h-full hover-lift transition-all duration-300 border-2 hover:shadow-2xl
                ${feature.highlight ? 'border-yellow-400 dark:border-yellow-500 relative' : 'border-gray-200 dark:border-gray-700'}
              `}>
                {feature.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-accent text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ CORE FEATURE
                    </span>
                  </div>
                )}
                
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} 
                    flex items-center justify-center mb-4 shadow-lg
                  `}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-green-200 dark:border-gray-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Transform Your Farm?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Join thousands of farmers already increasing their income by 3-5x
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-3 bg-gradient-primary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Your Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
