 "use client";

 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Button } from "@/components/ui/button";

 export default function ProfilePage() {
   return (
     <div className="w-full max-w-xl mx-auto">
       <div className="mb-6">
         <h1 className="text-2xl font-bold tracking-tight">
           Configuración de perfil
         </h1>
         <p className="text-sm text-muted-foreground">
           Actualiza la información básica de tu cuenta.
         </p>
       </div>
       <div className="space-y-4 rounded-lg border bg-card p-6">
         <div className="grid gap-2">
           <Label htmlFor="name">Nombre</Label>
           <Input id="name" placeholder="Tu nombre" />
         </div>
         <div className="grid gap-2">
           <Label htmlFor="email">Correo electrónico</Label>
           <Input id="email" type="email" placeholder="tu@empresa.com" />
         </div>
         <div className="flex justify-end pt-2">
           <Button>
             Guardar cambios
           </Button>
         </div>
       </div>
     </div>
   );
 }
