'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState<'farmer' | 'buyer' | 'local_buyer' | 'global_buyer' | 'processor' | 'processing_partner' | 'ai_consultant' | 'logistics_partner' | 'accessories_seller' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register({
        ...formData,
        role: userRole,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-farm bg-clip-text text-transparent">
                Farm2Global
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of farmers growing their income
          </p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { role: 'farmer', icon: '🌾', title: 'Farmer', desc: 'Grow and sell your produce' },
                { role: 'local_buyer', icon: '🛒', title: 'Local Buyer', desc: 'Buy fresh farm products locally' },
                { role: 'global_buyer', icon: '🌍', title: 'Global Buyer', desc: 'Import products internationally' },
              ].map((option) => (
                <Card
                  key={option.role}
                  className={`cursor-pointer hover-lift transition-all ${
                    userRole === option.role ? 'border-green-600 border-2' : ''
                  }`}
                  onClick={() => setUserRole(option.role as any)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{option.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { role: 'processing_partner', icon: '🏭', title: 'Processing Partner', desc: 'Process and package farm products' },
                { role: 'accessories_seller', icon: '🛠️', title: 'Accessories Seller', desc: 'Sell farming tools & equipment' },
                { role: 'logistics_partner', icon: '🚚', title: 'Logistics Partner', desc: 'Provide delivery services' },
              ].map((option) => (
                <Card
                  key={option.role}
                  className={`cursor-pointer hover-lift transition-all ${
                    userRole === option.role ? 'border-green-600 border-2' : ''
                  }`}
                  onClick={() => setUserRole(option.role as any)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{option.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { role: 'ai_consultant', icon: '🤖', title: 'AI Consultant', desc: 'Provide farming advice & insights' },
              ].map((option) => (
                <Card
                  key={option.role}
                  className={`cursor-pointer hover-lift transition-all ${
                    userRole === option.role ? 'border-green-600 border-2' : ''
                  }`}
                  onClick={() => setUserRole(option.role as any)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{option.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{option.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                onClick={() => setStep(2)}
                disabled={!userRole}
                className="bg-gradient-primary hover:opacity-90 text-white px-12 py-6 text-lg"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="John Farmer" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="email" placeholder="john@farmer.com" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="tel" placeholder="+1 (555) 000-0000" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="City, State" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="password" placeholder="••••••••" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input type="password" placeholder="••••••••" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  {userRole === 'farmer' && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold mb-4">Farm Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Farm Size (acres)</label>
                          <Input type="number" placeholder="10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Farming Type</label>
                          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                            <option>Organic</option>
                            <option>Conventional</option>
                            <option>Mixed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="rounded" />
                    <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                      I agree to the{' '}
                      <Link href="/terms" className="text-green-600 hover:text-green-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-green-600 hover:text-green-700">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-primary hover:opacity-90 text-white py-6"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
