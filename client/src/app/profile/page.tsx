'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Save,
  Award,
  Shield,
  Bell,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Farmer',
    email: 'john.farmer@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Karnataka, India',
    farmName: 'Green Valley Farm',
    farmSize: '50 acres',
    crops: 'Mango, Banana, Rice',
    bio: 'Organic farmer with 15 years of experience. Passionate about sustainable agriculture and quality produce.',
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-5xl">👨‍🌾</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Camera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {profile.name}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profile.location}
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? 'default' : 'outline'}
                      className={isEditing ? 'bg-gradient-primary text-white' : ''}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full text-sm font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Verified Farmer
                    </span>
                    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Premium Member
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="farm">Farm Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <Input
                        value={profile.name}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          value={profile.email}
                          disabled={!isEditing}
                          className="pl-10"
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          value={profile.phone}
                          disabled={!isEditing}
                          className="pl-10"
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          value={profile.location}
                          disabled={!isEditing}
                          className="pl-10"
                          onChange={(e) =>
                            setProfile({ ...profile, location: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Farm Details Tab */}
            <TabsContent value="farm">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Farm Name
                      </label>
                      <Input
                        value={profile.farmName}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, farmName: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Farm Size
                      </label>
                      <Input
                        value={profile.farmSize}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, farmSize: e.target.value })
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Primary Crops
                      </label>
                      <Input
                        value={profile.crops}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({ ...profile, crops: e.target.value })
                        }
                        placeholder="e.g., Mango, Banana, Rice"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-3xl font-bold text-primary mb-1">156</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Products Listed
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-3xl font-bold text-primary mb-1">4.8</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Avg. Rating
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-3xl font-bold text-primary mb-1">1.2k</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Sales
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      'Email notifications for new orders',
                      'SMS alerts for urgent updates',
                      'Weekly sales report',
                      'Marketing and promotional emails',
                      'Community activity updates',
                    ].map((setting, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {setting}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle>Account Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <Shield className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 dark:text-green-400 mb-1">
                        Email Verified
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-500">
                        Your email address has been verified
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Phone Verification
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Verify your phone number for added security
                        </p>
                      </div>
                      <Button variant="outline">Verify</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Farm Documents
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upload land ownership or lease documents
                        </p>
                      </div>
                      <Button className="bg-gradient-primary text-white">Upload</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          Organic Certification
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add your organic farming certifications
                        </p>
                      </div>
                      <Button variant="outline">Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
