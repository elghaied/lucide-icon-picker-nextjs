"use client"
import LucideIconSelector from "@/components/LucidePicker";
import Icon from "@/components/LucidePicker/Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useState } from "react";


export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">

    <h1 className="text-3xl font-bold text-center">Lucide Icon Picker</h1>
    <div className=" max-w-2xl mx-auto">
      <LucideIconSelector 
        onSelectIcon={(iconName) => {
          setSelectedIcon(iconName)
        }} 
      />
      
      {selectedIcon && (
        <div className="text-center font-medium">
          <p>Selected Icon: {selectedIcon}</p>
          <div className="flex justify-center mt-2">
            <Icon 
              name={selectedIcon as keyof typeof dynamicIconImports} 
              size={24} 
              aria-hidden="true" 
            />
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
