"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

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
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image src="/Vortex_logo.svg" alt="Vortex" width={220} height={220} priority />
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
              Plataforma logística
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-black">
              Acceder a Vortex
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Ingresa tus credenciales para continuar
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Email</Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="tu@correo.com" 
                className="bg-white border-zinc-200 text-zinc-900 pl-10 h-12 rounded-2xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all"
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input 
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" 
                className="bg-white border-zinc-200 text-zinc-900 pl-10 pr-10 h-12 rounded-2xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors"
              >
                {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-xs text-zinc-600 hover:text-black transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 text-center">
              {errorMessage}
            </p>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-zinc-800 h-12 rounded-full font-bold tracking-wide text-base transition-all focus-visible:ring-0 focus-visible:outline-none border-0"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>

          <div className="text-center text-sm text-zinc-600">
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="text-black font-medium hover:underline underline-offset-4">
              Crear cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
