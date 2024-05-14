'use client'
import ErrorAlert from '@/app/components/alerts/errorAlert'
import ButtonIcon from '@/app/components/button/buttonIcon'
import ButtonIconR from '@/app/components/button/buttonIconR'
import InputNumber from '@/app/components/input/inputNumber'
import InputText from '@/app/components/input/inputText'
import TextoInput from '@/app/components/label/textoInput'
import { modificarCliente } from '@/app/services/clientesService'
import { CheckIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ModificarCliente() {
  const router = useRouter();
  const [campos, setCampos] = useState({
    id: '',
    documento: '',
    nombre: '',
    celular: '',
    correo: ''
  })
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleChangeCampo = (campo: any, valor: any) => {
    setCampos({
      ...campos,
      [campo]: valor
    });
  }

  const verAlerta = () => {
    setMostrarAlerta(!mostrarAlerta)
  }

  const modificarClienteSeleccionado= async () => {
    if (!validarCampos()) {
      verAlerta();
      return;
    }
    const body = {
      id: campos.id,
      Documento: campos.documento,
      Nombre: campos.nombre,
      Celular: campos.celular.toString(),
      Correo: campos.correo
    }
    const respuesta = await modificarCliente(body);
    if (respuesta) {
      alert('La información fue guardada correctamente');
      router.push('/admin/Clientes');
      localStorage.removeItem('cliente');
    } else {
      alert('Algo salió mal al modificar el cliente');
    }
  }

  const validarCampos = () => {
    return !(!campos.id || !campos.documento || !campos.nombre);
  }

  useEffect(() => {
    const clienteString = localStorage.getItem('cliente');
    if (clienteString) {
      const clienteObj = JSON.parse(clienteString);
      setCampos({
        ...campos,
        id: clienteObj.id,
        documento: clienteObj.Documento,
        nombre: clienteObj.Nombre,
        celular: clienteObj.Celular,
        correo: clienteObj.Correo
      });
    }
  }, []);

  
  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
      <div className="flex justify-between items-center pt-4 pb-2">
        <h1 className="text-lg lg:text-xl font-semibold">Modificar cliente</h1>
      </div>
      <div className="bg-white rounded-lg p-6" onClick={() => !mostrarAlerta ? '' : verAlerta()}>
        {mostrarAlerta && ( <ErrorAlert /> )}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='text-center pl-4 pr-2 lg:mt-0'>
            <TextoInput texto={'Documento (*)'} />
            <InputText
              value={campos.documento} placeholder={'Documento'}
              onChange={(e:any) => handleChangeCampo('documento', e.target.value)}
            />
          </div>
          <div className='text-center pr-4 pl-2 mt-4 md:mt-0'>
            <TextoInput texto={'Nombres (*)'} />
            <InputText
              value={campos.nombre} placeholder={'Nombres'}
              onChange={(e:any) => handleChangeCampo('nombre', e.target.value)}
            />
          </div>
          <div className='text-center pl-4 pr-2 mt-4'>
            <TextoInput texto={'Celular'} />
            <InputNumber
              value={campos.celular} placeholder={'Celular'}
              onChange={(e:any) => handleChangeCampo('celular', e.target.value)}
            />
          </div>
          <div className='text-center pr-4 pl-2 mt-4'>
            <TextoInput texto={'Correo'} />
            <InputText
              value={campos.correo} placeholder={'Correo electrónico'}
              onChange={(e:any) => handleChangeCampo('correo', e.target.value)}
            />
          </div>
        </div>
        <div className='grid md:flex mt-8 mb-4 justify-center'>
          <ButtonIcon texto='Guardar' icono={<CheckIcon className="w-5" />} onClick={() => modificarClienteSeleccionado()} />
          <div className='mt-2 md:mt-0'>
            <ButtonIconR texto='Cancelar' icono={<XMarkIcon className="w-5" />} onClick={() => router.push('/admin/Clientes')} />
          </div>
        </div>
      </div>
    </div>
  )
}
