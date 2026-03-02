"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Building2, User, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Question = {
  id: number;
  title: string;
  description: string;
  options: Option[];
  type?: "select";
};

type Option = {
  label: string;
  value: string;
  score: number;
};

const questions: Question[] = [
  {
    id: 1,
    title: "¿Cuál es tu objetivo principal con Vortex?",
    description: "Ayúdanos a entender qué buscas optimizar.",
    options: [
      { label: "Gestión personal de envíos", value: "personal", score: 0 },
      { label: "Optimizar operación logística", value: "operation", score: 2 },
      { label: "Reducir costos de transporte", value: "costs", score: 2 },
      { label: "Digitalizar mi empresa", value: "digitalization", score: 2 },
    ],
  },
  {
    id: 2,
    title: "¿Cuántas personas accederán a la plataforma?",
    description: "Define el tamaño de tu equipo de trabajo.",
    options: [
      { label: "Solo yo", value: "1", score: 0 },
      { label: "2 - 10 personas", value: "2-10", score: 1 },
      { label: "11 - 50 personas", value: "11-50", score: 2 },
      { label: "Más de 50 personas", value: "50+", score: 3 },
    ],
  },
  {
    id: 3,
    title: "¿Cuál es tu volumen mensual de envíos?",
    description: "Cantidad aproximada de órdenes o despachos.",
    options: [
      { label: "Menos de 50", value: "<50", score: 0 },
      { label: "50 - 500", value: "50-500", score: 1 },
      { label: "500 - 5,000", value: "500-5000", score: 2 },
      { label: "Más de 5,000", value: "5000+", score: 3 },
    ],
  },
  {
    id: 4,
    title: "¿Cómo gestionas tu flota actualmente?",
    description: "Indica el tipo de transporte que utilizas.",
    options: [
      { label: "No tengo flota (Logística tercerizada)", value: "none", score: 1 },
      { label: "Flota propia pequeña", value: "small", score: 1 },
      { label: "Flota mixta (Propia + Terceros)", value: "mixed", score: 2 },
      { label: "Flota corporativa grande", value: "large", score: 3 },
    ],
  },
  {
    id: 5,
    title: "¿Qué herramientas utilizas hoy?",
    description: "Para entender tu nivel de digitalización actual.",
    options: [
      { label: "Excel, Papel o WhatsApp", value: "manual", score: 0 },
      { label: "Software básico de rastreo", value: "basic", score: 1 },
      { label: "ERP o TMS legado", value: "legacy", score: 2 },
      { label: "Desarrollo propio a medida", value: "custom", score: 3 },
    ],
  },
  {
    id: 6,
    title: "¿Cuál es tu necesidad más crítica?",
    description: "El problema que necesitas resolver ya.",
    options: [
      { label: "Rastreo básico de envíos", value: "tracking", score: 0 },
      { label: "Optimización de rutas", value: "routing", score: 1 },
      { label: "Control de costos y auditoría", value: "audit", score: 2 },
      { label: "Torre de control completa", value: "control_tower", score: 3 },
    ],
  },
  {
    id: 7,
    title: "¿Necesitas integraciones con otros sistemas?",
    description: "Conexión con ERPs, CRMs o marketplaces.",
    options: [
      { label: "No, usaré Vortex como standalone", value: "no", score: 0 },
      { label: "Quizás más adelante", value: "maybe", score: 1 },
      { label: "Sí, necesito conectar mi ERP/CRM", value: "yes", score: 2 },
      { label: "Sí, requiero API personalizada", value: "api", score: 3 },
    ],
  },
  {
    id: 8,
    title: "¿Cuál es tu rango de presupuesto mensual estimado?",
    description: "Para recomendarte el plan que mejor se ajuste.",
    options: [
      { label: "Bajo (Busco versión gratuita/inicial)", value: "low", score: 0 },
      { label: "Medio (Crecimiento)", value: "medium", score: 1 },
      { label: "Alto (Escala)", value: "high", score: 2 },
      { label: "Corporativo (Enterprise)", value: "enterprise", score: 3 },
    ],
  },
  {
    id: 9,
    title: "¿Cuál es tu rol en la organización?",
    description: "Para personalizar tu experiencia.",
    options: [
      { label: "Dueño / Fundador", value: "owner", score: 1 },
      { label: "Gerente de Logística / Operaciones", value: "manager", score: 2 },
      { label: "Operativo / Despachador", value: "staff", score: 1 },
      { label: "Director de Tecnología (CTO)", value: "tech", score: 2 },
    ],
  },
  {
    id: 10,
    title: "¿Cuándo planeas implementar la solución?",
    description: "Tu horizonte de tiempo para arrancar.",
    options: [
      { label: "Inmediatamente", value: "now", score: 1 },
      { label: "En el próximo mes", value: "1month", score: 1 },
      { label: "En el próximo trimestre", value: "3months", score: 1 },
      { label: "Solo estoy explorando", value: "exploring", score: 0 },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  
  // Custom steps that come after the questions
  const [customStep, setCustomStep] = useState<"questions" | "company" | "users">("questions");

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleOptionSelect = (option: Option) => {
    setAnswers((prev) => ({ ...prev, [questions[currentStep].id]: option }));
    
    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 250);
    } else {
      // Finished questions, go to company step
      setCustomStep("company");
    }
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim()) {
      setCustomStep("users");
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserEmail.trim() && !users.includes(newUserEmail)) {
      setUsers([...users, newUserEmail]);
      setNewUserEmail("");
    }
  };

  const removeUser = (email: string) => {
    setUsers(users.filter(u => u !== email));
  };

  const handleFinishOnboarding = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 1500);
  };

  const calculateRecommendation = () => {
    let totalScore = 0;
    Object.values(answers).forEach((ans) => {
      totalScore += ans.score;
    });

    if (totalScore >= 15) {
      return {
        type: "Enterprise",
        title: "Plan Corporativo Vortex",
        description: "Tu operación requiere potencia, integraciones y soporte dedicado. Hemos configurado el entorno Enterprise para ti.",
        features: ["Usuarios ilimitados", "Integración ERP/SAP", "Soporte 24/7", "Analítica Avanzada"],
        icon: Building2,
      };
    } else {
      return {
        type: "Personal / Startup",
        title: "Plan Vortex Starter",
        description: "Ideal para comenzar a optimizar sin complicaciones. Tienes acceso a las herramientas esenciales de inmediato.",
        features: ["Hasta 3 usuarios", "Tracking en tiempo real", "Gestión de pedidos", "Soporte por email"],
        icon: User,
      };
    }
  };

  const recommendation = calculateRecommendation();

  if (showResult) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <recommendation.icon className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]">Recomendación Lista</p>
            <h1 className="text-3xl font-bold text-white">{recommendation.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{recommendation.description}</p>
          </div>

          <Card className="border-white/10 shadow-2xl bg-zinc-900/50 text-left backdrop-blur-md">
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {recommendation.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button 
            onClick={() => router.push("/dashboard")}
            className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.02]"
          >
            Ir al Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-6">
        <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        <h2 className="text-xl font-medium text-zinc-300 animate-pulse tracking-wide">Configurando tu espacio...</h2>
      </div>
    );
  }

  // Render Questions
  if (customStep === "questions") {
    const currentQuestion = questions[currentStep];
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

        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
          <div className="w-full space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase border border-white/10 px-3 py-1 rounded-full">
                Paso {currentStep + 1} / {totalSteps}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                {currentQuestion.title}
              </h1>
              <p className="text-xl text-zinc-400 font-light">
                {currentQuestion.description}
              </p>
            </div>

            <div className="grid gap-3 pt-4">
              <AnimatePresence mode="wait">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "flex items-center justify-between w-full p-6 text-left border rounded-2xl transition-all duration-300 group backdrop-blur-sm",
                      answers[currentQuestion.id]?.value === option.value
                        ? "border-white bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    )}
                  >
                    <span className={cn(
                      "text-lg font-medium transition-colors",
                      answers[currentQuestion.id]?.value === option.value ? "text-white" : "text-zinc-300 group-hover:text-white"
                    )}>
                      {option.label}
                    </span>
                    {answers[currentQuestion.id]?.value === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-6 w-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <Check className="h-3.5 w-3.5 text-black" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-8 flex justify-between items-center border-t border-white/5 mt-8">
              <Button
                variant="ghost"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="text-zinc-500 hover:text-white hover:bg-transparent pl-0 transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
                Atrás
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Company Name Step
  if (customStep === "company") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full space-y-8"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase border border-white/10 px-3 py-1 rounded-full">
              Configuración
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              ¿Cómo se llama tu empresa?
            </h1>
            <p className="text-xl text-zinc-400 font-light">
              Crearemos un espacio de trabajo dedicado para tu organización.
            </p>
          </div>

          <form onSubmit={handleCompanySubmit} className="space-y-8">
            <Input
              autoFocus
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ej. Logística Global S.A.S"
              className="h-16 text-2xl bg-transparent border-b-2 border-white/20 border-t-0 border-x-0 rounded-none focus-visible:ring-0 focus-visible:border-white px-0 placeholder:text-zinc-700 transition-colors"
            />
            
            <div className="flex justify-between items-center pt-4">
               <Button
                type="button"
                variant="ghost"
                onClick={() => setCustomStep("questions")} // Go back to last question
                className="text-zinc-500 hover:text-white hover:bg-transparent pl-0 transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
                Atrás
              </Button>
              <Button 
                type="submit"
                disabled={!companyName.trim()}
                className="bg-white text-black hover:bg-zinc-200 rounded-full h-12 px-8 font-bold disabled:opacity-50"
              >
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Add Users Step
  if (customStep === "users") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full space-y-8"
        >
          <div className="space-y-4">
             <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase border border-white/10 px-3 py-1 rounded-full">
              Equipo
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Invita a tu equipo
            </h1>
            <p className="text-xl text-zinc-400 font-light">
              Agrega los correos de tus colaboradores clave. Puedes hacerlo más tarde también.
            </p>
          </div>

          <div className="space-y-6">
            <form onSubmit={handleAddUser} className="flex gap-3">
              <Input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="colaborador@empresa.com"
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 rounded-xl focus-visible:ring-1 focus-visible:ring-white/20"
              />
              <Button 
                type="submit"
                disabled={!newUserEmail.trim()}
                className="h-12 w-12 rounded-xl bg-white text-black hover:bg-zinc-200 p-0 shrink-0"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </form>

            <div className="space-y-2">
              <AnimatePresence>
                {users.map((user) => (
                  <motion.div
                    key={user}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                        {user.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-zinc-300">{user}</span>
                    </div>
                    <button 
                      onClick={() => removeUser(user)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {users.length === 0 && (
                <div className="text-center py-4 text-zinc-600 text-sm italic">
                  No has agregado usuarios aún.
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center pt-8 border-t border-white/5">
               <Button
                type="button"
                variant="ghost"
                onClick={() => setCustomStep("company")} 
                className="text-zinc-500 hover:text-white hover:bg-transparent pl-0 transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
                Atrás
              </Button>
              <Button 
                onClick={handleFinishOnboarding}
                className="bg-white text-black hover:bg-zinc-200 rounded-full h-12 px-8 font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {users.length > 0 ? "Finalizar invitación" : "Omitir por ahora"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null; // Should not reach here
}
