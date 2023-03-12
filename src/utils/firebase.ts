import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { collection, doc, getFirestore } from "firebase/firestore"

export const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
})
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

export const userCollection = collection(db, "users")
export const getSubjectCol = ({
  docID,
  colName,
}: {
  docID: string
  colName: string
}) => {
  return collection(doc(userCollection, docID), colName)
}
