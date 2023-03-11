import { InputTypes } from "./types"

const Textfield = ({ rows, label, ...rest }: InputTypes) => {
  const rowExist = rows !== undefined
  return (
    <div className={`relative ${rowExist ? "mt-3" : "my-1"}`}>
      <label
        htmlFor={label}
        className={`label-input ${
          rowExist ? "-top-2 left-1" : "bottom-6 left-1"
        }`}
      >{`${label.replace(/_/g, " ")}`}</label>
      {rowExist ? (
        <textarea
          id={label}
          className="outline-none text-xs p-2 rounded-md bg-slate-300 w-full resize-none"
          rows={rows}
          {...rest}
        />
      ) : (
        <input
          id={label}
          className="outline-none text-xs p-2 rounded-md bg-slate-300 w-full"
          {...rest}
        />
      )}
    </div>
  )
}

export default Textfield
