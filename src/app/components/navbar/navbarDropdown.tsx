import React, { useState } from 'react'

export default function NavbarDropdown({children, texto, icono} : any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex hover:text-blue-600 px-6 py-2 rounded-md text-xl md:text-lg font-medium w-full">
        {icono && <span className='mr-2'>{icono}</span>}
        {texto}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute left-0 mt-0 mx-4 lg:mt-2 w-48 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {children}
        </div>
      )}
  </div>
  )
}
