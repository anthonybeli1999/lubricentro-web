import React from 'react'

export default function ButtonIconR({onClick, texto, icono}: any) {
  return (
    <button type="button" 
        className="flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        onClick={onClick}>    
            {icono && <span className='mr-2'>{icono}</span>}
            {texto}
    </button>
  )
}
