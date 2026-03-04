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
    <div className="min-h-screen w-full bg-white flex">
      {/* Left Column - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
        <Image 
            src="/vortexfondo.png" 
            alt="Vortex Background" 
            fill 
            className="object-cover opacity-80" 
            priority
        />
        <div className="relative z-10 p-12 text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Bienvenido al futuro de la logística.</h2>
            <p className="text-lg text-zinc-300">Gestiona, optimiza y escala tu operación desde una sola plataforma unificada.</p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col gap-2">
            <Image src="/Vortex_logo.svg" alt="Vortex" width={180} height={180} priority className="mb-4" />
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-black">
                Crear cuenta
                </h1>
                <p className="text-sm text-zinc-500">
                Completa el formulario para configurar tu organización.
                </p>
            </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
            {/* Logo Upload */}
            <div className="space-y-2">
                <Label className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Logo de la Empresa</Label>
                <div className="border-2 border-dashed border-zinc-200 rounded-xl p-4 flex items-center justify-center gap-4 hover:bg-zinc-50 transition-colors cursor-pointer relative h-[100px]">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLogoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {logoPreview ? (
                        <div className="relative h-16 w-16">
                            <Image src={logoPreview} alt="Logo Preview" fill className="object-contain" />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                <Upload className="h-4 w-4 text-zinc-400" />
                            </div>
                            <p className="text-zinc-400 text-[10px] font-medium">Subir imagen</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Company & Role */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="company-name" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Empresa</Label>
                    <div className="relative group">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input 
                        id="company-name" 
                        name="company-name"
                        placeholder="Logística Global" 
                        className="bg-white border-zinc-200 text-zinc-900 pl-10 h-10 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-sm"
                        required 
                    />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Puesto</Label>
                    <div className="relative group">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input 
                        id="role" 
                        name="role"
                        placeholder="Gerente" 
                        className="bg-white border-zinc-200 text-zinc-900 pl-10 h-10 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-sm"
                        required 
                    />
                    </div>
                </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="first-name" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Nombre</Label>
                <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input 
                    id="first-name" 
                    name="first-name"
                    placeholder="Max" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-10 h-10 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-sm"
                    required 
                    />
                </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="last-name" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Apellido</Label>
                <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input 
                    id="last-name" 
                    name="last-name"
                    placeholder="Robinson" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-10 h-10 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-sm"
                    required 
                    />
                </div>
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Email</Label>
                <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="tu@correo.com" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-10 h-10 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-sm"
                    required 
                />
                </div>
            </div>
            
            {/* Password */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Contraseña</Label>
                <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="bg-white border-zinc-200 text-zinc-900 pl-10 pr-10 h-10 rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:border-zinc-300 placeholder:text-zinc-400 transition-all text-sm"
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
            </div>

            {errorMessage && (
                <p className="text-xs text-red-500 text-center font-medium">
                {errorMessage}
                </p>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-zinc-800 h-12 rounded-full font-bold tracking-wide text-base transition-all focus-visible:ring-0 focus-visible:outline-none border-0 mt-2"
            >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>

            <div className="text-center text-sm text-zinc-500 pt-2">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-black font-medium hover:underline underline-offset-4">
                Ingresar
                </Link>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}
