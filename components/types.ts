import { Auth, UserCredential } from "firebase/auth"
import React, { ReactNode } from "react"

export type EmailType = { email: string }
export type PasswordType = { password: string }
export interface AuthTypes {
  email: EmailType["email"]
  password: PasswordType["password"]
}
export interface AuthContextValue {
  currentUser: Auth["currentUser"] | null
  signin: (props: AuthTypes) => Promise<UserCredential | void>
  signup: (props: AuthTypes) => Promise<UserCredential | void>
  signout: () => Promise<void>
  resetPassword: (props: EmailType) => Promise<void>
  upEmail: (props: EmailType) => Promise<void>
  upPassword: (props: PasswordType) => void
  googleSignIn: () => void
}

export type HeadTypes = {
  title: string
  description: string
  keywords: string
  language: string
  visit: string
}

export interface MainTypes extends HeadTypes {
  children: ReactNode
  title: string
}

export interface SelectTypes extends React.HTMLAttributes<HTMLSelectElement> {
  label: string
  choices: number[]
}

export interface InputTypes
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  disabled?: boolean
  rows?: number
  label: string
}
