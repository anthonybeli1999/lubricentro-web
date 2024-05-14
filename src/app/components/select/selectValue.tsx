import React from 'react'

export default function selectValue({ value, onChange, opciones }: any) {
    return (
        <select
          value={value}
          onChange={onChange}
          className='p-1.5 border-b-2 border-gray-400 focus:border-blue-600 outline-none w-full'
        >
          <option value="">Seleccione una opción</option>
          {opciones.map((opcion: any) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      );
}
