'use client'
import ErrorAlert from '@/app/components/alerts/errorAlert'
import ButtonIcon from '@/app/components/button/buttonIcon'
import ButtonIconR from '@/app/components/button/buttonIconR'
import InputNumber from '@/app/components/input/inputNumber'
import InputText from '@/app/components/input/inputText'
import TextoInput from '@/app/components/label/textoInput'
import Select from '@/app/components/select/select'
import SelectValue from '@/app/components/select/selectValue'
import { buscarClientes, modificarCliente, obtenerClientes } from '@/app/services/clientesService'
import { modificarVehiculo } from '@/app/services/vehiculosService'
import { CheckIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/esm/MagnifyingGlassIcon'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ModificarVehiculo() {
  const router = useRouter();
  const [paginaActual, setPaginaActual] = useState(1);
  const [clientes, setClientes] = useState([])
  const [clientesPorPagina, setClientesPorPagina] = useState(2)
  const [busqueda, setBusqueda] = useState('')
  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    id: '',
    documento: ''
  })
  const [campos, setCampos] = useState({
    id: '',
    placa: '',
    tipo: '',
    marca: '',
    modelo: '',
    anio: '',
    idcliente: '',
    documento: ''
  })
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const marcasAutos = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mazda",
    "Subaru",
    "Lexus",
    "Volvo",
    "Jeep",
    "Tesla",
    "Ferrari",
    "Porsche",
    "Land Rover"
  ]

  const tiposAutos = [
    "Sedan",
    "SUV",
    "Coupe",
    "Furgoneta",
    "Camioneta",
    "Hatchback",
    "Convertible",
    "Pickup",
    "Minivan",
    "Deportivo",
    "Furgon",
    "Camion",
    "Microauto",
    "Descapotable",
    "Todo terreno",
    "Electrico",
    "Hibrido"
  ]

  const listarClientes = async () => {
    setClientes(await obtenerClientes());
  }

  const handleChangeCampo = (campo: any, valor: any) => {
    setCampos({
      ...campos,
      [campo]: valor
    });
  }

  const verAlerta = () => {
    setMostrarAlerta(!mostrarAlerta)
  }
  
  const modificarVehiculoSeleccionado= async () => {
    if (!validarCampos()) {
      verAlerta();
      return;
    }
    const body = {
      id: campos.id,
      Placa: campos.placa,
      Tipo: campos.tipo,
      Marca: campos.marca,
      Modelo: campos.modelo,
      Anio: campos.anio,
      clienteId: parseInt(clienteSeleccionado.id)
    }
    const respuesta = await modificarVehiculo(body);
    if (respuesta) {
      alert('La información fue guardada correctamente');
      router.push('/admin/Vehiculos');
      localStorage.removeItem('vehiculo');
    } else {
      alert('Algo salió mal al modificar el vehiculo');
    }
  }

  const buscarClientesPorDocumentoNombre = async (parametro: any) => {
    setClientes(await buscarClientes(parametro));
  }

  const validarCampos = () => {
    return !(!campos.id || !campos.placa || !campos.tipo 
      || !campos.marca || !campos.modelo || !campos.idcliente
    )
  }

  const indiceUltimoCliente = paginaActual * clientesPorPagina;
  const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesActuales = clientes.slice(indicePrimerCliente, indiceUltimoCliente);
  
  const seleccionarCliente = (cliente: any) => {
    setClienteSeleccionado({
      id: cliente.id,
      documento: cliente.Documento
    })
    setCampos(prevCampos => ({
      ...prevCampos,
      idcliente: cliente.documento
    }))
  }

  useEffect(() => {
    const vehiculoString = localStorage.getItem('vehiculo');
    if (vehiculoString) {
      const vehiculoObj = JSON.parse(vehiculoString);
      setCampos({
        ...campos,
        id: vehiculoObj.id,
        placa: vehiculoObj.Placa,
        tipo: vehiculoObj.Tipo,
        marca: vehiculoObj.Marca,
        modelo: vehiculoObj.Modelo,
        anio: vehiculoObj.Anio,
        idcliente: vehiculoObj.cliente.Documento,
      })
      setClienteSeleccionado({
        id: vehiculoObj.clienteId,
        documento: vehiculoObj.cliente.Documento
      })
    }
  }, []);

  useEffect(() => {
    listarClientes()
  }, [])

  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex justify-between items-center pt-4 pb-2">
        <h1 className="text-lg lg:text-xl font-semibold">Modificar vehiculo</h1>
      </div>


      <div className="bg-white rounded-lg p-6 mb-2">
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
                    {clientesActuales?.map((cliente: any) => (
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
                        <button className="font-medium text-blue-600 dark:text-blue-500" onClick={() => seleccionarCliente(cliente)}>
                            Seleccionar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
          </div>


      </div>

      <div className="bg-white rounded-lg p-6" onClick={() => !mostrarAlerta ? '' : verAlerta()}>
        {mostrarAlerta && ( <ErrorAlert /> )}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='text-center md:pl-4 md:pr-2 md:mt-0'>
            <TextoInput texto={'Seleccione un cliente (*)'} />
            <InputText
              disabled={true}
              value={campos.idcliente} placeholder={'Cliente'}
              onChange={(e:any) => handleChangeCampo('idcliente', e.target.value)}
            />
          </div>
          <div className='text-center md:px-2 mt-4 md:mt-0'>
            <TextoInput texto={'Placa (*)'} />
            <InputText
              value={campos.placa} placeholder={'Placa'}
              onChange={(e:any) => handleChangeCampo('placa', e.target.value)}
            />
          </div>
          <div className='text-center md:pl-2 md:pr-4 mt-4 md:mt-0'>
            <TextoInput texto={'Seleccione un tipo (*)'} />
            <SelectValue
              value={campos.tipo}
              onChange={(e:any) => handleChangeCampo('tipo', e.target.value)}
              opciones={tiposAutos}
            />
          </div>
          <div className='text-center md:pl-4 md:pr-2 mt-4 md:mt-2'>
            <TextoInput texto={'Seleccione una marca (*)'} />
            <SelectValue
              value={campos.marca}
              onChange={(e:any) => handleChangeCampo('marca', e.target.value)}
              opciones={marcasAutos}
            />
          </div>
          <div className='text-center md:px-2 mt-4 md:mt-2'>
            <TextoInput texto={'Modelo (*)'} />
            <InputText
              value={campos.modelo} placeholder={'Modelo'}
              onChange={(e:any) => handleChangeCampo('modelo', e.target.value)}
            />
          </div>
          <div className='text-center md:pl-2 md:pr-4 mt-4 md:mt-2'>
            <TextoInput texto={'Año'} />
            <InputNumber
              value={campos.anio} placeholder={'Anio'}
              onChange={(e:any) => handleChangeCampo('anio', e.target.value)}
            />
          </div>
        </div>
        <div className='grid md:flex mt-8 mb-4 justify-center'>
          <ButtonIcon texto='Guardar' icono={<CheckIcon className="w-5" />} onClick={() => modificarVehiculoSeleccionado()} />
          <div className='mt-2 md:mt-0'>
            <ButtonIconR texto='Cancelar' icono={<XMarkIcon className="w-5" />} onClick={() => router.push('/admin/Vehiculos')} />
          </div>
        </div>
      </div>
    </div>
  )
}
