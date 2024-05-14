import React from 'react'

export default function Table({ cabeceras, datos }: any) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border">
            <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
                <thead className="text-sm text-white uppercase bg-blue-600">
                    <tr>
                        {cabeceras.map((cabeceras: any, index: any) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {cabeceras}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3">
                            Acción
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {datos?.map((dato: any) => (
                        <tr key={dato.id} className={'odd:bg-white even:bg-gray-100 text-gray-900'}>
                            {Object.values(dato).map((valor: any, index: any) => {
                                return typeof valor !== 'object' ? (
                                    <td key={index} className="px-6 py-4">
                                        {valor}
                                    </td>
                                ) : null;
                            })}
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Editar
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
