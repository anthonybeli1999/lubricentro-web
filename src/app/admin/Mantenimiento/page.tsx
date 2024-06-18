'use client'
import ButtonIcon from '@/app/components/button/buttonIcon'
import ButtonPrimary from '@/app/components/button/buttonPrimary'
import InputText from '@/app/components/input/inputText'
import TextoLabel from '@/app/components/label/textoLabel'
import Paginacion from '@/app/components/paginacion/paginacion'
import Select from '@/app/components/select/select'
import { agregarNuevaMarca, buscarMarcas, eliminarMarca, modificarMarca, obtenerMarcas } from '@/app/services/marcasService'
import { agregarNuevoModelo, buscarModelos, eliminarModelo, modificarModelo, obtenerModelosPorMarca } from '@/app/services/modelosService'
import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

export default function Mantenimiento() {

  const [busquedaMarca, setBusquedaMarca] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  const [camposBusquedaModelo, setCamposBusquedaModelo] = useState({
    id: '',
    busqueda:''
  })

  const [camposMarca, setCamposMarca] = useState({
    id: '',
    nombre:''
  })

  const [camposModelo, setCamposModelo] = useState({
    id: '',
    modeloId: '',
    nombre:''
  })

  const buscarMarca = async () => {
    setMarcas(await buscarMarcas(busquedaMarca));
  }
  
  const buscarModelo = async () => {
    const body = {
      marcaId: camposBusquedaModelo.id,
      Nombre: camposBusquedaModelo.busqueda,
    }
    setModelos(await buscarModelos(body));
  }

  const seleccionarMarca = (marca: any) => {   
    setCamposMarca({
      id: marca.id,
      nombre: marca.Nombre
    });
  }

  const seleccionarModelo = (marca: any) => {   
    setCamposModelo({
      id: marca.id,
      modeloId: camposBusquedaModelo.id,
      nombre: marca.Nombre
    });
  }

  const validarCampos = () => {
    return !(!camposMarca.nombre
    )
  }

  const validarCamposModelo = () => {
    return !(!camposModelo.nombre
    )
  }

  const limpiarCampos = () => {
    setCamposMarca({
      id: '',
      nombre: ''
    });
    setCamposModelo({
      id: '',
      modeloId: '',
      nombre: '',
    });
  }
  
  const agregarMarca = async () => {
    if (!validarCampos()) {
      return;
    }
    const body = {
      Nombre: camposMarca.nombre,
    }
    if(camposMarca.id !== '') {
      const respuesta = await modificarMarca({
        ...body,
        id: parseInt(camposMarca.id),
      });
      if (respuesta) {
        alert('La información fue guardada correctamente');
        limpiarCampos()
        listarMarcas()
      } else {
        alert('Algo salió mal al agregar el vehiculo');
      }
    } else {
      const respuesta = await agregarNuevaMarca(body);
      if (respuesta) {
        alert('La información fue guardada correctamente');
        limpiarCampos()
        listarMarcas()
      } else {
        alert('Algo salió mal al agregar el vehiculo');
      }
    }
  }

  const agregarModelo = async () => {
    if (!validarCamposModelo()) {
      return;
    }
    const body = {
      Nombre: camposModelo.nombre,
      marcaId: parseInt(camposBusquedaModelo.id)
    }
    if(camposModelo.id !== '') {
      const respuesta = await modificarModelo({
        ...body,
        id: parseInt(camposModelo.id),
      });
      if (respuesta) {
        alert('La información fue guardada correctamente');
        limpiarCampos()
        setModelos(await obtenerModelosPorMarca(parseInt(camposBusquedaModelo.id)))
      } else {
        alert('Algo salió mal al agregar el modelo');
      }
    } else {
      const respuesta = await agregarNuevoModelo(body);
      if (respuesta) {
        alert('La información fue guardada correctamente');
        limpiarCampos()
        setModelos(await obtenerModelosPorMarca(parseInt(camposBusquedaModelo.id)))
      } else {
        alert('Algo salió mal al agregar el modelo');
      }
    }
  }

  const quitarMarca = async (marca: any) => {
    if (window.confirm('¿Estás seguro de querer eliminar esta marca?')) {
      const body = {
        id: marca.id,
      };
      try {
        const respuesta = await eliminarMarca(body);
        respuesta ? alert('La información fue guardada correctamente') : alert('Algo salió mal al modificar la marca');
        listarMarcas();
      } catch (error) {
        console.error('Error al eliminar la marca:', error);
        alert('Hubo un error al intentar eliminar la marca');
      }
    }
  }

  const quitarModelo = async (modelo: any) => {
    if (window.confirm('¿Estás seguro de querer eliminar este modelo?')) {
      const body = {
        id: modelo.id,
        Estado: 'I'
      };
      try {
        const respuesta = await eliminarModelo(body);
        respuesta ? alert('La información fue guardada correctamente') : alert('Algo salió mal al modificar la marca');
        setModelos(await obtenerModelosPorMarca(parseInt(camposBusquedaModelo.id)))
      } catch (error) {
        console.error('Error al eliminar el modelo:', error);
        alert('Hubo un error al intentar eliminar el modelo');
      }
    }
  }
  
  const listarMarcas = async () => {
    setMarcas(await obtenerMarcas());
  }

  const handleChangeCampo = (campo: any, valor: any) => {
    setCamposBusquedaModelo({
      ...camposBusquedaModelo,
      [campo]: valor
    });
  }

  const handleChangeMarca = (campo: any, valor: any) => {
    setCamposMarca({
      ...camposMarca,
      [campo]: valor
    });
  }

  const handleChangeModelo = (campo: any, valor: any) => {
    setCamposModelo({
      ...camposModelo,
      [campo]: valor
    });
  }

  useEffect(() => {
    listarMarcas()
  }, [])

  const [paginaActual, setPaginaActual] = useState(1);
  const [marcasPorPagina, setMarcasPorPagina] = useState(10);
  const indiceUltimaMarca = paginaActual * marcasPorPagina;
  const indicePrimerMarca = indiceUltimaMarca - marcasPorPagina;
  const marcasActuales = marcas.slice(indicePrimerMarca, indiceUltimaMarca);

  const [paginaActualMo, setPaginaActualMo] = useState(1);
  const [modelosPorPagina, setModelosPorPagina] = useState(10);
  const indiceUltimoModelo = paginaActual * modelosPorPagina;
  const indicePrimerModelo = indiceUltimoModelo - modelosPorPagina;
  const modelosActuales = modelos.slice(indicePrimerModelo, indiceUltimoModelo);

  useEffect(() => {
    const obtenerYSetearModelos = async () => {
      setModelos(await obtenerModelosPorMarca(parseInt(camposBusquedaModelo.id)))
    }
    obtenerYSetearModelos()
  }, [camposBusquedaModelo.id]);

  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex items-center pt-4 pb-2 text-center">
        <h1 className="text-xl font-semibold w-full">MANTENIMIENTO DE MARCAS Y MODELOS</h1>
      </div>
      <div className='grid md:grid-cols-2 gap-4'>
        <div className="bg-white rounded-lg p-3">
          <div className="flex flex-col sm:flex-row pb-4 items-center">
            <div className='mb-2 lg:mb-0'>
              <h1 className="text-lg mr-2">Buscar</h1>
            </div>
            <div className='mb-2 lg:mb-0 mr-2'>
              <InputText
                value={busquedaMarca} disabled={false} placeholder={'Escribe aquí'}
                onChange={(e:any) => setBusquedaMarca(e.target.value)}
              />
            </div>
            <div>
              <ButtonIcon texto='Buscar' icono={<MagnifyingGlassIcon className="w-5" />} onClick={() => buscarMarca()} />
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
            <thead className="text-sm text-white uppercase bg-blue-600 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nº
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {marcasActuales.map((marca: any, index) => (
                <tr key={marca.id} className="odd:bg-white even:bg-gray-100 text-gray-900 text-center">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {marca.Nombre}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-1 justify-center">
                    <button className='text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-lg' onClick={() => seleccionarMarca(marca)}>
                      <PencilIcon width={24} height={24} />
                    </button>
                    <button className='text-white bg-gray-600 hover:bg-gray-700 p-1 rounded-lg' onClick={() => quitarMarca(marca)}>
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
          datos={marcas} 
          indiceUltimoDato={indiceUltimaMarca} 
        />
        <div className="flex flex-col sm:flex-row pt-8 items-center justify-center">
          <div className="flex items-center pt-4 pb-2 text-center">
          </div>
          <div className='mb-2 lg:mb-0 mr-2'>
            <InputText
              value={camposMarca.nombre} disabled={false} placeholder={'Escribe aquí'}
              onChange={(e:any) => handleChangeMarca('nombre',e.target.value)}
            />
          </div>
          <div>
            <ButtonPrimary texto='Registrar' onClick={() => agregarMarca()} />
          </div>
        </div>


        </div>
        <div className="bg-white rounded-lg p-3">
          <div className='pb-4'>
            <div className='flex flex-col md:flex-row items-center mb-4 md:mb-0 md:px-8'>
              <div className='grow-[1]'>
                <TextoLabel texto={'Marca'} />
              </div>
              <div className='grow-[3]'>
                <Select
                  value={camposBusquedaModelo.id}
                  onChange={(e:any) => handleChangeCampo('id', e.target.value)}
                  opciones={marcas}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row pb-4 items-center">
            <div className='mb-2 lg:mb-0'>
              <h1 className="text-lg mr-2">Buscar</h1>
            </div>
            <div className='mb-2 lg:mb-0 mr-2'>
              <InputText
                value={camposBusquedaModelo.busqueda} disabled={false} placeholder={'Escribe aquí'}
                onChange={(e:any) => handleChangeCampo('busqueda', e.target.value)}
              />
            </div>
            <div>
              <ButtonIcon texto='Buscar' icono={<MagnifyingGlassIcon className="w-5" />} onClick={() => buscarModelo()} />
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
          <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
            <thead className="text-sm text-white uppercase bg-blue-600 text-center">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nº
                </th>
                <th scope="col" className="px-6 py-3">
                  Modelo
                </th>
                <th scope="col" className="px-6 py-3">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {modelosActuales.map((modelo: any, index) => (
                <tr key={modelo.id} className="odd:bg-white even:bg-gray-100 text-gray-900 text-center">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {modelo.Nombre}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-1 justify-center">
                    <button className='text-white bg-blue-600 hover:bg-blue-700 p-1 rounded-lg' onClick={() => seleccionarModelo(modelo)}>
                      <PencilIcon width={24} height={24} />
                    </button>
                    <button className='text-white bg-gray-600 hover:bg-gray-700 p-1 rounded-lg' onClick={() => quitarModelo(modelo)}>
                      <TrashIcon width={24} height={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>  
          </table>
        </div>
        <Paginacion 
          paginaActual={paginaActualMo}
          setPaginaActual={setPaginaActualMo} 
          datos={modelos} 
          indiceUltimoDato={indiceUltimoModelo} 
        />
        <div className="flex flex-col sm:flex-row pt-8 items-center justify-center">
          <div className="flex items-center pt-4 pb-2 text-center">
          </div>
          <div className='mb-2 lg:mb-0 mr-2'>
            <InputText
              value={camposModelo.nombre} disabled={false} placeholder={'Escribe aquí'}
              onChange={(e:any) => handleChangeModelo('nombre',e.target.value)}
            />
          </div>
          <div>
            <ButtonPrimary texto='Registrar' onClick={() => agregarModelo()} />
          </div>
        </div>
        </div>       
      </div>
    </div>
  )
}
