"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Network, Code, Users, MessageSquare, Settings, Play, Zap, Lock, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AuthModal from "@/components/auth-modal"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Network className="h-6 w-6 text-ocean-600" />
            <span className="font-bold text-xl">CodeCollab</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={scrollToFeatures} className="text-sm hover:text-ocean-600 transition-colors">
              Features
            </button>
            <Link href="#testimonials" className="text-sm hover:text-ocean-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm hover:text-ocean-600 transition-colors">
              Pricing
            </Link>
            <button 
              onClick={() => openAuthModal("login")} 
              className="text-ocean-600 hover:text-ocean-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-ocean-50 transition-all duration-300"
            >
              Login
            </button>
            <Button 
              onClick={() => openAuthModal("signup")} 
              className="bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button onClick={scrollToFeatures} className="text-sm hover:text-ocean-600 transition-colors">
                Features
              </button>
              <Link href="#testimonials" className="text-sm hover:text-ocean-600 transition-colors">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm hover:text-ocean-600 transition-colors">
                Pricing
              </Link>
              <button 
                onClick={() => openAuthModal("login")} 
                className="text-ocean-600 hover:text-ocean-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-ocean-50 w-full text-center transition-all duration-300"
              >
                Login
              </button>
              <Button 
                onClick={() => openAuthModal("signup")} 
                className="bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full"
              >
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col space-y-6">
                <Badge className="w-fit bg-ocean-100 text-ocean-600 border-ocean-200 hover:bg-ocean-200">
                  Real-time Collaboration
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  Code, Chat and Collaborate. It&apos;s All in Sync.
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-lg">
                  A modern platform for teams to code together in real-time, with built-in chat, file sharing, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-ocean-600 hover:bg-ocean-700 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => openAuthModal("signup")}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 bg-white text-gray-800 hover:text-ocean-600 hover:border-ocean-500 font-semibold px-8 py-6 text-lg rounded-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => router.push("/editor/demo")}
                  >
                    Try Demo
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="relative aspect-[16/10] min-h-[600px] w-full"
              >
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-xl w-full h-full">
                  <Image
                    src="/collaborative-coding.png"
                    fill
                    priority
                    alt="Collaborative coding platform showing developers working together"
                    className="object-cover object-center"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-ocean-500/30 via-ocean-400/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <h3 className="text-white text-xl font-semibold">Real-time Collaborative Coding</h3>
                    <p className="text-white/90 mt-2">Work together seamlessly with your team</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <Badge className="mb-4 bg-ocean-100 text-ocean-600 border-ocean-200 hover:bg-ocean-200">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Everything you need to code together
              </h2>
              <p className="text-gray-600 text-lg">
                Our platform provides all the tools you need for seamless collaboration, from real-time code editing to
                integrated chat and more.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Code className="h-10 w-10 text-ocean-600" />,
                  title: "Real-time Editing",
                  description: "See changes as they happen with our real-time collaborative code editor.",
                },
                {
                  icon: <MessageSquare className="h-10 w-10 text-ocean-600" />,
                  title: "Integrated Chat",
                  description: "Discuss your code with team members without leaving the platform.",
                },
                {
                  icon: <Users className="h-10 w-10 text-ocean-600" />,
                  title: "User Management",
                  description: "Easily manage who has access to your coding sessions.",
                },
                {
                  icon: <Settings className="h-10 w-10 text-ocean-600" />,
                  title: "Customizable Settings",
                  description: "Personalize your coding environment to match your preferences.",
                },
                {
                  icon: <Play className="h-10 w-10 text-ocean-600" />,
                  title: "Run & Debug",
                  description: "Execute your code and debug issues in real-time with your team.",
                },
                {
                  icon: <Lock className="h-10 w-10 text-ocean-600" />,
                  title: "Secure Sharing",
                  description: "Share your code securely with encryption and access controls.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-ocean-600" />,
                  title: "AI Assistance",
                  description: "Get intelligent code suggestions and help from our built-in AI.",
                },
                {
                  icon: <Network className="h-10 w-10 text-ocean-600" />,
                  title: "Version Control",
                  description: "Integrate with Git repositories for seamless workflow.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white p-8 rounded-xl border border-gray-200 hover:border-ocean-300 transition-all duration-300 hover:shadow-lg min-h-[300px] flex flex-col"
                >
                  <div className="mb-6 p-4 bg-ocean-50 rounded-lg w-fit">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-lg flex-grow">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-ocean-700 to-ocean-600">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to transform your coding workflow?
              </h2>
              <p className="text-xl mb-8 text-white/80">
                Join thousands of developers who are already using CodeCollab to collaborate more effectively.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-ocean-700 hover:bg-gray-50 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => openAuthModal("signup")}
                >
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => router.push("/editor/demo")}
                >
                  Try Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode}
      />
    </div>
  )
}

