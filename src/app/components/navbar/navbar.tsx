'use client'

import React, { useState } from 'react'
import NavbarItem from './navbarItem'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import { UserIcon } from '@heroicons/react/24/outline'
import { TruckIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className='w-full shadow-md'>
      <div className='flex py-2 md:py-4 max-w-7xl mx-auto'>
        <div className="flex md:hidden px-4">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-8 h-7" />          
            ) : (
              <Bars3Icon className="w-8 h-7"/>
            )}
          </button>
        </div>
        <div className="text-center hidden md:block">
          <div className='flex text-gray-400'>
            <NavbarItem ruta='/admin/Clientes' texto='Clientes' icono={<UserIcon className="w-7"/>}/>
            <NavbarItem ruta='/admin/Vehiculos' texto='Vehiculos' icono={<TruckIcon className="w-7"/>}/>
            {
              /*
              <NavbarItem ruta='https://www.google.com/' texto='Vehiculos' icono={<ShoppingCartIcon className="w-7"/>}/>
              <NavbarDropdown texto='Caja' icono={<ComputerDesktopIcon className="w-7"/>}>
                <NavbarDropdownItem ruta='https://www.google.com/' texto='Interna' />
                <NavbarDropdownItem ruta='https://www.google.com/' texto='Externa' />
              </NavbarDropdown>
              <NavbarItem ruta='https://www.google.com/' texto='Pagos/Cobranzas' icono={<CurrencyDollarIcon className="w-7"/>}/>
              <NavbarItem ruta='https://www.google.com/' texto='Consultas' icono={<QueueListIcon className="w-7"/>}/>
              <NavbarItem ruta='https://www.google.com/' texto='Reportes' icono={<ChartBarSquareIcon className="w-7"/>}/>
              <NavbarItem ruta='https://www.google.com/' texto='Soporte' icono={<Cog6ToothIcon className="w-7"/>}/>
              */
            }
          </div>
        </div>
        {isMobileMenuOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0">
            <div
              onClick={toggleMobileMenu}
              className="absolute inset-0 bg-gray-600 opacity-75"
            ></div>
          </div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="grid grid-cols-1 p-4 text-gray-400">
              <h1 className="p-4 text-2xl font-bold text-center">Menu principal</h1>
              <div className='py-2'><NavbarItem ruta='/admin/Clientes' texto='Clientes' icono={<UserIcon className="w-7"/>}/></div>
              <div className='py-2'><NavbarItem ruta='/admin/Vehiculos' texto='Vehiculos' icono={<TruckIcon className="w-7"/>}/></div>
              {
                /*
                <div className='py-2'>
                  <NavbarDropdown texto='Caja' icono={<ComputerDesktopIcon className="w-7"/>}>
                    <NavbarDropdownItem ruta='https://www.google.com/' texto='Interna' />
                    <NavbarDropdownItem ruta='https://www.google.com/' texto='Externa' />
                  </NavbarDropdown>
                </div>
                <div className='py-2'><NavbarItem ruta='https://www.google.com/' texto='Pagos/Cobranzas' icono={<CurrencyDollarIcon className="w-7"/>}/></div>
                <div className='py-2'><NavbarItem ruta='https://www.google.com/' texto='Consultas' icono={<QueueListIcon className="w-7"/>}/></div>
                <div className='py-2'><NavbarItem ruta='https://www.google.com/' texto='Reportes' icono={<ChartBarSquareIcon className="w-7"/>}/></div>
                <div className='py-2'><NavbarItem ruta='https://www.google.com/' texto='Soporte' icono={<Cog6ToothIcon className="w-7"/>}/></div>                    
                */
              }
            </div>
          </div>
        </div>
        )}
      </div>
    </nav>
  )
}
