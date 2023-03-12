import { InputTypes } from "./types"
import { forwardRef, useRef } from "react"
import { useAppSelector } from "../src/redux/hooks"
import { colorTextfield } from "./theme"

type Ref = HTMLInputElement
const Textfield = forwardRef<Ref, InputTypes>(
  ({ type, label, ...rest }, ref: React.LegacyRef<Ref>) => {
    const { clearingForms, theme } = useAppSelector((s) => s.ui)
    const divRef = useRef<HTMLDivElement>(null)

    // if (clear > 0)
    //   divRef.current?.lastElementChild?.classList.add("text-transparent")

    switch (type) {
      case "text":
        return (
          <div ref={divRef} className="relative my-1">
            <label
              htmlFor={label}
              className="label-input bottom-6 left-1"
            >{`${label.replace(/_/g, " ")}`}</label>
            <input
              ref={ref}
              id={label}
              className={`outline-none text-xs p-2 rounded-md w-full ${colorTextfield(
                theme
              )}`}
              {...rest}
            />
          </div>
        )

      case "textarea":
        return (
          <div ref={divRef} className="relative mt-3">
            <label
              htmlFor={label}
              className="label-input -top-2 left-1"
            >{`${label.replace(/_/g, " ")}`}</label>
            <textarea
              id={label}
              className={`outline-none text-xs p-2 rounded-md w-full resize-none ${colorTextfield(
                theme
              )}`}
              {...rest}
            />
          </div>
        )
      default:
        return <></>
    }
  }
)
Textfield.displayName = "Textfield"
export default Textfield
