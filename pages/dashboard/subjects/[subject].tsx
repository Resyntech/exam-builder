import { arrayUnion, doc, runTransaction } from "firebase/firestore"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Main, Select, Textfield } from "../../../components"
import { useAuth } from "../../../components/AuthContext"
import { colorButton } from "../../../components/theme"
import { clearForms } from "../../../src/redux/actions/uiActions"
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks"
import { db, getSubjectCol } from "../../../src/utils/firebase"
import { genNumArray } from "../../../src/utils/genNumArray"
import { FormTypes } from "../../../src/utils/types/pages"
import { QuestionsType } from "../../../src/utils/types/pages"

const initState: FormTypes = {
  module: null,
  lesson: null,
  lesson_name: null,
  question: null,
  answer: null,
}

const Home = () => {
  const { currentUser } = useAuth()
  const dispatch = useAppDispatch()
  const { push, query, back } = useRouter()
  const [form, setForm] = useState(initState)
  const { theme } = useAppSelector((s) => s.ui)

  const selection = ["module", "lesson"]
  const textfields = ["lesson_name", "answer"]
  const isModLesComp = () => {
    const { module, lesson } = form
    return module && lesson
  }
  const isFormComp = () => {
    const { module, lesson, lesson_name, question, answer } = form
    return module && lesson && lesson_name && question && answer
  }

  if (!currentUser) push("/signin")

  const handleSelect =
    (props: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      e.currentTarget.firstElementChild?.setAttribute("disabled", "true")
      setForm((p) => ({
        ...p,
        [props]: `${props.charAt(0).toUpperCase()}${e.target.value}`,
      }))
    }
  const handleInput =
    (props: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.classList.remove("text-transparent")
      // e.currentTarget.classList.add("text-black")
      setForm((p) => ({ ...p, [props]: e.target.value }))
    }
  const handleClick = async () => {
    const { module, lesson, lesson_name, question, answer } = form
    if (module && lesson && lesson_name && question && answer) {
      const obj: QuestionsType = {
        refID: `${module}-${lesson}`,
        refName: lesson_name,
        question,
        answer,
      }
      try {
        await runTransaction(db, async (tsx) => {
          const subjectCol = getSubjectCol({
            docID: `${currentUser?.email}`,
            colName: "subjects",
          })
          const subjectD = doc(subjectCol, `${query.subject}`)
          const getSubjects = await tsx.get(subjectD)
          if (getSubjects.exists()) {
            tsx.update(subjectD, { questions: arrayUnion(obj) })
          }
        })
      } catch (err) {
        console.log(err)
      }
      dispatch(clearForms())
      setForm(initState)
    }
  }

  return (
    <Main
      title="Exam Builder | Write"
      description="The description must be atleast 150 characters"
      keywords="Exam, Builder, Academic, Study"
      language="English"
      visit="1 days"
    >
      <button onClick={() => back()}>Back</button>
      <h1 className="typo-main">{`${query.subject}`.replace(/_/g, " ")}</h1>
      <section className="grid grid-flow-col text-center items-center">
        {selection.map((v) => (
          <Select
            key={v}
            onChange={handleSelect(v)}
            choices={genNumArray()}
            label={v}
          />
        ))}
      </section>
      <section>
        <div className="grid grid-flow-col mx-2 gap-2">
          {textfields.sort().map((v) => (
            <Textfield
              disabled={!isModLesComp()}
              type="text"
              key={v}
              label={v}
              onChange={handleInput(v)}
            />
          ))}
        </div>
        <div className="mx-2">
          <Textfield
            disabled={!isModLesComp()}
            label="question"
            type="textarea"
            rows={6}
            onChange={handleInput("question")}
          />
        </div>
      </section>
      <div className="button-contain-center">
        <button
          className={`capitalize text-xs p-2 m-2 mt-0 ${colorButton(
            theme
          )} bg-night-owl-dark-3`}
          onClick={handleClick}
          disabled={!isFormComp()}
        >
          submit
        </button>
        {/* <BatchButton /> */}
      </div>
    </Main>
  )
}

// const BatchButton = () => {
//   const batch = writeBatch(db)
//   const { currentUser } = useAuth()
//   const { query } = useRouter()
//   let state: any[] = []
//   let questionHolder: any[] = []
//   choice.map(({ answer, ...rest }) => {
//     const formattedAns = answer.trim().toLowerCase().replace(/ /g, "_")
//     state.push(formattedAns)
//     questionHolder.push({ answer: formattedAns, ...rest })
//   })

//   const answerPool = [
//     {
//       refID: "M2-L1",
//       lessonName: "electrolytes",
//       refName: "electrolytes",
//       values: removeDuplicates(state),
//     },
//     ...otherAnswers,
//   ]

//   return (
//     <button
//       onClick={async () => {
//         const subjectCol = getSubjectCol({
//           docID: `${currentUser?.email}`,
//           colName: "subjects",
//         })
//         const subjectD = doc(subjectCol, `${query.subject}`)
//         questionHolder.map((v) =>
//           batch.update(subjectD, { questions: arrayUnion(v) })
//         )
//         answerPool.map((v) =>
//           batch.update(subjectD, { answers: arrayUnion(v) })
//         )

//         batch.commit()
//       }}
//     >
//       Batch
//     </button>
//   )
// }

export default Home
