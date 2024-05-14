'use client'

import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { buscarClientes, obtenerClientes } from "@/app/services/clientesService";
import ButtonIcon from "@/app/components/button/buttonIcon";
import Paginacion from "@/app/components/paginacion/paginacion";

export default function Clientes() {
    const [paginaActual, setPaginaActual] = useState(1);
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [clientesPorPagina, setClientesPorPagina] = useState(5);

    const listarClientes = async () => {
        setClientes(await obtenerClientes());
    }

    const buscarClientesPorDocumentoNombre = async (parametro: any) => {
        setClientes(await buscarClientes(parametro));
    }

    const editarCliente = async(cliente: any)  => {
        router.push('/admin/Clientes/modificarCliente');
        localStorage.setItem('cliente', JSON.stringify(cliente));
    }

    useEffect(() => {
        listarClientes()
    }, [])

    const indiceUltimoCliente = paginaActual * clientesPorPagina;
    const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
    const clientesActuales = clientes.slice(indicePrimerCliente, indiceUltimoCliente);

    return (
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
            <div className="flex justify-between items-center pt-4 pb-2">
                <h1 className="text-lg lg:text-xl font-semibold">Listado de Clientes</h1>
                <ButtonIcon texto='Nuevo' icono={<PlusIcon className="w-5" />} onClick={() => router.push('/admin/Clientes/agregarCliente')} />
            </div>
            <div className="bg-white rounded-lg p-6">
                <div className="flex flex-col sm:flex-row items-center pb-4">
                    <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
                        <h1 className="text-lg sm:mr-4">Buscar: </h1>
                        <input value={busqueda} onChange={e => setBusqueda(e.target.value)} type="text" placeholder="Documento o nombre" className="ml-2 border-b border-gray-400 focus:border-blue-600 outline-none" />
                    </div>
                    <div>
                        <ButtonIcon texto='Buscar' icono={<MagnifyingGlassIcon className="w-5" />} onClick={() => buscarClientesPorDocumentoNombre(busqueda)} />
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
                                    Documento
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Celular
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Correo
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Acción
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesActuales.map((cliente: any) => (
                            <tr key={cliente.id} className="odd:bg-white even:bg-gray-100 text-gray-900">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {cliente.id}
                                </th>
                                <td className="px-6 py-4">
                                {cliente.Documento}
                                </td>
                                <td className="px-6 py-4">
                                {cliente.Nombre}
                                </td>
                                <td className="px-6 py-4">
                                {cliente.Celular}
                                </td>
                                <td className="px-6 py-4">
                                {cliente.Correo}
                                </td>
                                <td className="px-6 py-4">
                                <button className="font-medium text-blue-600 dark:text-blue-500" onClick={() => editarCliente(cliente)}>
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
                    datos={clientes} 
                    indiceUltimoDato={indiceUltimoCliente} 
                />
            </div>
        </div>
    )
}
