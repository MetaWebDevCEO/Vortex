"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Building2, User, Plus, X, Upload, ChevronRight, MapPin, Briefcase, Users, Truck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { supabase } from "@/lib/supabase";

// --- DATA TYPES ---
type OnboardingData = {
  companyName: string;
  role: string;
  employees: string;
  projectsPerMonth: string;
  projectTypes: string;
  fleetSize: string;
  quotesPerMonth: string;
  country: string;
  state: string;
  logo: string | null; // URL or base64
  collaboratorName: string;
};

// --- OPTIONS DATA ---
const roles = [
  "Dueño / CEO / Fundador",
  "Gerente de Logística / Operaciones",
  "Jefe de Flota / Tráfico",
  "Despachador / Analista",
  "Otro"
];

const employeeRanges = [
  "1 - 5 personas",
  "6 - 20 personas",
  "21 - 100 personas",
  "Más de 100 personas"
];

const projectRanges = [
  "Menos de 10",
  "10 - 50",
  "51 - 200",
  "Más de 200"
];

const projectTypes = [
  "Carga General (FTL/LTL)",
  "Carga Especializada",
  "Contenerizada",
  "Maritimo y Aereo"
];

const fleetSizes = [
  "Sin flota (Solo Logística)",
  "1 - 10 unidades",
  "11 - 50 unidades",
  "Más de 50 unidades"
];

const quoteRanges = [
  "Menos de 20",
  "20 - 100",
  "100 - 500",
  "Más de 500"
];
const countries = ["México", "Estados Unidos", "Colombia", "Chile", "Otro"];
const statesMx = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
  "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero",
  "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
  "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

