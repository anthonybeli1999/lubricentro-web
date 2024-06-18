import { get, post, postReturn, put } from './baseService';

const ruta = 'marca/';

const obtenerMarcas = async () => {
  const data = get(ruta)
  return data
}

const modificarMarca = async (body: any) => {
  const respuesta = await put(ruta, body);
  return respuesta
}

const agregarNuevaMarca = async (body: any) => {
  const respuesta = await post(ruta, body);
  return respuesta
}

const eliminarMarca = async (body: any) => {
  const respuesta = await put(ruta + 'eliminar', body);
  return respuesta
}

const buscarMarcas = async (parametro : any) => {
  const body = { 
      Parametro: parametro 
  };
  const data = postReturn(ruta + 'buscar', body)
  return data
}

export { obtenerMarcas, modificarMarca, agregarNuevaMarca, eliminarMarca, buscarMarcas }