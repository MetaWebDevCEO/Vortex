"use client";

import { useState } from "react";
import { 
  Box, 
  Trash2, 
  Plus, 
  Truck, 
  Container, 
  Calculator,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Tipos
type Item = {
  id: string;
  name: string;
  length: number; // cm
  width: number; // cm
  height: number; // cm
  weight: number; // kg
  quantity: number;
};

type ContainerType = {
  name: string;
  volume: number; // m3
  maxWeight: number; // kg
  length: number; // m
  width: number; // m
  height: number; // m
};

const CONTAINERS: ContainerType[] = [
  { name: "20' Standard", volume: 33.1, maxWeight: 28200, length: 5.89, width: 2.35, height: 2.39 },
  { name: "40' Standard", volume: 67.5, maxWeight: 26600, length: 12.03, width: 2.35, height: 2.39 },
  { name: "40' High Cube", volume: 76.1, maxWeight: 26460, length: 12.03, width: 2.35, height: 2.69 },
];

export default function CubicajePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Partial<Item>>({
    name: "",
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    quantity: 1
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.length || !newItem.width || !newItem.height || !newItem.weight || !newItem.quantity) return;

    const item: Item = {
      id: Math.random().toString(36).substr(2, 9),
      name: newItem.name,
      length: Number(newItem.length),
      width: Number(newItem.width),
      height: Number(newItem.height),
      weight: Number(newItem.weight),
      quantity: Number(newItem.quantity)
    };

    setItems([...items, item]);
    setNewItem({ name: "", length: 0, width: 0, height: 0, weight: 0, quantity: 1 });
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalVolume = items.reduce((acc, item) => {
    const volumeM3 = (item.length * item.width * item.height) / 1000000; // cm3 to m3
    return acc + (volumeM3 * item.quantity);
  }, 0);

  const totalWeight = items.reduce((acc, item) => {
    return acc + (item.weight * item.quantity);
  }, 0);

  const totalPackages = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cubicaje y Consolidación</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Box className="mr-2 h-4 w-4" />
            Guardar Consolidación
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Agregar Carga</CardTitle>
            <CardDescription>
              Ingrese las dimensiones y peso de los bultos a consolidar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Descripción / SKU</Label>
                  <Input 
                    id="name" 
                    placeholder="Ej. Cajas de Zapatos" 
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="1" 
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Largo (cm)</Label>
                  <Input 
                    id="length" 
                    type="number" 
                    placeholder="0" 
                    value={newItem.length || ''}
                    onChange={(e) => setNewItem({...newItem, length: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Ancho (cm)</Label>
                  <Input 
                    id="width" 
                    type="number" 
                    placeholder="0" 
                    value={newItem.width || ''}
                    onChange={(e) => setNewItem({...newItem, width: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Alto (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="0" 
                    value={newItem.height || ''}
                    onChange={(e) => setNewItem({...newItem, height: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="0" 
                    value={newItem.weight || ''}
                    onChange={(e) => setNewItem({...newItem, weight: Number(e.target.value)})}
                  />
                </div>
              </div>

              <Button onClick={handleAddItem} className="w-full mt-2">
                <Plus className="mr-2 h-4 w-4" /> Agregar a la Lista
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Lista de Carga</h3>
              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-2 p-3 bg-muted/50 text-sm font-medium border-b">
                  <div className="col-span-4">Descripción</div>
                  <div className="col-span-2 text-center">Dims (cm)</div>
                  <div className="col-span-2 text-center">Peso (kg)</div>
                  <div className="col-span-2 text-center">Cant.</div>
                  <div className="col-span-2 text-right">Acción</div>
                </div>
                {items.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No hay items agregados.
                  </div>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 p-3 items-center text-sm border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <div className="col-span-4 font-medium">{item.name}</div>
                        <div className="col-span-2 text-center text-xs text-muted-foreground">
                          {item.length}x{item.width}x{item.height}
                        </div>
                        <div className="col-span-2 text-center">{item.weight}</div>
                        <div className="col-span-2 text-center">{item.quantity}</div>
                        <div className="col-span-2 text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Carga</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Box className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Volumen Total</span>
                  </div>
                  <span className="text-xl font-bold">{totalVolume.toFixed(2)} m³</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Peso Total</span>
                  </div>
                  <span className="text-xl font-bold">{totalWeight.toFixed(2)} kg</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Box className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Bultos Totales</span>
                  </div>
                  <span className="text-xl font-bold">{totalPackages}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ocupación Estimada</CardTitle>
              <CardDescription>Basado en volumen (sin considerar estiba)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {CONTAINERS.map((container) => {
                const percentage = Math.min((totalVolume / container.volume) * 100, 100);
                const isOverweight = totalWeight > container.maxWeight;
                
                return (
                  <div key={container.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{container.name}</span>
                      <span className={percentage > 90 ? "text-red-500 font-bold" : "text-muted-foreground"}>
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${percentage > 90 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Cap: {container.volume} m³</span>
                      <span className={isOverweight ? "text-red-500 font-bold" : ""}>
                        Max: {container.maxWeight} kg {isOverweight && "(Excedido)"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}