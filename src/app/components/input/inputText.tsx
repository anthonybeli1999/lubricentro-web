import React from 'react'

export default function InputText({ value, onChange, placeholder, disabled }: any) {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      type="text"
      placeholder={placeholder}
      spellCheck="false"
      className="text-center p-1 border-b-2 border-gray-400 focus:border-blue-600 outline-none w-full"
    />
)
}
