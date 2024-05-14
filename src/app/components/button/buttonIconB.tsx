import React from 'react'

export default function ButtonIconB({onClick, texto, icono}: any) {
  return (
    <button type="button" 
        className="flex focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onClick}>    
            {icono && <span className='mr-2'>{icono}</span>}
            {texto}
    </button>
  )
}
