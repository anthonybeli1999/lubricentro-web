'use client'
import ErrorAlert from '@/app/components/alerts/errorAlert';
import ButtonIcon from '@/app/components/button/buttonIcon';
import ButtonIconR from '@/app/components/button/buttonIconR';
import InputArea from '@/app/components/input/inputArea';
import InputDate from '@/app/components/input/inputDate';
import InputNumber from '@/app/components/input/inputNumber';
import InputText from '@/app/components/input/inputText';
import TextoInput from '@/app/components/label/textoInput';
import SelectValue from '@/app/components/select/selectValue';
import { agregarNuevoServicio } from '@/app/services/serviciosService';
import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function AgregarServicio() {
    const router = useRouter();
    const [campos, setCampos] = useState({
        tipo: '',
        servicio: '',
        detalle: '',
        kma: '',
        kmpc: '',
        fecha: '',
        monto: '',
        estadopago: '',
        montopago: '',
        personal: '',
        idvehiculo: ''
    })
    const [mostrarAlerta, setMostrarAlerta] = useState(false)

    const tiposServicio = [
        "Interno",
        "Externo"
    ]

    const handleChangeCampo = (campo: any, valor: any) => {
        setCampos({
            ...campos,
            [campo]: valor
        });
    }

    const verAlerta = () => {
        setMostrarAlerta(!mostrarAlerta)
    }

    const agregarServicio = async () => {
        if (!validarCampos()) {
            verAlerta();
            return;
        }
        if (parseFloat(campos.montopago) > parseFloat(campos.monto)) {
            alert('El monto pagado no puede ser superior al monto total.')
            return
        }
        const body = {
            Tipo: campos.tipo,
            Servicio: campos.servicio,
            Detalle: campos.detalle,
            KmA: campos.kma,
            KmPC: campos.kmpc,
            Fecha: campos.fecha,
            Monto: parseFloat(campos.monto),
            EstadoPago: parseFloat(campos.monto) === parseFloat(campos.montopago)
                ? 'P' : 'D',
            MontoPago: parseFloat(campos.montopago),
            Personal: campos.personal,
            vehiculoId: parseInt(campos.idvehiculo)
        }
        const respuesta = await agregarNuevoServicio(body);
        if (respuesta) {
            alert('La información fue guardada correctamente');
            router.push('/admin/Servicios');
        } else {
            alert('Algo salió mal al agregar el servicio');
        }
    }

    const validarCampos = () => {
        return !(!campos.tipo || !campos.servicio || !campos.detalle
            || !campos.kma || !campos.kmpc || !campos.fecha
            || !campos.monto || !campos.montopago
            || !campos.personal
        )
    }

    useEffect(() => {
        const vehiculoString = localStorage.getItem('vehiculo');
        if (vehiculoString) {
          const vehiculoObj = JSON.parse(vehiculoString);
          setCampos({
            ...campos,
            idvehiculo: vehiculoObj.id
          });
        }
      }, []);

    return (
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-2 px-4">
            <div className="flex justify-between items-center pt-4 pb-2">
                <h1 className="text-lg lg:text-xl font-semibold">Agregar servicio</h1>
            </div>
            <div className="bg-white rounded-lg p-6" onClick={() => !mostrarAlerta ? '' : verAlerta()}>
                {mostrarAlerta && (<ErrorAlert />)}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='text-center md:pl-4 md:pr-2 md:mt-0'>
                        <TextoInput texto={'Tipo (*)'} />
                        <SelectValue
                            value={campos.tipo}
                            onChange={(e:any) => handleChangeCampo('tipo', e.target.value)}
                            opciones={tiposServicio}
                        />
                    </div>
                    <div className='text-center md:px-2 mt-4 md:mt-0'>
                        <TextoInput texto={'Servicio (*)'} />
                        <InputText
                            value={campos.servicio} placeholder={'Servicio'}
                            onChange={(e: any) => handleChangeCampo('servicio', e.target.value)}
                        />
                    </div>
                    <div className='text-center md:pl-2 md:pr-4 mt-4 md:mt-0'>
                        <TextoInput texto={'Fecha (*)'} />
                        <InputDate
                            value={campos.fecha} placeholder={'Fecha'}
                            onChange={(e: any) => handleChangeCampo('fecha', e.target.value)}
                        />
                    </div>
                    <div className='md:col-span-3 md:pl-4 md:pr-4 mt-4 md:mt-2'>
                        <TextoInput texto={'Detalle (*)'} />
                        <InputArea
                            value={campos.detalle} placeholder={'Detalle'}
                            onChange={(e: any) => handleChangeCampo('detalle', e.target.value)}
                        />
                    </div>
                    <div className='text-center md:pl-4 md:pr-2 mt-4 md:mt-2'>
                        <TextoInput texto={'Km Actual (*)'} />
                        <InputNumber
                            value={campos.kma} placeholder={'KmA'}
                            onChange={(e: any) => handleChangeCampo('kma', e.target.value)}
                        />
                    </div>
                    <div className='text-center md:px-2 mt-4 md:mt-2'>
                        <TextoInput texto={'Km Próximo (*)'} />
                        <InputNumber
                            value={campos.kmpc} placeholder={'KmPC'}
                            onChange={(e: any) => handleChangeCampo('kmpc', e.target.value)}
                        />
                    </div>
                    <div className='text-center md:pl-2 md:pr-4 mt-4 md:mt-2'>
                        <TextoInput texto={'Personal (*)'} />
                        <InputText
                            value={campos.personal} placeholder={'Personal'}
                            onChange={(e: any) => handleChangeCampo('personal', e.target.value)}
                        />
                    </div>
                    
                    <div className='text-center md:pl-4 md:pr-2 mt-4 md:mt-2'>
                        <TextoInput texto={'Monto Total (*)'} />
                        <InputNumber
                            value={campos.monto} placeholder={'Monto'}
                            onChange={(e: any) => handleChangeCampo('monto', e.target.value)}
                        />
                    </div>
                    <div className='text-center md:px-2 mt-4 md:mt-2'>
                        <TextoInput texto={'Monto Pagado (*)'} />
                        <InputNumber
                            value={campos.montopago} placeholder={'Monto pagado'}
                            onChange={(e: any) => handleChangeCampo('montopago', e.target.value)}
                        />
                    </div>
                </div>
                <div className='grid md:flex mt-8 mb-4 justify-center'>
                    <ButtonIcon texto='Guardar' icono={<CheckIcon className="w-5" />} onClick={() => agregarServicio()} />
                    <div className='mt-2 md:mt-0'>
                        <ButtonIconR texto='Cancelar' icono={<XMarkIcon className="w-5" />} onClick={() => router.push('/admin/Servicios')} />
                    </div>
                </div>
            </div>
        </div>
    )
}
