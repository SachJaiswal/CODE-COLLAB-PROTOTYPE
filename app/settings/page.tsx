"use client"

import { useState } from "react"
import {
  Network,
  Code,
  Users,
  MessageSquare,
  SettingsIcon,
  LogOut,
  User,
  Bell,
  Shield,
  Monitor,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white hidden md:block">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center space-x-2 mb-8">
              <Network className="h-6 w-6 text-ocean-600" />
              <span className="font-bold text-xl text-black">CodeCollab</span>
            </div>

            <nav className="space-y-1 flex-1">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-black hover:bg-gray-100 hover:text-black"
              >
                <Code className="h-5 w-5" />
                <span>Projects</span>
              </Link>
              <Link
                href="/teams"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-black hover:bg-gray-100 hover:text-black"
              >
                <Users className="h-5 w-5" />
                <span>Teams</span>
              </Link>
              <Link
                href="/messages"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-black hover:bg-gray-100 hover:text-black"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-ocean-50 text-ocean-600"
              >
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-ocean-100 text-ocean-600">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">User Name</p>
                  <p className="text-xs text-black truncate">user@example.com</p>
                </div>
                <button onClick={() => router.push("/")} className="text-black hover:text-gray-700">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-black">Settings</h1>
              <p className="text-black">Manage your account and preferences</p>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="bg-white border border-gray-200 p-1">
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:bg-ocean-50 data-[state=active]:text-ocean-600 text-black"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="data-[state=active]:bg-ocean-50 data-[state=active]:text-ocean-600 text-black"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-ocean-50 data-[state=active]:text-ocean-600 text-black"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-ocean-50 data-[state=active]:text-ocean-600 text-black"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                <Card className="bg-white border-gray-200 min-h-[800px]">
                  <CardHeader className="p-8">
                    <CardTitle className="text-black text-2xl">Profile Information</CardTitle>
                    <CardDescription className="text-black text-lg">Update your account information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-ocean-100 text-ocean-600 text-2xl">U</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button className="bg-ocean-600 hover:bg-ocean-700 mb-2">Upload Photo</Button>
                        <p className="text-sm text-black">JPG, GIF or PNG. Max size of 2MB.</p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          name="role"
                          className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                          placeholder="Enter your role"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button className="bg-ocean-600 hover:bg-ocean-700">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-white border-gray-200 min-h-[800px]">
                  <CardHeader className="p-8">
                    <CardTitle className="text-black text-2xl">Appearance</CardTitle>
                    <CardDescription className="text-black text-lg">Customize how CodeCollab looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="theme" className="text-black">Theme</Label>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" className="border-gray-200 bg-gray-50">
                            <Moon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="border-gray-200">
                            <Sun className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-black">Choose between dark and light theme</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="font-size" className="text-black">Font Size</Label>
                          <p className="text-sm text-black">Adjust the font size for the editor</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="border-gray-200 h-8">
                            -
                          </Button>
                          <span className="w-8 text-center text-black">14</span>
                          <Button variant="outline" size="sm" className="border-gray-200 h-8">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-black">Code Minimap</Label>
                          <p className="text-sm text-black">Show a minimap of your code</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-black">Line Numbers</Label>
                          <p className="text-sm text-black">Show line numbers in the editor</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-white border-gray-200 min-h-[800px]">
                  <CardHeader className="p-8">
                    <CardTitle className="text-black text-2xl">Notification Settings</CardTitle>
                    <CardDescription className="text-black text-lg">Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-black">Email Notifications</p>
                          <p className="text-sm text-black">Receive notifications via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-black">Project Updates</p>
                          <p className="text-sm text-black">Get notified about changes to your projects</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-black">Team Invitations</p>
                          <p className="text-sm text-black">Get notified about new team invitations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-black">Marketing Emails</p>
                          <p className="text-sm text-black">Receive emails about new features and updates</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card className="bg-white border-gray-200 min-h-[800px]">
                  <CardHeader className="p-8">
                    <CardTitle className="text-black text-2xl">Security Settings</CardTitle>
                    <CardDescription className="text-black text-lg">Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2 text-black">Change Password</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password" className="text-black">Current Password</Label>
                            <Input
                              id="current-password"
                              name="current-password"
                              type="password"
                              className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                              placeholder="Enter your current password"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-black">New Password</Label>
                            <Input
                              id="new-password"
                              name="new-password"
                              type="password"
                              className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                              placeholder="Enter your new password"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-black">Confirm New Password</Label>
                            <Input
                              id="confirm-password"
                              name="confirm-password"
                              type="password"
                              className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-ocean-600 sm:text-sm sm:leading-6"
                              placeholder="Confirm your new password"
                            />
                          </div>
                          <Button className="bg-ocean-600 hover:bg-ocean-700">Update Password</Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-medium mb-2 text-black">Two-Factor Authentication</h3>
                        <p className="text-sm text-black mb-4">Add an extra layer of security to your account</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-black">Enable 2FA</p>
                            <p className="text-sm text-black">Secure your account with two-factor authentication</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

