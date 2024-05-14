import React from 'react'

export default function Paginacion({ paginaActual, setPaginaActual, datos, indiceUltimoDato }: any) {
    return (
    <div className="flex justify-center mt-4">
      <button 
        className={`mx-2 px-3 py-1 rounded ${paginaActual === 1 ? 'text-gray-400 bg-gray-200' : 'text-blue-600 bg-blue-200'} ${paginaActual === 1 && 'cursor-not-allowed'}`} 
        disabled={paginaActual === 1} 
        onClick={() => setPaginaActual(paginaActual - 1)}
      >
        Anterior
      </button>
      <span className="mx-4">Página {paginaActual}</span>
      <button 
        className={`mx-2 px-3 py-1 rounded ${datos.length <= indiceUltimoDato ? 'text-gray-400 bg-gray-200' : 'text-blue-600 bg-blue-200'} ${datos.length <= indiceUltimoDato && 'cursor-not-allowed'}`} 
        disabled={datos.length <= indiceUltimoDato} 
        onClick={() => setPaginaActual(paginaActual + 1)}
      >
        Siguiente
      </button>
    </div>
    );
}
