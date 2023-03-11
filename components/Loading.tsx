const Loading = () => {
  return (
    <div className="absolute-center">
      <h1 className="w-full">
        <span className="delay-1 animate-load load-span">.</span>
        <span className="delay-2 animate-load load-span">.</span>
        <span className="delay-3 animate-load load-span">.</span>
      </h1>
    </div>
  )
}

export default Loading
