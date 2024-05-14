'use client'

import ButtonIcon from '@/app/components/button/buttonIcon'
import Paginacion from '@/app/components/paginacion/paginacion';
import { buscarVehiculos, obtenerVehiculos } from '@/app/services/vehiculosService';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Vehiculos() {
  const [paginaActual, setPaginaActual] = useState(1);
  const router = useRouter();
  const [vehiculos, setVehiculos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [vehiculosPorPagina, setVehiculosPorPagina] = useState(5);


  const listarVehiculos = async () => {
    setVehiculos(await obtenerVehiculos());
  }

  const buscarVehiculosPorPlacaCliente = async (parametro: any) => {
    setVehiculos(await buscarVehiculos(parametro));
  }

  const editarVehiculo = async(vehiculo: any)  => {
    router.push('/admin/Vehiculos/modificarVehiculo');
    localStorage.setItem('vehiculo', JSON.stringify(vehiculo));
  }

  const verServicios = async(vehiculo: any)  => {
    router.push('/admin/Servicios');
    localStorage.setItem('vehiculo', JSON.stringify(vehiculo));
  }
  
  useEffect(() => {
    listarVehiculos()
  }, [])

  const indiceUltimoVehiculo = paginaActual * vehiculosPorPagina;
  const indicePrimerVehiculo = indiceUltimoVehiculo - vehiculosPorPagina;
  const vehiculosActuales = vehiculos.slice(indicePrimerVehiculo, indiceUltimoVehiculo);

  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex justify-between items-center pt-4 pb-2">
        <h1 className="text-lg lg:text-xl font-semibold">Listado de Vehiculos</h1>
        <ButtonIcon texto='Nuevo' icono={<PlusIcon className="w-5" />} onClick={() => router.push('/admin/Vehiculos/agregarVehiculo')} />
      </div>
      <div className="bg-white rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center pb-4">
          <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
            <h1 className="text-lg sm:mr-4">Buscar: </h1>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} type="text" placeholder="Placa o cliente" className="ml-2 border-b border-gray-400 focus:border-blue-600 outline-none" />
          </div>
          <div>
            <ButtonIcon texto='Buscar' icono={<MagnifyingGlassIcon className="w-5" />} onClick={() => buscarVehiculosPorPlacaCliente(busqueda)} />
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
            <thead className="text-sm text-white uppercase bg-blue-600 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Placa
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
                </th>
                <th scope="col" className="px-6 py-3">
                  Modelo
                </th>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Documento
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {vehiculosActuales.map((vehiculo: any) => (
                <tr key={vehiculo.id} className="odd:bg-white even:bg-gray-100 text-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {vehiculo.id}
                  </th>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500" onClick={() => verServicios(vehiculo)}>
                      {vehiculo.Placa}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.Marca}
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.Modelo}
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.cliente.Nombre}
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.cliente.Documento}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500" onClick={() => editarVehiculo(vehiculo)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginacion 
          paginaActual={paginaActual} 
          setPaginaActual={setPaginaActual} 
          datos={vehiculos} 
          indiceUltimoDato={indiceUltimoVehiculo} 
        />
      </div>
    </div>
  )
}
