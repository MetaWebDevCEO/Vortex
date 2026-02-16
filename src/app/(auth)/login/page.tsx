"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email") || "")
    const password = String(formData.get("password") || "")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {/* Header Text Section */}
      <div className="text-center space-y-2 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
          LET&apos;S CONNECT
          <br />
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            WITH VORTEX ECOSYSTEM
          </span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base font-light tracking-wide">
          Seamlessly Enhance The Future Through Our Vortex Technology
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle inner glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50" />
        
        {/* Toggle Tabs (Visual Only for now) */}
        <div className="flex p-1 bg-zinc-900/50 rounded-full mb-8 border border-zinc-800">
          <button className="flex-1 py-2 text-sm font-medium rounded-full bg-zinc-800 text-white shadow-sm transition-all">
            Email account
          </button>
          <button className="flex-1 py-2 text-sm font-medium rounded-full text-zinc-500 hover:text-zinc-300 transition-all">
            Phone number
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Email</Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="Enter your email here" 
                className="bg-zinc-900/50 border-zinc-800 text-zinc-100 pl-10 h-12 rounded-xl focus-visible:ring-zinc-600 focus-visible:border-zinc-600 placeholder:text-zinc-600 transition-all"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
              <Input 
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" 
                className="bg-zinc-900/50 border-zinc-800 text-zinc-100 pl-10 pr-10 h-12 rounded-xl focus-visible:ring-zinc-600 focus-visible:border-zinc-600 placeholder:text-zinc-600 transition-all"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-400 text-center">
              {errorMessage}
            </p>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-zinc-200 h-12 rounded-full font-bold tracking-wide text-base shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            {isLoading ? "Signing In..." : "Sign In Now"}
          </Button>

          <div className="text-center text-sm text-zinc-500">
            Don&apos;t have access yet?{" "}
            <Link href="/signup" className="text-white font-medium hover:underline decoration-zinc-500 underline-offset-4">
              Sign Up
            </Link>
          </div>
        </form>
      </div>

      <div className="text-zinc-600 text-xs text-center">
        Copyright © 2026 Vortex. All Rights Reserved.
      </div>
    </div>
  )
}
