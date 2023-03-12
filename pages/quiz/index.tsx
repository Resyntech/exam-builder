import { onSnapshot } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Main } from "../../components"
import { useAuth } from "../../components/AuthContext"
import { colorButton } from "../../components/theme"
import { clearChoiceAns } from "../../src/redux/actions/choiceActions"
import { setEmail } from "../../src/redux/actions/uiActions"
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks"
import { getSubjectCol } from "../../src/utils/firebase"
import { removeDuplicates } from "../../src/utils/removeDuplicates"

const Index = () => {
  const { currentUser } = useAuth()
  const { push } = useRouter()
  const [subjects, setSubjects] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((s) => s.ui)

  const callback = () => {
    try {
      const subjectCol = getSubjectCol({
        docID: `${currentUser?.email}`,
        colName: "subjects",
      })

      onSnapshot(subjectCol, (snap) =>
        snap.docs.map((doc) => {
          if (doc.exists()) setSubjects((p) => [...p, doc.id])
        })
      )
    } catch (err) {
      console.log(err)
    }
    dispatch(setEmail(`${currentUser?.email}`))
    dispatch(clearChoiceAns())
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback(), [])

  if (!currentUser) push("/signin")

  return (
    <Main
      title="Exam Builder | Quiz"
      description="The description must be atleast 150 characters"
      keywords="Exam, Builder, Academic, Study"
      language="English"
      visit="1 days"
    >
      <p className="text-xs text-center">
        Multiple is the only exam type available at the moment.
      </p>
      {subjects.length === 0 ? (
        <p className="text-xs">
          Looks like you don&apos;t have any subjects appearing here, please go
          to the
          <span>
            {" "}
            <Link href="/dashboard" passHref>
              <a className="text-xs underline capitalize">dashboard</a>
            </Link>{" "}
          </span>
          and add a subjects to begin the quiz
        </p>
      ) : (
        removeDuplicates(subjects).map((v) => (
          <Link key={v} href={`/quiz/${v}`} passHref>
            <a
              className={`text-xs capitalize rounded-md p-2 text-center ${colorButton(
                theme
              )}`}
            >
              {v.replace(/_/g, " ")}
            </a>
          </Link>
        ))
      )}
    </Main>
  )
}

export default Index
