import { get, post, postReturn, put } from './baseService';

const ruta = 'cliente/';

const obtenerClientes = async () => {
    const data = get(ruta)
    return data
}

const buscarClientes = async (parametro : any) => {
    const body = { 
        Parametro: parametro 
    };
    const data = postReturn(ruta + 'buscar', body)
    return data
}

const agregarNuevoCliente = async (body: any) => {
    const respuesta = await post(ruta, body);
    return respuesta
}

const modificarCliente = async (body: any) => {
    const respuesta = await put(ruta, body);
    return respuesta
}

export { obtenerClientes, agregarNuevoCliente, modificarCliente, buscarClientes }
