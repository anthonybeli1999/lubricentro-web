import { get, post, postReturn, put } from './baseService';

const ruta = 'vehiculo/';

const obtenerVehiculos = async () => {
    const data = get(ruta)
    return data
}

const obtenerVehiculosConPagosPendientes = async () => {
    const data = get(ruta + 'pagos-pendientes')
    return data
}

const buscarVehiculos = async (parametro : any) => {
    const body = { 
        Parametro: parametro 
    };
    const data = postReturn(ruta + 'buscar', body)
    return data
}

const agregarNuevoVehiculo = async (body: any) => {
    const respuesta = await post(ruta, body);
    return respuesta
}

const modificarVehiculo = async (body: any) => {
    const respuesta = await put(ruta, body);
    return respuesta
}

export { obtenerVehiculos, obtenerVehiculosConPagosPendientes,
    buscarVehiculos, agregarNuevoVehiculo, modificarVehiculo }
