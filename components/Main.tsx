import { Children, Footer, Header, SEO } from "./"
import { MainTypes } from "./types"

const Main = ({ children, ...rest }: MainTypes) => {
  return (
    <main className="container-main">
      <SEO {...rest} />
      <Header />
      <Children fit>{children}</Children>
      <Footer />
    </main>
  )
}

export default Main
