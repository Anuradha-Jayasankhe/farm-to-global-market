'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: '1',
    name: 'Premium Organic Mango Dried Slices',
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviews: 234,
    seller: {
      name: 'John Farmer',
      rating: 4.9,
      location: 'Karnataka, India',
      verified: true,
    },
    description:
      'Our premium organic mango dried slices are made from the finest Alphonso mangoes, carefully selected and naturally sun-dried to preserve their rich flavor and nutritional value. No added sugars or preservatives.',
    features: [
      '100% Organic & Natural',
      'No Added Sugar or Preservatives',
      'Rich in Vitamins A & C',
      'Perfect for Snacking',
      'Sustainably Sourced',
      'Packed Fresh Daily',
    ],
    specifications: {
      Weight: '500g',
      'Shelf Life': '12 months',
      'Storage': 'Cool, dry place',
      'Country of Origin': 'India',
      Certification: 'USDA Organic, Fair Trade',
    },
    inStock: true,
    stockCount: 45,
  };

  const similarProducts = [
    { id: '2', name: 'Banana Chips', price: 8.99, image: '🍌' },
    { id: '3', name: 'Papaya Chunks', price: 12.99, image: '🥝' },
    { id: '4', name: 'Pineapple Rings', price: 14.99, image: '🍍' },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            {' / '}
            <Link href="/marketplace" className="hover:text-primary">
              Marketplace
            </Link>
            {' / '}
            <span className="text-gray-900 dark:text-white">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardContent className="p-8">
                  {/* Main Image */}
                  <div className="w-full aspect-square bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-9xl">🥭</span>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:ring-2 ring-primary transition-all ${
                          selectedImage === index ? 'ring-2' : ''
                        }`}
                      >
                        <span className="text-4xl">🥭</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-500 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-sm font-medium rounded-full">
                    20% OFF
                  </span>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <p className="text-green-600 dark:text-green-400 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      In Stock ({product.stockCount} available)
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400">Out of Stock</p>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total: ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <Button className="flex-1 bg-gradient-primary text-white hover:opacity-90 h-12">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Free Shipping
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Secure Payment
                    </p>
                  </div>
                  <div className="text-center">
                    <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Quality Assured
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <Tabs defaultValue="description">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="seller">Seller Info</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Product Features</h3>
                    <ul>
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="specifications">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"
                      >
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {key}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-xl">👤</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              Customer {review}
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-500 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Excellent quality! The mangoes are sweet and perfectly dried. Will
                          definitely order again.
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="seller">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shrink-0">
                      <span className="text-4xl">👨‍🌾</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {product.seller.name}
                        </h3>
                        {product.seller.verified && (
                          <span className="text-blue-600">✓ Verified</span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        📍 {product.seller.location}
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-medium">{product.seller.rating}</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            Seller Rating
                          </span>
                        </div>
                      </div>
                      <Link href={`/seller/${product.seller.name}`}>
                        <Button variant="outline">View All Products</Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Similar Products */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-5xl">{item.image}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-lg font-bold text-primary mb-3">
                        ${item.price}
                      </p>
                      <Button size="sm" className="w-full bg-gradient-primary text-white">
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
