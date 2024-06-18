'use client'
import React from "react";

export default function Home() {
  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex justify-between items-center pt-4 pb-2">
        <h1 className="text-lg lg:text-xl font-semibold">Inicio</h1>
      </div>
      <div className="bg-white rounded-lg p-6">
        Bienvenidos al sistema de gestión Jachito
      </div>
    </div>
  );
}
