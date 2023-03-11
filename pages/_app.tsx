import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { AuthProvider } from "../components/AuthContext"
import store from "../src/redux/store"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </AuthProvider>
)

export default MyApp
