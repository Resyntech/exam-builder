import { SelectTypes } from "./types"

const Select = ({ choices, label, ...rest }: SelectTypes) => {
  return (
    <div className="relative pb-1">
      <label htmlFor={label} className="label-select">{`${label}: `}</label>
      <select id={label} className="text-xs p-1 rounded-md" {...rest}>
        {choices.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
