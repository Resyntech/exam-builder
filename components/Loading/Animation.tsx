export const Animation = ({ isChild }: { isChild?: boolean }) => (
  <h1
    className={`${
      isChild ? "left-5 -top-8" : "right-3 top-1"
    } select-none absolute w-full`}
  >
    <span className="delay-1 animate-load load-span">.</span>
    <span className="delay-2 animate-load load-span">.</span>
    <span className="delay-3 animate-load load-span">.</span>
  </h1>
)
