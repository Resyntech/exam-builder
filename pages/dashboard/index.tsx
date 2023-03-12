import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { Children, Footer, Header, Select, Subjects } from "../../components"
import { useAuth } from "../../components/AuthContext"
import { setTheme } from "../../src/redux/actions/uiActions"
import { useAppDispatch } from "../../src/redux/hooks"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { currentUser, signout } = useAuth()
  const { push } = useRouter()
  const DIMENSION = 12
  const accountType = currentUser?.providerData[0].providerId.replace(
    /\.[^.]*$/,
    ""
  )

  if (!currentUser) push("/signin")

  const handleTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(`${e.currentTarget.value}`))
  }

  return (
    <main>
      <Head>
        <title>Exam Builder | Dashboard</title>
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Children className="overflow-hidden">
        <div>
          <section className="text-center">
            <h1 className="typo-main">your account</h1>
            <div className="w-16 mx-auto">
              <Image
                className="rounded-full transition-all duration-300"
                layout="responsive"
                width={DIMENSION}
                height={DIMENSION}
                alt={currentUser?.displayName || "avatar"}
                src={currentUser?.photoURL || "/favicon.svg"}
              />
            </div>
            <div>
              <p className="text-sm transition-all duration-300 grid grid-flow-col place-content-center gap-2">
                Account Type
                <span className="text-sm border-2 border-black rounded-full px-1 select-none">
                  {currentUser?.emailVerified ? "✓" : "X"}
                </span>
                <span className="font-thin text-sm capitalize transition-all duration-300">
                  {accountType || "account-x"}
                </span>
              </p>
              <p className="text-sm transition-all duration-300">
                Email:
                <span className="font-thin text-sm transition-all duration-300">
                  {currentUser?.email || "email@example.com"}
                </span>
              </p>
              <p className="text-sm transition-all duration-300">
                Name:
                <span className="font-thin text-sm transition-all duration-300">
                  {currentUser?.displayName || "display name"}
                </span>
              </p>
            </div>
            <button
              className="bg-red-500 text-white text-sm py-1 px-2"
              onClick={() => signout()}
            >
              signout
            </button>
            <Select
              onChange={handleTheme}
              label="theme"
              choices={["default", "discord"]}
            />
          </section>
          <Subjects />
        </div>
      </Children>
      <Footer />
    </main>
  )
}

export default Dashboard
