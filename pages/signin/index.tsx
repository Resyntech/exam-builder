import Image from "next/image"
import { useRouter } from "next/router"
import { Children } from "../../components"
import { useAuth } from "../../components/AuthContext"

const Signin = () => {
  const { currentUser, googleSignIn, signout } = useAuth()
  const { push } = useRouter()
  const DIMENSION = 36
  if (currentUser) push("/dashboard")

  return (
    <Children fit>
      <p className="text-xs text-center">Sign in with: </p>
      <button
        className="border-2 border-transparent
        bg-white py-1 px-3 
        flex items-center gap-2
        hover:scale-110 shadow-md duration-300 ease-in-out"
        onClick={() => googleSignIn()}
      >
        <Image
          width={DIMENSION}
          height={DIMENSION}
          src="/google.svg"
          alt="Google_Logo"
        />
        <span className="text-black text-xs">Google</span>
      </button>
    </Children>
  )
}

export default Signin
