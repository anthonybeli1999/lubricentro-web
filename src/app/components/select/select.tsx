import React from 'react'

export default function Select({ value, onChange, opciones, disabled }: any) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className='p-1.5 border-b-2 border-gray-400 focus:border-blue-600 outline-none w-full'
    >
      <option value="">Seleccione una opción</option>
      {opciones?.map((cliente: any) => (
        <option key={cliente.id} value={cliente.id}>
          {cliente.Nombre}
        </option>
      ))}
    </select>
  )
}
