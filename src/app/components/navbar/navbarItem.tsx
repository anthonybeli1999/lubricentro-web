import Link from 'next/link'
import React from 'react'

export default function NavbarItem({ ruta, texto, icono } : any) {
  return (
    <Link href={ruta} className="hover:text-blue-600 flex px-6 py-2 rounded-md text-xl md:text-lg font-medium">
      {icono && <span className='mr-2'>{icono}</span>}
      {texto}
    </Link>
  )
}
