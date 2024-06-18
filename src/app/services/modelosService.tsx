import { get, post, postReturn, put } from './baseService';

const ruta = 'modelo/';


const obtenerModelosPorMarca = async (parametro : any) => {
  const body = { 
      marcaId: parametro 
  };
  const data = postReturn(ruta + 'obtener-por-marca', body)
  return data
}

const modificarModelo = async (body: any) => {
  const respuesta = await put(ruta, body);
  return respuesta
}

const agregarNuevoModelo = async (body: any) => {
  const respuesta = await post(ruta, body);
  return respuesta
}

const eliminarModelo = async (body: any) => {
  const respuesta = await put(ruta + 'eliminar', body);
  return respuesta
}

const buscarModelos = async (body : any) => {
  const data = postReturn(ruta + 'buscar', body)
  return data
}

export { obtenerModelosPorMarca, modificarModelo,
  agregarNuevoModelo, eliminarModelo, buscarModelos
 }