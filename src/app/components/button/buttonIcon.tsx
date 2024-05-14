import React from 'react'

export default function ButtonIcon({onClick, texto, icono}: any) {
  return (
    <button type="button" 
        className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={onClick}>    
            {icono && <span className='mr-2'>{icono}</span>}
            {texto}
    </button>
  )
}
