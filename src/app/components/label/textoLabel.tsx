import React from 'react'

export default function TextoLabel({texto}: any) {
  return (
    <h1 className='text-start text-xs font-bold uppercase text-gray-600 md:mr-2 pb-2'>{texto}</h1>
)
}
