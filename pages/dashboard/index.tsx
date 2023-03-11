import Image from "next/image"
import { useRouter } from "next/router"
import { Children, Footer, Header } from "../../components"
import { useAuth } from "../../components/AuthContext"

const signin = () => {
  const { currentUser, signout } = useAuth()
  const { push } = useRouter()
  const DIMENSION = 12

  if (!currentUser) push("/signin")

  return (
    <main>
      <Header />
      <Children>
        <h1 className="capitalize font-semibold text-center text-xl">
          your account
        </h1>
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
          <p className="text-sm">
            Email:
            <span className="font-thin text-sm transition-all duration-300">
              {currentUser?.email || "email@example.com"}
            </span>
          </p>
          <p className="text-sm">
            Name:
            <span className="font-thin text-sm transition-all duration-300">
              {currentUser?.displayName || "display name"}
            </span>
          </p>
        </div>
        <button
          className="bg-red-500 text-white text-sm"
          onClick={() => signout()}
        >
          signout
        </button>
      </Children>
      <Footer />
    </main>
  )
}

export default signin