// --- MAIN COMPONENT ---
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    companyName: "",
    role: "",
    employees: "",
    projectsPerMonth: "",
    projectTypes: "",
    fleetSize: "",
    quotesPerMonth: "",
    country: "",
    state: "",
    logo: null,
    collaboratorName: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalSteps = 10;
  const progress = (step / totalSteps) * 100;

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Step 10 finished, proceed to save data
      setIsProcessing(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found");

        // 1. Create Organization
        const { data: org, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: data.companyName,
            country: data.country,
            state: data.state,
            fleet_size: data.fleetSize,
            project_types: data.projectTypes,
            projects_per_month: data.projectsPerMonth,
            quotes_per_month: data.quotesPerMonth,
            logo_url: data.logo // Note: In a real app, upload image first and get URL
          })
          .select()
          .single();

        if (orgError) {
            console.error("Error creating org:", orgError);
            // If RLS blocks this, we might need a server action or trigger
            throw orgError;
        }

        // 2. Link User as Owner
        const { error: memberError } = await supabase
          .from('organization_members')
          .insert({
            organization_id: org.id,
            user_id: user.id,
            role: 'owner'
          });

        if (memberError) {
             console.error("Error linking member:", memberError);
             throw memberError;
        }

        // Success - Redirect to dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Onboarding error:", error);
        // Fallback for demo purposes if DB setup is missing
        router.push("/dashboard");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData("logo", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- RENDER STEPS ---
  
  // 1. Nombre de la empresa
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 1</span>
        <h1 className="text-4xl font-bold text-white">¿Cuál es el nombre de tu empresa?</h1>
        <p className="text-zinc-400">Comencemos por definir tu identidad.</p>
      </div>
      <Input 
        autoFocus
        value={data.companyName}
        onChange={(e) => updateData("companyName", e.target.value)}
        placeholder="Ej. Logística Global S.A.S"
        className="h-16 text-2xl bg-transparent border-b-2 border-white/20 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-white px-0 placeholder:text-zinc-700"
      />
      <Button 
        onClick={handleNext} 
        disabled={!data.companyName.trim()}
        className="w-full h-12 rounded-full bg-white text-black hover:bg-zinc-200 font-bold"
      >
        Continuar <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  // 2. Qué puesto ocupas (Selector)
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 2</span>
        <h1 className="text-4xl font-bold text-white">¿Qué puesto ocupas?</h1>
        <p className="text-zinc-400">Selecciona tu rol principal.</p>
      </div>
      <div className="grid gap-3">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => { updateData("role", role); handleNext(); }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              data.role === role 
                ? "border-white bg-white/10" 
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <span className={cn("text-lg", data.role === role ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{role}</span>
            {data.role === role && <Check className="h-5 w-5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  // 3. Cuantos colaboradores tienes (Selector)
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 3</span>
        <h1 className="text-4xl font-bold text-white">¿Cuántos colaboradores tienes?</h1>
        <p className="text-zinc-400">Tamaño de tu equipo.</p>
      </div>
      <div className="grid gap-3">
        {employeeRanges.map((range) => (
          <button
            key={range}
            onClick={() => { updateData("employees", range); handleNext(); }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              data.employees === range 
                ? "border-white bg-white/10" 
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <span className={cn("text-lg", data.employees === range ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{range}</span>
            {data.employees === range && <Check className="h-5 w-5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  // 4. Numero de proyectos al mes (Selector)
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 4</span>
        <h1 className="text-4xl font-bold text-white">¿Número de proyectos al mes?</h1>
        <p className="text-zinc-400">Volumen aproximado de operaciones.</p>
      </div>
      <div className="grid gap-3">
        {projectRanges.map((range) => (
          <button
            key={range}
            onClick={() => { updateData("projectsPerMonth", range); handleNext(); }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              data.projectsPerMonth === range 
                ? "border-white bg-white/10" 
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <span className={cn("text-lg", data.projectsPerMonth === range ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{range}</span>
            {data.projectsPerMonth === range && <Check className="h-5 w-5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  // 5. Tipos de proyectos (Selector)
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 5</span>
        <h1 className="text-4xl font-bold text-white">¿Tipos de proyectos?</h1>
        <p className="text-zinc-400">Enfoque principal.</p>
      </div>
      <div className="grid gap-3">
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => { updateData("projectTypes", type); handleNext(); }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              data.projectTypes === type 
                ? "border-white bg-white/10" 
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <span className={cn("text-lg", data.projectTypes === type ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{type}</span>
            {data.projectTypes === type && <Check className="h-5 w-5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  // 6. Total de flotilla (Selector)
  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 6</span>
        <h1 className="text-4xl font-bold text-white">¿Total de flotilla?</h1>
        <p className="text-zinc-400">Unidades propias o arrendadas.</p>
      </div>
      <div className="grid gap-3">
        {fleetSizes.map((size) => (
          <button
            key={size}
            onClick={() => { updateData("fleetSize", size); handleNext(); }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              data.fleetSize === size 
                ? "border-white bg-white/10" 
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <span className={cn("text-lg", data.fleetSize === size ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{size}</span>
            {data.fleetSize === size && <Check className="h-5 w-5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  // 7. Cotizaciones aproximadas al mes (Selector)
  const renderStep7 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 7</span>
        <h1 className="text-4xl font-bold text-white">¿Cotizaciones mensuales?</h1>
        <p className="text-zinc-400">Aproximadas.</p>
      </div>
      <div className="grid gap-3">
        {quoteRanges.map((range) => (
          <button
            key={range}
            onClick={() => { updateData("quotesPerMonth", range); handleNext(); }}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
              data.quotesPerMonth === range 
                ? "border-white bg-white/10" 
                : "border-white/10 bg-white/5 hover:border-white/30"
            )}
          >
            <span className={cn("text-lg", data.quotesPerMonth === range ? "text-white" : "text-zinc-400 group-hover:text-zinc-200")}>{range}</span>
            {data.quotesPerMonth === range && <Check className="h-5 w-5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  // 8. Pais y estado (Doble Selector)
  const renderStep8 = () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 8</span>
        <h1 className="text-4xl font-bold text-white">¿Dónde operas?</h1>
        <p className="text-zinc-400">País y Estado principal.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">País</label>
            <div className="relative">
                <select
                    value={data.country}
                    onChange={(e) => updateData("country", e.target.value)}
                    className="w-full h-12 rounded-lg bg-white/5 border border-white/10 text-white px-3 appearance-none focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">Selecciona un país</option>
                    {countries.map(c => (
                        <option key={c} value={c} className="bg-zinc-900 text-white">
                            {c}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Estado</label>
            <div className="relative">
                <select
                    value={data.state}
                    onChange={(e) => updateData("state", e.target.value)}
                    disabled={data.country !== "México"}
                    className="w-full h-12 rounded-lg bg-white/5 border border-white/10 text-white px-3 appearance-none focus:outline-none focus:border-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">
                        {data.country === "México" ? "Selecciona un estado" : "No aplica"}
                    </option>
                    {data.country === "México" && statesMx.map(s => (
                        <option key={s} value={s} className="bg-zinc-900 text-white">
                            {s}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                    <ChevronRight className="h-4 w-4 rotate-90" />
                </div>
            </div>
        </div>
      </div>

      <Button 
        onClick={handleNext} 
        disabled={!data.country || (data.country === "México" && !data.state)}
        className="w-full h-12 rounded-full bg-white text-black hover:bg-zinc-200 font-bold"
      >
        Continuar <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  // 9. Agregar logo (Adjuntar Img)
  const renderStep9 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 9</span>
        <h1 className="text-4xl font-bold text-white">Agrega tu logo</h1>
        <p className="text-zinc-400">Personaliza tu experiencia (Opcional).</p>
      </div>

      <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:bg-white/5 transition-colors cursor-pointer relative min-h-[200px]">
        <input 
            type="file" 
            accept="image/*" 
            onChange={handleLogoUpload}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        {data.logo ? (
            <div className="relative h-32 w-32">
                <Image src={data.logo} alt="Logo Preview" fill className="object-contain" />
            </div>
        ) : (
            <>
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-zinc-400" />
                </div>
                <p className="text-zinc-400 font-medium">Click para subir imagen</p>
            </>
        )}
      </div>

      <div className="flex gap-3">
          <Button variant="ghost" onClick={handleNext} className="flex-1 text-zinc-500 hover:text-white">
            Omitir
          </Button>
          <Button 
            onClick={handleNext} 
            className="flex-1 h-12 rounded-full bg-white text-black hover:bg-zinc-200 font-bold"
          >
            {data.logo ? "Continuar" : "Saltar este paso"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </div>
  );

  // 10. Agrega a un colaborador (Input Nombre)
  const renderStep10 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">Paso 10</span>
        <h1 className="text-4xl font-bold text-white">Invita a un colaborador</h1>
        <p className="text-zinc-400">Escribe el nombre de un miembro clave.</p>
      </div>

      <Input 
        autoFocus
        value={data.collaboratorName}
        onChange={(e) => updateData("collaboratorName", e.target.value)}
        placeholder="Nombre del colaborador"
        className="h-16 text-2xl bg-transparent border-b-2 border-white/20 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-white px-0 placeholder:text-zinc-700"
      />

      <div className="flex gap-3 pt-4">
          <Button variant="ghost" onClick={handleNext} className="flex-1 text-zinc-500 hover:text-white">
            Omitir
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!data.collaboratorName.trim()}
            className="flex-1 h-12 rounded-full bg-white text-black hover:bg-zinc-200 font-bold"
          >
            Finalizar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </div>
  );

  // Loading State
  if (isProcessing) {
     return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-6">
        <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        <h2 className="text-xl font-medium text-zinc-300 animate-pulse tracking-wide">Creando tu cuenta...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Header / Progress */}
      <div className="h-1 w-full bg-white/5 fixed top-0 left-0 z-50">
        <motion.div 
          className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
                {step === 6 && renderStep6()}
                {step === 7 && renderStep7()}
                {step === 8 && renderStep8()}
                {step === 9 && renderStep9()}
                {step === 10 && renderStep10()}
            </motion.div>
        </AnimatePresence>

        {/* Back Button (except step 1) */}
        {step > 1 && (
            <div className="fixed bottom-8 left-0 w-full flex justify-center">
                 <button 
                    onClick={handleBack}
                    className="text-zinc-500 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
                 >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Volver
                 </button>
            </div>
        )}
      </div>
    </div>
  );
}
