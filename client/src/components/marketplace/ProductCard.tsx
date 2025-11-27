'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, MapPin, Star, Badge as BadgeIcon, Globe, Package } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const getCategoryEmoji = (category: string) => {
  const emojiMap: Record<string, string> = {
    fruits: '🍎',
    vegetables: '🥬',
    grains: '🌾',
    spices: '🌶️',
    dehydrated: '🫐',
    dairy: '🥛',
    accessories: '🛠️',
    organic: '🌱',
  };
  return emojiMap[category] || '📦';
};

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, product.minOrder || 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  if (viewMode === 'list') {
    return (
      <Card className="hover-lift transition-all">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-48 h-48 shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center">
              <span className="text-6xl">{getCategoryEmoji(product.category)}</span>
            </div>
            {product.tags.includes('organic') && (
              <Badge className="absolute top-2 left-2 bg-green-600">Organic</Badge>
            )}
            {product.isExportQuality && (
              <Badge className="absolute top-2 right-2 bg-blue-600">
                <Globe className="w-3 h-3 mr-1" />
                Export Quality
              </Badge>
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link href={`/marketplace/${product.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{product.description}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(product.price, product.currency)}
                </p>
                <p className="text-sm text-gray-500">per {product.unit}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {product.seller.name}
                </span>
                <span>{product.quantity} {product.unit} available</span>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={added}
                className="bg-gradient-primary hover:opacity-90 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {added ? 'Added!' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="hover-lift transition-all h-full flex flex-col">
      <div className="relative w-full h-48">
        <div className="w-full h-full bg-gradient-to-br from-green-100 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-t-lg flex items-center justify-center">
          <span className="text-6xl">{getCategoryEmoji(product.category)}</span>
        </div>
        {product.tags.includes('organic') && (
          <Badge className="absolute top-2 right-2 bg-green-600">Organic</Badge>
        )}
        {product.isExportQuality && (
          <Badge className="absolute top-2 left-2 bg-blue-600 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Export
          </Badge>
        )}
        {product.category === 'accessories' && (
          <Badge className="absolute bottom-2 left-2 bg-purple-600 flex items-center gap-1">
            <Package className="w-3 h-3" />
            Accessory
          </Badge>
        )}
      </div>
      
      <CardContent className="flex-1 p-4">
        <Link href={`/marketplace/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-green-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{product.seller.name}</span>
          {product.seller.verified && (
            <BadgeIcon className="w-4 h-4 text-blue-600" />
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(product.price, product.currency)}
          </p>
          <p className="text-xs text-gray-500">per {product.unit}</p>
        </div>
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          disabled={added}
          className="bg-gradient-primary hover:opacity-90 text-white"
        >
          <ShoppingCart className="w-4 h-4" />
          {added && <span className="ml-1 text-xs">✓</span>}
        </Button>
      </CardFooter>
    </Card>
  );
}
