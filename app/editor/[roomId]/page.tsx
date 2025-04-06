"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Network, Play, Save, Share, ChevronLeft, ChevronRight, X, Menu, PanelLeft, PanelRight, Code, Users, MessageSquare, Settings, Terminal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Editor from "@monaco-editor/react"
import { CopilotModal } from "@/components/copilot-modal"

interface EditorPageProps {
  params: {
    roomId: string
  }
}

export default function EditorPage({ params }: EditorPageProps) {
  const [code, setCode] = useState(`function sayHi() {
  console.log("👋 Hello world");
}

sayHi();`)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [messages, setMessages] = useState<{ user: string; text: string; time: string }[]>([
    { user: "System", text: "Welcome to the CodeCollab editor!", time: "Just now" },
    { user: "Alex", text: "Hey team, I just joined the session.", time: "2 min ago" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeUsers] = useState([
    { name: "You", color: "emerald" },
    { name: "Alex", color: "blue" },
    { name: "Sarah", color: "purple" },
  ])
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)

  const router = useRouter()
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages([...messages, { user: "You", text: newMessage, time: "Just now" }])
      setNewMessage("")
    }
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="h-screen bg-[#f8fafc] text-gray-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white z-10">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <Network className="h-6 w-6 text-ocean-600" />
              <span className="font-bold">CodeCollab</span>
            </div>
            <div className="hidden md:flex items-center ml-6 space-x-1">
              <span className="text-sm font-medium">{params.roomId === "demo" ? "Demo Project" : "Project Name"}</span>
              <span className="text-gray-400 mx-2">•</span>
              <div className="flex -space-x-1">
                {activeUsers.map((user, i) => (
                  <Avatar key={i} className="h-5 w-5 border-2 border-white">
                    <AvatarFallback className={`text-xs ${
                      user.name === "You"
                        ? "bg-ocean-100 text-ocean-600"
                        : user.name === "Alex"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                    }`}>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Play className="h-4 w-4 mr-1" />
                Run
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            <button
              onClick={toggleSidebar}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <PanelLeft className="h-5 w-5" />
            </button>
            <button onClick={toggleChat} className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
              <PanelRight className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-50 border-b border-gray-200"
          >
            <div className="p-3 flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer Sidebar */}
        {isSidebarOpen && (
          <motion.aside
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "250px" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="w-64 border-r border-gray-200 bg-white overflow-y-auto"
          >
            <Tabs defaultValue="files">
              <TabsList className="w-full bg-gray-50 border-b border-gray-200 rounded-none">
                <TabsTrigger value="files" className="flex-1">
                  Files
                </TabsTrigger>
                <TabsTrigger value="users" className="flex-1">
                  Users
                </TabsTrigger>
              </TabsList>
              <TabsContent value="files" className="p-0 m-0">
                <div className="p-3">
                  <div className="mb-2 text-sm font-medium">Project Files</div>
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 rounded bg-ocean-50 text-ocean-600 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-ocean-400 mr-2"></div>
                      index.js
                    </div>
                    <div className="px-2 py-1.5 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                      styles.css
                    </div>
                    <div className="px-2 py-1.5 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                      index.html
                    </div>
                    <button
                      onClick={() => setIsCopilotOpen(true)}
                      className="w-full px-2 py-1.5 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex items-center"
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Copilot
                    </button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="users" className="p-0 m-0">
                <div className="p-3">
                  <div className="mb-2 text-sm font-medium">Active Users</div>
                  <div className="space-y-2">
                    {activeUsers.map((user, i) => (
                      <div key={i} className="flex items-center px-2 py-1.5">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className={`text-xs ${
                            user.name === "You"
                              ? "bg-ocean-100 text-ocean-600"
                              : user.name === "Alex"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                          }`}>
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className={user.name === "You" ? "font-medium" : ""}>{user.name}</span>
                        {user.name === "You" && <span className="ml-auto text-xs text-ocean-600">You</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.aside>
        )}

        {/* Code Editor */}
        <motion.div layout className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={handleEditorChange}
            theme="light"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontFamily: "monospace",
              lineNumbers: "on",
              renderLineHighlight: "all",
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
              },
            }}
          />
        </motion.div>

        {/* Chat Panel */}
        {isChatOpen && (
          <motion.aside
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "300px" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="w-72 border-l border-gray-200 bg-white flex flex-col"
          >
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Chat</h3>
              <button onClick={toggleChat} className="text-gray-600 hover:text-gray-900">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className={`flex ${message.user === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 ${
                      message.user === "You"
                        ? "bg-ocean-50 text-gray-900"
                        : message.user === "System"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-gray-50 text-gray-900"
                    }`}
                  >
                    {message.user !== "You" && (
                      <div className="flex items-center mb-1">
                        <Avatar className="h-4 w-4 mr-1">
                          <AvatarFallback
                            className={`text-xs ${
                              message.user === "System" 
                                ? "bg-gray-200 text-gray-700" 
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {message.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-gray-900">{message.user}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-3 border-t border-gray-200">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-white border-gray-200 focus:border-ocean-500"
                />
                <Button type="submit" className="ml-2 bg-ocean-600 hover:bg-ocean-700 text-white">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.aside>
        )}
      </div>

      <CopilotModal 
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  )
}

