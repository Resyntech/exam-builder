import { useRef } from "react"
import { useAppSelector } from "../src/redux/hooks"
import { colorSelect } from "./theme"
import { SelectTypes } from "./types"

const Select = ({ choices, label, ...rest }: SelectTypes) => {
  const ref = useRef<HTMLDivElement>(null)
  const { clearingForms, theme } = useAppSelector((s) => s.ui)

  // if (clear > 0)
  //   ref.current?.lastElementChild?.firstElementChild?.setAttribute(
  //     "selected",
  //     "true"
  //   )

  return (
    <div ref={ref} className="relative pb-1">
      <label htmlFor={label} className="label-select">{`${label}: `}</label>
      <select
        id={label}
        className={`text-xs p-1 rounded-md ${colorSelect(theme)}`}
        {...rest}
      >
        {choices.map((v, i) => (
          <option className={i < 1 ? "text-gray-400" : ""} key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
