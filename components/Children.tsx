import { useAppSelector } from "../src/redux/hooks"
import { colorChildren } from "./theme"

const Children = ({
  className,
  children,
  fit,
}: {
  className?: string
  children: React.ReactNode
  fit?: boolean
}) => {
  const theme = useAppSelector((s) => s.ui.theme)
  return (
    <div
      className={`${fit ? "h-screen" : "h-[90svh]"} ${
        className ? className : "container-children-holder"
      } ${colorChildren(theme)}`}
    >
      {children}
    </div>
  )
}

export default Children
