'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, User, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCommunityPosts } from '@/hooks/useCommunity';
import { useAuth } from '@/context/AuthContext';

export default function CommunityPage() {
  const [newPost, setNewPost] = useState('');
  const { posts, loading, error } = useCommunityPosts();
  const { user, isAuthenticated } = useAuth();

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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Farming Community
              </h1>
              <p className="text-xl text-white/90">
                Connect, share, and learn from farmers worldwide
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Create Post */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">✍️</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your farming experience..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                    </div>
                    <Button className="bg-gradient-primary hover:opacity-90 text-white">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      {/* Author */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shrink-0">
                          {post.author.avatar ? (
                            <img src={post.author.avatar} alt={post.author.firstName} className="w-full h-full rounded-full" />
                          ) : (
                            <span className="text-2xl">👤</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {post.author.firstName} {post.author.lastName}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()} • {post.views} views
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        {post.title && <h4 className="font-semibold text-lg mb-2">{post.title}</h4>}
                        <p className="text-gray-700 dark:text-gray-300">
                          {post.content}
                        </p>
                        {post.images && post.images.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            {post.images.map((img, idx) => (
                              <img key={idx} src={img} alt="" className="rounded-lg w-full h-48 object-cover" />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                          <MessageSquare className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.comments.length}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
