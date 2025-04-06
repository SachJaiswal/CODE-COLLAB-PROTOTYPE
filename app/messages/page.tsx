"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Network, Code, Users, MessageSquare, Settings, Search, LogOut, Send, Phone, Video, Info, Terminal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { CopilotModal } from "@/components/copilot-modal"

export default function MessagesPage() {
  const router = useRouter()
  const [activeChat, setActiveChat] = useState("chat-1")
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const contacts = [
    {
      id: "chat-1",
      name: "Alex Johnson",
      avatar: "A",
      status: "online",
      lastMessage: "I just pushed the new changes",
      time: "2m ago",
      unread: 2,
    },
    {
      id: "chat-2",
      name: "Sarah Chen",
      avatar: "S",
      status: "online",
      lastMessage: "Can you review my PR?",
      time: "1h ago",
      unread: 0,
    },
    {
      id: "chat-3",
      name: "Frontend Team",
      avatar: "F",
      status: "group",
      lastMessage: "Meeting at 3pm",
      time: "3h ago",
      unread: 5,
    },
    {
      id: "chat-4",
      name: "Michael Rodriguez",
      avatar: "M",
      status: "offline",
      lastMessage: "Let me know when you're free",
      time: "Yesterday",
      unread: 0,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Alex Johnson",
      avatar: "A",
      text: "Hey, how's the new feature coming along?",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Almost done! Just fixing a few bugs.",
      time: "10:32 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Alex Johnson",
      avatar: "A",
      text: "Great! I just pushed some changes to the repo. Can you pull and check if everything works with your changes?",
      time: "10:35 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "You",
      text: "Sure, I'll do that right now.",
      time: "10:36 AM",
      isMe: true,
    },
    {
      id: 5,
      sender: "Alex Johnson",
      avatar: "A",
      text: "I just pushed the new changes. Let me know if you see any issues.",
      time: "10:45 AM",
      isMe: false,
    },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, you would send the message to the server
      setMessage("")
    }
  }

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
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Users className="h-5 w-5" />
                <span>Teams</span>
              </Link>
              <Link
                href="/messages"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-ocean-50 text-ocean-600"
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

        {/* Contacts Sidebar */}
        <div className="w-72 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                className="pl-9 bg-white border-gray-200 focus:border-ocean-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-3 cursor-pointer ${activeChat === contact.id ? "bg-ocean-50" : "hover:bg-gray-50"}`}
                onClick={() => setActiveChat(contact.id)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback
                        className={`${
                          contact.id === "chat-1"
                            ? "bg-blue-100 text-blue-600"
                            : contact.id === "chat-2"
                              ? "bg-purple-100 text-purple-600"
                              : contact.id === "chat-3"
                                ? "bg-ocean-100 text-ocean-600"
                                : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {contact.status === "online" && (
                      <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                    {contact.status === "group" && (
                      <span className="absolute bottom-0 right-3 w-3 h-3 bg-ocean-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && <Badge className="ml-2 bg-ocean-500">{contact.unread}</Badge>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback className="bg-blue-100 text-blue-600">A</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Alex Johnson</h3>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                {!msg.isMe && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback className="bg-blue-100 text-blue-600">{msg.avatar}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isMe ? "bg-ocean-600 text-white" : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs text-right mt-1 ${msg.isMe ? "text-white/70" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white border-gray-200 focus:border-ocean-500"
              />
              <Button type="submit" className="ml-2 bg-ocean-600 hover:bg-ocean-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      <CopilotModal 
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
      />
    </div>
  )
}

