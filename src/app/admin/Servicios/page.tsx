'use client'

import ButtonIcon from '@/app/components/button/buttonIcon'
import Paginacion from '@/app/components/paginacion/paginacion';
import { buscarServicios } from '@/app/services/serviciosService';
import { buscarVehiculos } from '@/app/services/vehiculosService';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Servicios() {
  const [paginaActual, setPaginaActual] = useState(1);
  const router = useRouter()
  const [vehiculoSeleccionado, setvehiculoSeleccionado] = useState({
    id: '',
    placa: '',
    tipo: '',
    marca: '',
    modelo: '',
    anio: '',
    servicios: [{}]
  })
  const [serviciosPorPagina, setServiciosPorPagina] = useState(5);

  const editarServicio = async(servicio: any)  => {
    router.push('/admin/Servicios/modificarServicio');
    localStorage.setItem('servicio', JSON.stringify(servicio));
  }

  const buscarServiciosPorId = async (parametro: any) => {
    const servicios = await buscarServicios(parametro);
    setvehiculoSeleccionado(prevVehiculoSeleccionado => ({
      ...prevVehiculoSeleccionado,
      servicios: servicios
    }));
  }

  useEffect(() => {
    const vehiculoString = localStorage.getItem('vehiculo');
    if (vehiculoString) {
      const vehiculoObj = JSON.parse(vehiculoString);
      setvehiculoSeleccionado({
        ...vehiculoSeleccionado,
        id: vehiculoObj.id,
        placa: vehiculoObj.Placa,
        tipo: vehiculoObj.Tipo,
        marca: vehiculoObj.Marca,
        modelo: vehiculoObj.Modelo,
        anio: vehiculoObj.Anio
      });
      buscarServiciosPorId(vehiculoObj.id)
    }
  }, []);

  const indiceUltimoServicio = paginaActual * serviciosPorPagina;
  const indicePrimerServicio = indiceUltimoServicio - serviciosPorPagina;
  const serviciosActuales = vehiculoSeleccionado.servicios.slice(indicePrimerServicio, indiceUltimoServicio);

  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex justify-between items-center pt-4 pb-2">
        <h1 className="text-lg lg:text-xl font-semibold">
          Listado de Servicios / <span className='font-black'>{vehiculoSeleccionado.placa}</span>
        </h1>
        <ButtonIcon texto='Nuevo' icono={<PlusIcon className="w-5" />} onClick={() => router.push('/admin/Servicios/agregarServicio')} />
      </div>
      <div className="bg-white rounded-lg p-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
            <thead className="text-sm text-white uppercase bg-blue-600 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Servicio
                </th>
                <th scope="col" className="px-6 py-3">
                  KmA
                </th>
                <th scope="col" className="px-6 py-3">
                  KmPC
                </th>
                <th scope="col" className="px-6 py-3">
                  Monto
                </th>
                <th scope="col" className="px-6 py-3">
                  Pago
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {serviciosActuales.map((servicio: any, index: any) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100 text-gray-900">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {servicio.id}
                  </th>
                  <td className="px-6 py-4">
                    {servicio.FechaFormateada}
                  </td>
                  <td className="px-6 py-4">
                    {servicio.Tipo}
                  </td>
                  <td className="px-6 py-4">
                    {servicio.Servicio}
                  </td>
                  <td className="px-6 py-4">
                    {Number(servicio.KmA).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {Number(servicio.KmPC).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    S/. {servicio.Monto}
                  </td>
                  <td className={`px-6 py-4 ${servicio.EstadoPago === 'D' ? 'text-red-500' : 'text-green-500'}`}>
                    {servicio.EstadoPago === 'D' ? 'Deuda' : 'Pagado'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500" onClick={() => editarServicio(servicio)}>
                      Ver / Editar
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
          datos={vehiculoSeleccionado.servicios} 
          indiceUltimoDato={indiceUltimoServicio} 
        />
      </div>

    </div>
  )
}
