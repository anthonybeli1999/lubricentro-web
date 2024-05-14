import React from 'react'

export default function InputDate({ value, onChange, placeholder }: any) {
  return (
    <input
      value={value}
      onChange={onChange}
      type="date"
      placeholder={placeholder}
      className="text-center p-1 border-b-2 border-gray-400 focus:border-blue-600 outline-none w-full"
    />
)
}
