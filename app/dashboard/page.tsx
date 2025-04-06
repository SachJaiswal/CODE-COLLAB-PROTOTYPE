"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Network,
  Code,
  Users,
  MessageSquare,
  Settings,
  Plus,
  Search,
  LogOut,
  ChevronRight,
  Clock,
  Star,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { CopilotModal } from "@/components/copilot-modal"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("recent")
  const router = useRouter()
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const recentProjects = [
    {
      id: "project-1",
      name: "React Dashboard",
      language: "TypeScript",
      lastEdited: "2 hours ago",
      collaborators: 3,
    },
    {
      id: "project-2",
      name: "API Integration",
      language: "JavaScript",
      lastEdited: "Yesterday",
      collaborators: 2,
    },
    {
      id: "project-3",
      name: "Mobile App",
      language: "React Native",
      lastEdited: "3 days ago",
      collaborators: 5,
    },
    {
      id: "project-4",
      name: "Backend Service",
      language: "Node.js",
      lastEdited: "1 week ago",
      collaborators: 2,
    },
  ]

  const starredProjects = [
    {
      id: "starred-1",
      name: "E-commerce Platform",
      language: "TypeScript",
      lastEdited: "1 day ago",
      collaborators: 4,
    },
    {
      id: "starred-2",
      name: "Authentication Service",
      language: "JavaScript",
      lastEdited: "5 days ago",
      collaborators: 2,
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white hidden md:block">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center space-x-2 mb-8">
              <Network className="h-6 w-6 text-ocean-600" />
              <span className="font-bold text-xl">CodeCollab</span>
            </div>

            <nav className="space-y-1 flex-1">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-ocean-50 text-ocean-600"
              >
                <Code className="h-5 w-5" />
                <span>Projects</span>
              </Link>
              <Link
                href="/teams"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Users className="h-5 w-5" />
                <span>Teams</span>
              </Link>
              <Link
                href="/messages"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => setIsCopilotOpen(true)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              >
                <Terminal className="h-5 w-5" />
                <span>Copilot</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-ocean-100 text-ocean-600">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">User Name</p>
                  <p className="text-xs text-gray-500 truncate">user@example.com</p>
                </div>
                <button onClick={() => router.push("/")} className="text-gray-500 hover:text-gray-700">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, User!</h1>
                <p className="text-gray-600">Here are your recent projects and activities</p>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-9 bg-white border-gray-200 focus:border-ocean-500"
                  />
                </div>
                <Button className="bg-ocean-600 hover:bg-ocean-700" onClick={() => router.push("/editor/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "recent" ? "text-ocean-600 border-b-2 border-ocean-600" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setActiveTab("recent")}
                >
                  Recent
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "starred" ? "text-ocean-600 border-b-2 border-ocean-600" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setActiveTab("starred")}
                >
                  Starred
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeTab === "all" ? "text-ocean-600 border-b-2 border-ocean-600" : "text-gray-600 hover:text-gray-900"}`}
                  onClick={() => setActiveTab("all")}
                >
                  All Projects
                </button>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {(activeTab === "recent"
                ? recentProjects
                : activeTab === "starred"
                  ? starredProjects
                  : [...recentProjects, ...starredProjects]
              ).map((project) => (
                <motion.div key={project.id} variants={fadeIn}>
                  <Card
                    className="bg-white border-gray-200 hover:border-ocean-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => router.push(`/editor/${project.id}`)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-black">{project.name}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-yellow-500">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="flex items-center text-black">
                        <div className="w-3 h-3 rounded-full bg-ocean-500 mr-2"></div>
                        {project.language}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-black">
                          <Clock className="h-3 w-3 mr-1" />
                          {project.lastEdited}
                        </div>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {Array.from({ length: Math.min(3, project.collaborators) }).map((_, i) => (
                              <Avatar key={i} className="h-6 w-6 border-2 border-white">
                                <AvatarFallback
                                  className={`text-xs ${
                                    i === 0
                                      ? "bg-ocean-100 text-ocean-600"
                                      : i === 1
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-purple-100 text-purple-600"
                                  }`}
                                >
                                  {String.fromCharCode(65 + i)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          {project.collaborators > 3 && (
                            <span className="text-xs text-black ml-1">+{project.collaborators - 3}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div variants={fadeIn}>
                <Card
                  className="bg-white border-gray-200 border-dashed h-full flex items-center justify-center cursor-pointer hover:border-ocean-300 hover:shadow-md transition-all duration-300"
                  onClick={() => router.push("/editor/new")}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-ocean-100 flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-ocean-600" />
                    </div>
                    <h3 className="font-medium mb-1 text-black">Create New Project</h3>
                    <p className="text-sm text-black">Start a new coding project</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-3">
                {[
                  {
                    user: "You",
                    action: "created a new project",
                    project: "React Dashboard",
                    time: "2 hours ago",
                    avatar: "Y",
                  },
                  {
                    user: "Alex",
                    action: "commented on",
                    project: "API Integration",
                    time: "Yesterday",
                    avatar: "A",
                  },
                  {
                    user: "Sarah",
                    action: "invited you to",
                    project: "E-commerce Platform",
                    time: "2 days ago",
                    avatar: "S",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback
                          className={`${
                            activity.user === "You"
                              ? "bg-ocean-100 text-ocean-600"
                              : activity.user === "Alex"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p>
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-gray-600">{activity.action}</span>{" "}
                          <span className="font-medium text-ocean-600">{activity.project}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      <CopilotModal 
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  )
}

