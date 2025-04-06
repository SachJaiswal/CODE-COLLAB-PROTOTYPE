"use client"
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
  UserPlus,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CopilotModal } from "@/components/copilot-modal"

export default function TeamsPage() {
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

  const teams = [
    {
      id: "team-1",
      name: "Frontend Team",
      description: "UI/UX and frontend development team",
      members: 5,
      projects: 8,
    },
    {
      id: "team-2",
      name: "Backend Team",
      description: "API and server-side development team",
      members: 4,
      projects: 6,
    },
    {
      id: "team-3",
      name: "DevOps",
      description: "Infrastructure and deployment team",
      members: 3,
      projects: 4,
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
              <span className="font-bold text-xl">Code Sync</span>
            </div>

            <nav className="space-y-1 flex-1">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Code className="h-5 w-5" />
                <span>Projects</span>
              </Link>
              <Link
                href="/teams"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-ocean-50 text-ocean-600"
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
                <h1 className="text-2xl font-bold">Teams</h1>
                <p className="text-gray-600">Manage your teams and collaborators</p>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search teams..."
                    className="pl-9 bg-white border-gray-200 focus:border-ocean-500"
                  />
                </div>
                <Button className="bg-ocean-600 hover:bg-ocean-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Team
                </Button>
              </div>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {teams.map((team) => (
                <motion.div key={team.id} variants={fadeIn}>
                  <Card className="bg-white border-gray-200 hover:border-ocean-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-black">{team.name}</CardTitle>
                      <CardDescription className="text-black">{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Badge className="bg-ocean-100 text-ocean-600 hover:bg-ocean-200">
                            {team.members} Members
                          </Badge>
                        </div>
                        <div className="text-sm text-black">{team.projects} Projects</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {Array.from({ length: Math.min(4, team.members) }).map((_, i) => (
                            <Avatar key={i} className="h-8 w-8 border-2 border-white">
                              <AvatarFallback
                                className={`${
                                  i === 0
                                    ? "bg-ocean-100 text-ocean-600"
                                    : i === 1
                                      ? "bg-blue-100 text-blue-600"
                                      : i === 2
                                        ? "bg-purple-100 text-purple-600"
                                        : "bg-red-100 text-red-600"
                                }`}
                              >
                                {String.fromCharCode(65 + i)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {team.members > 4 && (
                            <Avatar className="h-8 w-8 border-2 border-white">
                              <AvatarFallback className="bg-gray-100 text-gray-600">+{team.members - 4}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Invite
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div variants={fadeIn}>
                <Card className="bg-white border-gray-200 border-dashed h-full flex items-center justify-center cursor-pointer hover:border-ocean-300 hover:shadow-md transition-all duration-300">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-ocean-100 flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-ocean-600" />
                    </div>
                    <h3 className="font-medium mb-1 text-black">Create New Team</h3>
                    <p className="text-sm text-black">Invite members and start collaborating</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Team Invitations</h2>
                <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-3">
                {[
                  {
                    team: "Design Team",
                    inviter: "Sarah",
                    time: "2 days ago",
                  },
                  {
                    team: "Mobile Development",
                    inviter: "Alex",
                    time: "1 week ago",
                  },
                ].map((invitation, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-ocean-100 text-ocean-600">
                            {invitation.team.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{invitation.team}</p>
                          <p className="text-sm text-gray-500">
                            Invited by {invitation.inviter} • {invitation.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-ocean-600 hover:bg-ocean-700">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-100">
                          Decline
                        </Button>
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

