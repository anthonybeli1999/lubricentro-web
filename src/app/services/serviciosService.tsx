import { get, post, postReturn, put } from './baseService';

const ruta = 'servicio/'

const agregarNuevoServicio = async (body: any) => {
    const respuesta = await post(ruta, body);
    return respuesta
}

const modificarServicio = async (body: any) => {
    const respuesta = await put(ruta, body);
    return respuesta
}

const buscarServicios = async (parametro : any) => {
    const body = { 
        vehiculoId: parametro 
    };
    const data = postReturn(ruta + 'buscar', body)
    return data
}

export { agregarNuevoServicio, modificarServicio, buscarServicios }