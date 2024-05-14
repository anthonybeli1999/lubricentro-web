import Link from 'next/link'
import React from 'react'

export default function NavbarDropdownItem({ruta, texto} : any) {
  return (
    <Link href={ruta} className="text-gray-500 block px-4 py-4 text-xl md:text-lg hover:bg-gray-100 w-full text-left" role="menuitem">
      {texto}
    </Link>
  )
}
