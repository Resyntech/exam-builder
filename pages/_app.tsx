import type { AppProps } from "next/app"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { AuthProvider } from "../components/AuthContext"
import { setInitTheme } from "../src/redux/actions/uiActions"
import { useAppDispatch } from "../src/redux/hooks"
import store from "../src/redux/store"
import "../styles/globals.css"

const MyApp = (Props: AppProps) => (
  <AuthProvider>
    <Provider store={store}>
      <APP {...Props} />
    </Provider>
  </AuthProvider>
)

const APP = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setInitTheme())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
