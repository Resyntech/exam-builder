import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react"

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "number" | "email" // add or remove additional input types here
  variant?: "filled" | "outlined" // optional prop for styling variations
  rows?: number // optional prop for textarea rows
}

type Ref = HTMLInputElement | HTMLTextAreaElement

const CustomInput: ForwardRefRenderFunction<Ref, CustomInputProps> = (
  { type, variant = "filled", rows, ...rest },
  ref
) => {
  const commonProps = {
    ...rest,
    ref,
    className: `custom-input custom-input-${variant}`,
    type,
  }

  if (type === "textarea") {
    return <textarea {...commonProps} rows={rows} />
  } else {
    return <input {...commonProps} />
  }
}

export default CustomInput
