"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface CopilotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CopilotModal({ isOpen, onClose }: CopilotModalProps) {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleGenerate = () => {
    const primeCode = `def is_prime(num):
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True

def print_primes(n):
    count = 0
    num = 2
    while count < n:
        if is_prime(num):
            print(num, end=' ')
            count += 1
        num += 1

# Example usage:
n = int(input("Enter the value of N: "))
print_primes(n)`
    setResponse(primeCode)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#1e1e1e] border-gray-700 text-white p-0 h-[90vh]">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 p-4 border-b border-gray-700">
            <Terminal className="w-5 h-5 text-gray-400" />
            <span className="font-semibold">Copilot</span>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {response ? (
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {response}
                </pre>
              ) : (
                <div className="text-sm text-gray-400">
                  Ask me anything about coding...
                </div>
              )}
            </motion.div>
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Write a program..."
                className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-24"
              />
              <Button 
                onClick={handleGenerate}
                className="absolute right-1 top-1 bg-ocean-600 hover:bg-ocean-700 text-white"
                size="sm"
              >
                Generate Code
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 