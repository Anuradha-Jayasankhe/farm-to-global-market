'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (user) {
        // Route to appropriate dashboard based on user role
        switch (user.role) {
          case 'farmer':
            router.push('/dashboard/farmer');
            break;
          case 'local_buyer':
            router.push('/dashboard/local-buyer');
            break;
          case 'buyer':
            router.push('/dashboard/buyer');
            break;
          case 'global_buyer':
            router.push('/dashboard/global-buyer');
            break;
          case 'processing_partner':
            router.push('/dashboard/processing-partner');
            break;
          case 'processor':
            router.push('/dashboard/processor');
            break;
          case 'ai_consultant':
            router.push('/dashboard/ai-consultant');
            break;
          case 'logistics_partner':
            router.push('/dashboard/logistics-partner');
            break;
          case 'accessories_seller':
            router.push('/dashboard/accessories-seller');
            break;
          case 'admin':
            router.push('/dashboard/admin');
            break;
          default:
            // Default to farmer dashboard
            router.push('/dashboard/farmer');
        }
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
      </div>
    </div>
  );
}
