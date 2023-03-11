import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react"
import { auth } from "../src/utils/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  Auth,
  signInWithCredential,
} from "firebase/auth"
import { AuthContextValue, AuthTypes, EmailType, PasswordType } from "./types"
import { Loading } from "./"

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  signin: async () => {},
  signup: async () => {},
  signout: async () => {},
  resetPassword: async () => {},
  upEmail: async () => {},
  upPassword: async () => {},
  googleSignIn: async () => {},
})

export const useAuth = () => useContext(AuthContext)
export const AuthProvider: React.FC<any> = ({
  children,
}: {
  children: ReactNode
}) => {
  const [currentUser, setCurrentUser] = useState<Auth["currentUser"]>(null)
  const [loading, setLoading] = useState(true)

  const signup = async ({ email, password }: AuthTypes) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }
  const signin = async ({ email, password }: AuthTypes) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }
  const signout = async () => {
    return await signOut(auth)
  }
  const resetPassword = async ({ email }: EmailType) => {
    return await sendPasswordResetEmail(auth, email)
  }
  const upEmail = async ({ email }: EmailType) => {
    try {
      if (currentUser !== null) return await updateEmail(currentUser, email)
    } catch (err) {
      console.log(err)
    }
  }
  const upPassword = async ({ password }: PasswordType) => {
    try {
      if (currentUser !== null)
        return await updatePassword(currentUser, password)
    } catch (err) {
      console.log(err)
    }
  }
  const googleSignIn = async () => {
    try {
      return await signInWithPopup(auth, new GoogleAuthProvider()).then(
        (result: UserCredential) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          if (credential !== null) signInWithCredential(auth, credential)
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user)
    setLoading(false)
  })

  useEffect(() => {
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signin,
    signup,
    signout,
    resetPassword,
    upEmail,
    upPassword,
    googleSignIn,
  }
  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
