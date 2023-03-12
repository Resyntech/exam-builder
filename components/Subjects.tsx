import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { setSubjectModal } from "../src/redux/actions/uiActions"
import { useAppDispatch, useAppSelector } from "../src/redux/hooks"
import { getSubjectCol, userCollection } from "../src/utils/firebase"
import { useAuth } from "./AuthContext"
import { Animation } from "./Loading/Animation"
import Textfield from "./Textfield"
import { colorButton, colorFooter, colorHeader } from "./theme"
import { UserDataTypes } from "./types"

const initState = [{ name: "" }, { name: "" }, { name: "" }]

const Subjects = () => {
  const { currentUser } = useAuth()
  const dispatch = useAppDispatch()
  const { theme, subjectModal } = useAppSelector((s) => s.ui)
  const [subjects, setSubjects] = useState(initState)

  const handleRemoveSub = (props: number) => async () => {
    try {
      const subjectCol = getSubjectCol({
        docID: `${currentUser?.email}`,
        colName: "subjects",
      })
      const subjectD = doc(subjectCol, `${subjects[props]}`)
      const getSubject = await getDoc(subjectD)
      if (getSubject.exists())
        await updateDoc(subjectD, {
          subjects: arrayRemove(subjects[props]),
        })
    } catch (err) {
      console.log(err)
    }
  }

  const callBack = () => {
    try {
      onSnapshot(doc(userCollection, `${currentUser?.email}`), (doc) => {
        const DATA: UserDataTypes = doc.data()
        if (DATA?.subjects !== undefined) setSubjects(DATA.subjects)
      })
    } catch (err) {
      console.log(err)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callBack(), [])
  return (
    <section className="border-2 m-2 p-2 rounded-md border-black">
      <div className="grid grid-flow-col items-center justify-center gap-4">
        <h2 className="font-semibold text-center">Subjects:</h2>
        <div className="grid place-content-center w-full">
          {/* <label htmlFor="subjectButton" className="capitalize text-xs">
              add subject:
            </label> */}
          <button
            id="subjectButton"
            className="rounded-md border-2 mt-2 border-black py-1 px-2 text-xs select-none"
            onClick={() => dispatch(setSubjectModal(!subjectModal))}
          >
            +
          </button>
        </div>
      </div>
      <div className="max-w-5xl w-full">
        <div className="my-0 mx-4">
          <div className="flex gap-2 overflow-x-scroll overflow-y-hidden">
            {subjects.map(({ name }, i) => {
              const isNameBlank = name === ""
              return (
                <div key={i} className="h-12 my-2">
                  <div className="relative w-max">
                    {!isNameBlank && (
                      <button
                        className="absolute select-none bg-red-500 text-white text-xs px-1"
                        onClick={handleRemoveSub(i)}
                      >
                        -
                      </button>
                    )}
                    <Link href={`/dashboard/subjects/${name}`} passHref>
                      <a
                        className={`${
                          isNameBlank ? "pointer-events-none p-4" : ""
                        } text-xs text-center capitalize p-2 border-2 border-transparent
                        bg-white shadow-md rounded-md ${colorButton(theme)}`}
                      >
                        {isNameBlank ? <Animation /> : name.replace(/_/g, " ")}
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          {<AddSubjectModal />}
        </div>
      </div>
    </section>
  )
}

const AddSubjectModal = () => {
  const { currentUser } = useAuth()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { subjectModal, theme } = useAppSelector((s) => s.ui)
  const ref = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    if (ref.current !== null && currentUser !== null) {
      try {
        setLoading(true)
        const formatSubject = ref.current.value
          .trim()
          .replace(/ /g, "_")
          .toLowerCase()
        const userDoc = doc(userCollection, `${currentUser?.email}`)
        const getUser = await getDoc(userDoc)
        if (getUser.exists())
          await updateDoc(userDoc, {
            subjects: arrayUnion({ name: formatSubject }),
          })
        else
          await setDoc(userDoc, {
            accountCreatedAt: new Date(),
            subjects: [{ name: formatSubject }],
          })

        const subjectCol = getSubjectCol({
          docID: `${currentUser?.email}`,
          colName: "subjects",
        })
        const subjectD = doc(subjectCol, formatSubject)
        const getSubject = await getDoc(subjectD)
        if (!getSubject.exists()) await setDoc(subjectD, {})

        dispatch(setSubjectModal(!subjectModal))
        ref.current.value = ""
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div
      className={`${
        subjectModal ? "opacity-1" : "opacity-0 pointer-events-none"
      } absolute-center duration-300 ease-in-out p-2 rounded-md z-[100] ${colorFooter(
        theme
      )}`}
    >
      <button
        className="bg-red-500 px-2 text-sm text-white select-none"
        onClick={() => dispatch(setSubjectModal(!subjectModal))}
      >
        x
      </button>
      <Textfield ref={ref} type="text" label="subject_name" />
      <button
        className={`rounded-md px-2 text-center text-sm ${colorButton(theme)}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        submit
      </button>
    </div>
  )
}

export default Subjects
