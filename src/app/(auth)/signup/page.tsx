"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, Building2, Briefcase, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const firstName = String(formData.get("first-name") || "")
    const lastName = String(formData.get("last-name") || "")
    const email = String(formData.get("email") || "")
    const password = String(formData.get("password") || "")
    
    // New fields
    const companyName = String(formData.get("company-name") || "")
    const role = String(formData.get("role") || "")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          // Store role in user metadata as well if needed
          role: role
        },
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      return
    }

    if (data.user) {
        // Auto-create organization for the new user
        const { error: orgError } = await supabase.rpc('create_organization_for_user', {
            org_name: companyName || `Organización de ${firstName}`,
            org_data: {
                country: "México",
                state: "CDMX",
                fleetSize: "Sin flota",
                projectTypes: "General",
                projectsPerMonth: "0",
                quotesPerMonth: "0",
                logo: logoPreview, // Save logo base64/url
                role: role 
            }
        });
        
        // No logging error to console to keep clean
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen w-full bg-black flex">
      {/* Left Column - Image */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        {/* Ambient background if image fails or while loading */}
        <div className="absolute inset-0 bg-zinc-900" />
        
        {/* Content Overlay */}
        <div className="relative z-10 p-16 text-white max-w-xl flex flex-col justify-center h-full">
            <div className="mb-8">
                 <Image src="/Vortex_logo.svg" alt="Vortex" width={400} height={400} className="invert brightness-0" />
            </div>
            <h2 className="text-5xl font-bold mb-6 tracking-tight leading-tight">
                Bienvenido a <br/>
                <span className="text-zinc-400">Vortex Platform.</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
                La solución integral para gestionar, optimizar y escalar tus operaciones logísticas desde un solo lugar.
            </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2 lg:hidden">
                 <Image src="/isotipo.svg" alt="Vortex" width={32} height={32} />
                 <span className="font-bold text-xl tracking-tight">Vortex</span>
            </div>
            <div>
                
            </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* Logo Upload - Compact */}
            <div className="space-y-1.5">
                <Label className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Logo</Label>
                <div className="border border-dashed border-zinc-200 rounded-lg p-2 flex items-center justify-center gap-3 hover:bg-zinc-50 transition-colors cursor-pointer relative h-[80px]">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {logoPreview ? (
                        <div className="relative h-14 w-14">
                            <Image src={logoPreview} alt="Logo Preview" fill className="object-contain" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center">
                                <Upload className="h-3 w-3 text-zinc-400" />
                            </div>
                            <p className="text-zinc-400 text-[10px] font-medium">Subir logo</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Company & Role - Compact Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <Label htmlFor="company-name" className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Empresa</Label>
                    <div className="relative group">
                    <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <Input 
                        id="company-name" 
                        name="company-name"
                        placeholder="Logística Global" 
                        className="bg-white border-zinc-200 text-zinc-900 pl-8 h-9 rounded-lg focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-xs"
                        required 
                    />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Puesto</Label>
                    <div className="relative group">
                    <Briefcase className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <Input 
                        id="role" 
                        name="role"
                        placeholder="Gerente" 
                        className="bg-white border-zinc-200 text-zinc-900 pl-8 h-9 rounded-lg focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-xs"
                        required 
                    />
                    </div>
                </div>
            </div>

            {/* Name Fields - Compact Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                <Label htmlFor="first-name" className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Nombre</Label>
                <div className="relative group">
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <Input 
                    id="first-name" 
                    name="first-name"
                    placeholder="Max" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-8 h-9 rounded-lg focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-xs"
                    required 
                    />
                </div>
                </div>
                <div className="space-y-1.5">
                <Label htmlFor="last-name" className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Apellido</Label>
                <div className="relative group">
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <Input 
                    id="last-name" 
                    name="last-name"
                    placeholder="Robinson" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-8 h-9 rounded-lg focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-xs"
                    required 
                    />
                </div>
                </div>
            </div>

            {/* Email - Compact */}
            <div className="space-y-1.5">
                <Label htmlFor="email" className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Email</Label>
                <div className="relative group">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="tu@correo.com" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-8 h-9 rounded-lg focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-xs"
                    required 
                />
                </div>
            </div>
            
            {/* Password - Compact */}
            <div className="space-y-1.5">
                <Label htmlFor="password" className="text-zinc-700 text-[10px] uppercase tracking-wider font-semibold">Contraseña</Label>
                <div className="relative group">
                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-8 pr-8 h-9 rounded-lg focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-xs"
                    required 
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black transition-colors"
                >
                    {showPassword ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                </div>
            </div>

            {errorMessage && (
                <p className="text-xs text-red-500 text-center font-medium">
                {errorMessage}
                </p>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-zinc-800 h-10 rounded-full font-bold tracking-wide text-sm transition-all focus-visible:ring-0 focus-visible:outline-none border-0 mt-1"
            >
                {isLoading ? "Creando..." : "Crear cuenta"}
            </Button>

            <div className="text-center text-xs text-zinc-500 pt-1">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-black font-medium hover:underline underline-offset-4">
                Ingresar
                </Link>
            </div>
            </form>
        </div>
      </div>
  </div>)




}
