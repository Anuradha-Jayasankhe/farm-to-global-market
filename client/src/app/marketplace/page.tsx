'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3x3, List, Package, Tractor, Globe, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/marketplace/ProductCard';
import { mockProducts, productCategories } from '@/data/products';
import { apiClient } from '@/lib/api-client';
import { Product } from '@/types';

type ProductTab = 'all' | 'farmed' | 'accessories' | 'export';

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<ProductTab>('all');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await apiClient.products.getAll({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          search: searchQuery || undefined,
        });
        
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          // Fallback to mock data if API fails
          setProducts(mockProducts);
        }
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Showing sample data.');
        // Use mock data as fallback
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);

  const tabs = [
    { id: 'all' as ProductTab, name: 'All Products', icon: Package },
    { id: 'farmed' as ProductTab, name: 'Farmed Products', icon: Tractor },
    { id: 'accessories' as ProductTab, name: 'Accessories', icon: Package },
    { id: 'export' as ProductTab, name: 'Export Quality', icon: Globe },
  ];

  const filteredProducts = products.filter(product => {
    // Filter by tab
    let matchesTab = true;
    if (activeTab === 'farmed') {
      matchesTab = ['vegetables', 'fruits', 'grains', 'dairy'].includes(product.category);
    } else if (activeTab === 'accessories') {
      matchesTab = product.category === 'accessories' || product.name.toLowerCase().includes('tool') || product.name.toLowerCase().includes('equipment');
    } else if (activeTab === 'export') {
      matchesTab = product.isExportQuality === true || product.name.toLowerCase().includes('premium') || product.name.toLowerCase().includes('organic');
    }
    
    return matchesTab;
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Banner */}
        <section className="bg-gradient-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Global Marketplace
              </h1>
              <p className="text-xl text-white/90">
                Fresh produce, quality accessories, and export-grade products
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-600 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {productCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Description */}
            <div className="mb-8">
              {activeTab === 'all' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    All Products
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Browse our complete collection of fresh produce, accessories, and export-quality products
                  </p>
                </div>
              )}
              {activeTab === 'farmed' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Farmed Products
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fresh fruits, vegetables, grains, dairy, and other farm-fresh produce directly from local farmers
                  </p>
                </div>
              )}
              {activeTab === 'accessories' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Farm Accessories & Equipment
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Essential farming tools, equipment, fertilizers, irrigation systems, and supplies for modern agriculture
                  </p>
                </div>
              )}
              {activeTab === 'export' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Export Quality Products
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Premium certified products meeting international standards, ready for global markets
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-400">{error}</p>
              </div>
            )}

            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} products
              </p>
              {loading && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading products...</span>
                </div>
              )}
            </div>

            {loading && products.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
                }>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </div>

                {filteredProducts.length === 0 && !loading && (
                  <div className="text-center py-20">
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                      No products found. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
