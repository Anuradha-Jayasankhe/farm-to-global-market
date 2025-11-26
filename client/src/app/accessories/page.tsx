'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Search, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const accessories = [
  {
    id: '1',
    name: 'Professional Irrigation System',
    category: 'Tools',
    price: 299.99,
    condition: 'New',
    seller: 'AgriTech Solutions',
    rating: 4.8,
    reviews: 124,
    image: '💧',
  },
  {
    id: '2',
    name: 'Solar-Powered Water Pump',
    category: 'Equipment',
    price: 450.00,
    condition: 'New',
    seller: 'EcoFarm Supplies',
    rating: 4.9,
    reviews: 89,
    image: '☀️',
  },
  {
    id: '3',
    name: 'Organic Fertilizer Spreader',
    category: 'Tools',
    price: 180.00,
    condition: 'Used',
    seller: 'Green Farming Co.',
    rating: 4.6,
    reviews: 45,
    image: '🌱',
  },
  {
    id: '4',
    name: 'Premium Quality Seeds Pack',
    category: 'Seeds',
    price: 29.99,
    condition: 'New',
    seller: 'Seeds International',
    rating: 4.7,
    reviews: 234,
    image: '🌾',
  },
  {
    id: '5',
    name: 'Compact Farm Tractor',
    category: 'Tractors',
    price: 12500.00,
    condition: 'Used',
    seller: 'Farm Equipment Ltd.',
    rating: 4.5,
    reviews: 12,
    image: '🚜',
  },
  {
    id: '6',
    name: 'Smart Soil pH Meter',
    category: 'Tools',
    price: 89.99,
    condition: 'New',
    seller: 'TechFarm Devices',
    rating: 4.9,
    reviews: 156,
    image: '📊',
  },
];

const categories = ['All', 'Tools', 'Equipment', 'Seeds', 'Tractors', 'Other'];
const conditions = ['All', 'New', 'Used'];

export default function AccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');

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
              <Wrench className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Farming Accessories
              </h1>
              <p className="text-xl text-white/90">
                Tools, equipment, seeds, and tractors for modern farming
              </p>
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
                    placeholder="Search accessories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                >
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift">
                  <CardContent className="p-6">
                    {/* Product Image */}
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-6xl">{item.image}</span>
                    </div>

                    {/* Condition Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.condition === 'New'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}
                      >
                        {item.condition}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>

                    {/* Seller */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {item.seller}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({item.reviews} reviews)
                      </span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>
                      <Button className="bg-gradient-primary text-white hover:opacity-90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
