import React from 'react';

export default function InputArea({ value, onChange, placeholder }: any) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck="false"
      className="p-1 border-b-2 border-gray-400 focus:border-blue-600 outline-none w-full"
    />
  );
}
