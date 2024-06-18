'use client'

import ErrorAlert from '@/app/components/alerts/errorAlert';
import ButtonIcon from '@/app/components/button/buttonIcon'
import ButtonPrimary from '@/app/components/button/buttonPrimary';
import InputText from '@/app/components/input/inputText';
import TextoInput from '@/app/components/label/textoInput';
import TextoLabel from '@/app/components/label/textoLabel';
import Paginacion from '@/app/components/paginacion/paginacion';
import Select from '@/app/components/select/select';
import { obtenerMarcas } from '@/app/services/marcasService';
import { obtenerModelosPorMarca } from '@/app/services/modelosService';
import { agregarNuevoVehiculo, buscarVehiculos, eliminarVehiculo, modificarVehiculo, obtenerVehiculos } from '@/app/services/vehiculosService';
import { CurrencyDollarIcon, PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Vehiculos() {
  const [paginaActual, setPaginaActual] = useState(1);
  const router = useRouter();
  const [vehiculos, setVehiculos] = useState([]);

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const [busqueda, setBusqueda] = useState('');
  const [vehiculosPorPagina, setVehiculosPorPagina] = useState(5);

  const listarVehiculos = async () => {
    setVehiculos(await obtenerVehiculos());
  }

  const listarMarcas = async () => {
    setMarcas(await obtenerMarcas());
  }

  const buscarVehiculosPorPlacaCliente = async (parametro: any) => {
    setVehiculos(await buscarVehiculos(parametro));
  }

  const aeditarVehiculo = async(vehiculo: any)  => {
    router.push('/admin/Vehiculos/modificarVehiculo');
    localStorage.setItem('vehiculo', JSON.stringify(vehiculo));
  }

  const verServicios = async(vehiculo: any)  => {
    router.push('/admin/Servicios');
    localStorage.setItem('vehiculo', JSON.stringify(vehiculo));
  }
  
  useEffect(() => {
    listarMarcas()
    listarVehiculos()
  }, [])

  const [campos, setCampos] = useState({
    id: '',
    placa: '',
    marcaId: '',
    modeloId: '',
    anio: '',
    tipo: '',
    cliente: '',
    celular: ''
  })

  const validarCampos = () => {
    return !(!campos.placa || !campos.modeloId
    )
  }
  const [mostrarAlerta, setMostrarAlerta] = useState(false)
  
  const verAlerta = () => {
    setMostrarAlerta(!mostrarAlerta)
  }

  const agregarVehiculo = async () => {
    if (!validarCampos()) {
      verAlerta();
      return;
    }
    const body = {
      Placa: campos.placa,
      modeloId: campos.modeloId,
      Anio: campos.anio,
      Tipo: campos.tipo,
      Cliente: campos.cliente,
      Celular: campos.celular,
    }
    
    if(campos.id !== '') {
      const respuesta = await modificarVehiculo({
        ...body,
        id: parseInt(campos.id),
      });
      if (respuesta) {
        alert('La información fue guardada correctamente');
        limpiarCampos()
        listarVehiculos()
      } else {
        alert('Algo salió mal al agregar el vehiculo');
      }
    } else {
      const respuesta = await agregarNuevoVehiculo({
        ...body,
        Fecha: new Date(),
      });
      if (respuesta) {
        alert('La información fue guardada correctamente');
        limpiarCampos()
        listarVehiculos()
      } else {
        alert('Algo salió mal al agregar el vehiculo');
      }
    }
  }

  const limpiarCampos = () => {
    setCampos({
      id: '',
      placa: '',
      marcaId: '',
      modeloId: '',
      anio: '',
      tipo: '',
      cliente: '',
      celular: ''
    });
  }

  const handleChangeCampo = (campo: any, valor: any) => {
    setCampos({
      ...campos,
      [campo]: valor
    });
  }

  const quitarVehiculo = async (vehiculo: any) => {
    if (window.confirm('¿Estás seguro de querer eliminar este vehículo?')) {
      const body = {
        id: vehiculo.id,
      };
  
      try {
        const respuesta = await eliminarVehiculo(body);
        respuesta ? alert('La información fue guardada correctamente') : alert('Algo salió mal al modificar el vehículo');
        listarVehiculos();
      } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        alert('Hubo un error al intentar eliminar el vehículo');
      }
    }
  }

  const seleccionarVehiculo = (vehiculo: any) => {
    console.log(vehiculo)
    setCampos({
      id: vehiculo.id,
      placa: vehiculo.Placa,
      marcaId: vehiculo.modelo.marca.id,
      modeloId: vehiculo.modelo.id,
      anio: vehiculo.Anio,
      tipo: vehiculo.Tipo,
      cliente: vehiculo.Cliente,
      celular: vehiculo.Celular
    });
  }

  useEffect(() => {
    const obtenerYSetearModelos = async () => {
      setModelos(await obtenerModelosPorMarca(parseInt(campos.marcaId)))
    }
    obtenerYSetearModelos()
  }, [campos.marcaId]);

  const indiceUltimoVehiculo = paginaActual * vehiculosPorPagina;
  const indicePrimerVehiculo = indiceUltimoVehiculo - vehiculosPorPagina;
  const vehiculosActuales = vehiculos.slice(indicePrimerVehiculo, indiceUltimoVehiculo);

  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex items-center pt-4 pb-2 text-center">
        <h1 className="text-xl font-semibold w-full">AGREGAR VEHÍCULO</h1>
      </div>

      <div className="bg-white rounded-lg p-6 relative" onClick={() => !mostrarAlerta ? '' : verAlerta()}>
        {mostrarAlerta && ( <ErrorAlert /> )}
        <div className="flex justify-center md:gap-4 flex-col md:flex-row md:pb-6">
          <div className='flex flex-col md:flex-row items-center mb-4 md:mb-0'>
            <TextoLabel texto={'Placa(*)'} />
            <InputText
              value={campos.placa} disabled={false} placeholder={'Placa'}
              onChange={(e:any) => handleChangeCampo('placa', e.target.value)}
            />
          </div>
          <div className='flex flex-col md:flex-row items-center mb-4 md:mb-0'>
            <TextoLabel texto={'Marca'} />
            <Select
              value={campos.marcaId}
              onChange={(e:any) => handleChangeCampo('marcaId', e.target.value)}
              opciones={marcas}
            />
          </div>
        </div>
        <div className="flex justify-center md:gap-4 flex-col md:flex-row md:pb-6">
          <div className='flex flex-col items-center mb-4 md:mb-0'>
            <TextoInput texto={'Modelo'} />
            <Select
              value={campos.modeloId}
              onChange={(e:any) => handleChangeCampo('modeloId', e.target.value)}
              opciones={modelos}
            />
            </div>
            <div className='flex flex-col items-center mb-4 md:mb-0'>
            <TextoInput texto={'Año'} />
            <InputText
              value={campos.anio} disabled={false} placeholder={'Año'}
              onChange={(e:any) => handleChangeCampo('anio', e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center mb-4 md:mb-0'>
            <TextoInput texto={'Tipo de vehículo'} />
            <InputText
              value={campos.tipo} disabled={false} placeholder={'Tipo'}
              onChange={(e:any) => handleChangeCampo('tipo', e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center mb-4 md:mb-0'>
            <TextoInput texto={'Cliente'} />
            <InputText
              value={campos.cliente} disabled={false} placeholder={'Cliente'}
              onChange={(e:any) => handleChangeCampo('cliente', e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center mb-4 md:mb-0'>
            <TextoInput texto={'Celular'} />
            <InputText
              value={campos.celular} disabled={false} placeholder={'Celular'}
              onChange={(e:any) => handleChangeCampo('celular', e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center md:gap-8 flex-col md:flex-row">
          <div className='flex flex-col md:flex-row items-center mb-4 md:mb-0'>
            <button onClick={() => limpiarCampos()} className='font-bold'>Limpiar</button>
          </div>
          <div className='flex flex-col md:flex-row items-center md:mb-0'>
            <ButtonPrimary texto='Registrar' onClick={() => agregarVehiculo()} />
          </div>
        </div>

      </div>

      <div className="bg-white rounded-lg p-6">   
        <div className="flex flex-col sm:flex-row pb-4">
          <div className='mb-2 lg:mb-0'>
            <h1 className="text-lg mr-2">Buscar</h1>
          </div>
          <div className='mb-2 lg:mb-0 mr-2'>
            <InputText
              value={busqueda} disabled={false} placeholder={'Escribe aquí'}
              onChange={(e:any) => setBusqueda(e.target.value)}
            />
          </div>
          <div>
            <ButtonIcon texto='Buscar' icono={<MagnifyingGlassIcon className="w-5" />} onClick={() => buscarVehiculosPorPlacaCliente(busqueda)} />
          </div>
        </div>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
            <thead className="text-sm text-white uppercase bg-blue-600 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Fecha
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
                  Celular
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {vehiculosActuales.map((vehiculo: any) => (
                <tr key={vehiculo.id} className="odd:bg-white even:bg-gray-100 text-gray-900 text-center">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {vehiculo.FechaFormateada}
                  </th>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500" onClick={() => verServicios(vehiculo)}>
                      {vehiculo.Placa}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.modelo.marca.Nombre}
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.modelo.Nombre}
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.Cliente}
                  </td>
                  <td className="px-6 py-4">
                    {vehiculo.Celular}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-1">
                    <button className='text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-lg' onClick={() => seleccionarVehiculo(vehiculo)}>
                      <PencilIcon width={24} height={24} />
                    </button>
                    <div className={`text-white p-1 rounded-lg ${vehiculo.TieneDeudas === 'Si' ? 'bg-red-700' : 'bg-green-600'}`}>
                      <CurrencyDollarIcon width={24} height={24} />
                    </div>
                    <button className='text-white bg-gray-600 hover:bg-gray-700 p-1 rounded-lg' onClick={() => quitarVehiculo(vehiculo)}>
                      <TrashIcon width={24} height={24} />
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
