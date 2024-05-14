import React from 'react'

export default function ErrorAlert() {
  return (
    <div className='bg-red-200 text-red-500 flex text-sm mx-4 mb-6 border-2 border-red-300 rounded-lg px-4 py-2'>
        <span>
          <strong>¡Alerta!</strong> - Completa todos los campos por favor.   
        </span>
    </div>
  )
}
