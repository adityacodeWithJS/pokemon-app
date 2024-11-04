
import React , { ChangeEvent } from "react"

interface SelectInputProps {
    value:string;
    options:string[];
    onChange:(e:ChangeEvent<HTMLSelectElement>) => void;
    defalutOptionLabel?:string;
    className?:string;
}

const SelectInput = ({value, onChange, options=[], defalutOptionLabel ='Select an option',className=''}: SelectInputProps) => {
return (
    <select
    onChange={onChange}
    className={`p-2 mb-4 border border-gray-300 rounded-lg ${className}`}
    value={value}
    >
    <option  value={""} >{defalutOptionLabel}</option>
        {
            options.map((option)=>{
                return <option key={option} value={option}>
                     {option}
                </option>
            })
    }
    </select>
)
}

export default SelectInput
