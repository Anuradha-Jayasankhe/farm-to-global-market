'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Search,
  Filter,
  TrendingUp,
  Award,
  Ship,
  BadgeCheck,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useProducts } from '@/hooks/useProducts';

const countries = ['All Countries', 'India', 'Thailand', 'Brazil', 'Mexico', 'Kenya'];
const categories = ['All Categories', 'crops', 'processed', 'accessories'];

export default function GlobalMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [page, setPage] = useState(1);

  const { products, loading, error, pagination } = useProducts({
    search: searchQuery || undefined,
    category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
    page,
    limit: 12,
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Globe className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Global Export Marketplace
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with international buyers and expand your market reach
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">150+</div>
                  <div className="text-white/80">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">5000+</div>
                  <div className="text-white/80">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">$50M+</div>
                  <div className="text-white/80">Monthly Trade</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search global products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">No products found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift">
                    <CardContent className="p-6">
                      {/* Product Image */}
                      <div className="w-full h-48 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {product.images?.[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-6xl">📦</span>
                        )}
                      </div>

                      {/* Country Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {product.location?.country || 'Unknown'}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                          <span>⭐</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h3>

                    {/* Seller */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {product.seller}
                    </p>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded-full flex items-center gap-1"
                        >
                          <BadgeCheck className="w-3 h-3" />
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Price and Order Info */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Price per {product.unit}
                        </span>
                        <span className="text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Min. Order
                        </span>
                        <span className="font-medium">
                          {product.minOrder} {product.unit}
                        </span>
                      </div>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <Ship className="w-4 h-4" />
                      <span>Ships to: {product.shipping}</span>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                      Request Quote
                    </Button>

                    {/* Orders Count */}
                    <p className="text-xs text-center text-gray-500 mt-2">
                      {product.orders} successful orders
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Export Your Products?
                </h2>
                <p className="mb-6 text-white/90">
                  Join thousands of farmers successfully exporting to global markets
                </p>
                <Button variant="secondary" size="lg">
                  Start Exporting Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
