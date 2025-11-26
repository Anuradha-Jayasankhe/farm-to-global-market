'use client';

import Link from 'next/link';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Join 10,000+ Farmers Growing Their Income
          </h3>
          <p className="text-gray-400 mb-6">
            Get weekly tips, market insights, and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button className="bg-gradient-primary hover:opacity-90 text-white whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-green-400 transition-colors">Features</Link></li>
              <li><Link href="/how-it-works" className="hover:text-green-400 transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link></li>
              <li><Link href="/marketplace" className="hover:text-green-400 transition-colors">Marketplace</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link></li>
              <li><Link href="/guides" className="hover:text-green-400 transition-colors">Guides</Link></li>
              <li><Link href="/community" className="hover:text-green-400 transition-colors">Community</Link></li>
              <li><Link href="/support" className="hover:text-green-400 transition-colors">Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-green-400 transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-green-400 transition-colors">Press</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-green-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Farm2Global</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © 2025 Farm2Global. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
