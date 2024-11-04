import React, { ChangeEvent } from 'react'


interface TextInputProps {
    value:string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    placeholder?:string;
    className?:string;
}


const TextInput = ({value,onChange, placeholder, className= ''}:TextInputProps) => {
    return (
        <input 
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-2 mb-4 border border-gray-300 rounded-lg ${className}`}
        />
    )
}

export default TextInput