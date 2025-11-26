'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Upload,
  Package,
  DollarSign,
  Info,
  ImagePlus,
  CheckCircle,
  Wrench,
  Box,
} from 'lucide-react';

export default function SellAccessoriesPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subCategory: '',
    description: '',
    price: '',
    discountPrice: '',
    unit: 'piece',
    stock: '',
    brand: '',
    warranty: '',
    specifications: '',
    images: [] as File[],
  });

  const categories = {
    'Tools': ['Hand Tools', 'Power Tools', 'Gardening Tools', 'Pruning Tools', 'Harvesting Tools'],
    'Irrigation': ['Drip Systems', 'Sprinklers', 'Pipes & Fittings', 'Water Pumps', 'Hose Pipes'],
    'Fertilizers': ['Organic Fertilizers', 'Chemical Fertilizers', 'Bio-Fertilizers', 'Liquid Fertilizers'],
    'Pesticides': ['Insecticides', 'Fungicides', 'Herbicides', 'Organic Pesticides'],
    'Seeds': ['Vegetable Seeds', 'Fruit Seeds', 'Grain Seeds', 'Flower Seeds', 'Hybrid Seeds'],
    'Equipment': ['Tillers', 'Ploughs', 'Cultivators', 'Sprayers', 'Harvesters'],
    'Storage': ['Storage Bins', 'Warehousing', 'Cold Storage Units', 'Packaging Materials'],
    'Safety': ['Gloves', 'Masks', 'Protective Clothing', 'First Aid Kits'],
  };

  const units = ['piece', 'kg', 'litre', 'pack', 'set', 'bag', 'box'];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesArray].slice(0, 5),
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images') {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append images
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await fetch('http://localhost:5000/api/accessories', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create accessory');
      }

      setShowSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/accessories-seller');
      }, 2000);
    } catch (error) {
      console.error('Error creating accessory:', error);
      alert('Failed to create accessory. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-8">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Product Listed Successfully! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your accessory is now live in the marketplace. Farmers can start purchasing!
            </p>
            <Button
              onClick={() => router.push('/dashboard/accessories-seller')}
              className="bg-gradient-primary text-white"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/accessories-seller">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🛠️ List Farming Accessory
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add your farming accessories, tools, equipment, and supplies
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Heavy Duty Garden Rake"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Select category</option>
                      {Object.keys(categories).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sub-Category *
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                      disabled={!formData.category}
                    >
                      <option value="">Select sub-category</option>
                      {formData.category &&
                        categories[formData.category as keyof typeof categories]?.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Brand
                    </label>
                    <Input
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g., Mahindra, Honda"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Warranty Period
                    </label>
                    <Input
                      name="warranty"
                      value={formData.warranty}
                      onChange={handleInputChange}
                      placeholder="e.g., 1 year, 6 months"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the product features, benefits, usage instructions..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technical Specifications
                  </label>
                  <Textarea
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    placeholder="Size, weight, material, power rating, etc. (one per line)"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter each specification on a new line
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Stock */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Pricing & Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Original Price (₹) *
                    </label>
                    <Input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="1000"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Discount Price (₹)
                    </label>
                    <Input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      placeholder="850"
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Leave empty if no discount
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Unit *
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock Quantity *
                  </label>
                  <Input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="100"
                    min="0"
                    required
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Number of units available for sale
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex gap-2">
                    <Info className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Pricing Preview
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        {formData.price && formData.unit ? (
                          <>
                            Listed at <strong>₹{formData.price}</strong> per {formData.unit}
                            {formData.discountPrice && (
                              <>
                                {' '}→ <strong className="text-green-600">₹{formData.discountPrice}</strong>{' '}
                                (
                                {Math.round(
                                  ((parseFloat(formData.price) - parseFloat(formData.discountPrice)) /
                                    parseFloat(formData.price)) *
                                    100
                                )}
                                % off)
                              </>
                            )}
                          </>
                        ) : (
                          'Enter price and unit to see preview'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-purple-600" />
                  Product Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Images (Max 5) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Drag and drop images or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                      High-quality images increase sales! Show product from different angles
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" className="cursor-pointer" asChild>
                        <span>Choose Files</span>
                      </Button>
                    </label>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-primary text-white"
              >
                {isSubmitting ? 'Listing Product...' : 'List Product'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
