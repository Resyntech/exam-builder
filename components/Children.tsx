const Children = ({
  children,
  fit,
}: {
  children: React.ReactNode
  fit?: boolean
}) => {
  return (
    <div
      className={`${
        fit ? "h-screen" : "sm:h-[90svh]"
      } bg-yellow-200 container-children-holder`}
    >
      {children}
    </div>
  )
}

export default Children
