import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Loading } from "../../../components"
import { useAuth } from "../../../components/AuthContext"
import { colorHeader } from "../../../components/theme"
import { setChoiceAns } from "../../../src/redux/actions/choiceActions"
import { useAppDispatch, useAppSelector } from "../../../src/redux/hooks"
import { getSubjectCol } from "../../../src/utils/firebase"
import { getRandomInt, shuffle } from "../../../src/utils/randomAndShuffle"
import { removeDuplicates } from "../../../src/utils/removeDuplicates"
import {
  ChoiceAnswersType,
  ChoiceIndStateTypes,
  HandleAnswerTypes,
  QuestionsType,
} from "../../../src/utils/types/pages"

const CHOICE = () => {
  const { push, back } = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useAuth()
  const { theme, email } = useAppSelector((s) => s.ui)
  const scope = useAppSelector((s) => s.choice.scope)
  const [{ index, choices, questions }, setState] =
    useState<ChoiceIndStateTypes>({
      index: 0,
      choices: [],
      questions: [],
    })

  if (!currentUser) push("/signin")

  async function callback() {
    const maxOptions = 3
    let choices: Array<string>[] = []
    const subjectCol = getSubjectCol({
      docID: `${email}`,
      colName: "subjects",
    })
    const subjectD = doc(subjectCol, `${scope.subject}`)
    const getSubjects = getDoc(subjectD)
    const d = await getSubjects
    if (d.exists()) {
      const DATA = d.data()
      const dAnswers = DATA.answers
      let track = 0
      let array = DATA.questions
      let answerPool: ChoiceAnswersType = {
        refID: scope.refID || "",
        refName: "",
        lessonName: "",
        answers: [],
      }

      type DataAnswerTypes = {
        lessonName: string
        refID: string
        refName: string
        values: string[]
      }

      shuffle({ array })
      array.map(
        (
          { refID, answer, referRefName, refName }: QuestionsType,
          i: number
        ) => {
          /*:TODO need to Reflect the customized Multiple Choice*/
          if (scope.refID === refID) {
            if (referRefName) {
              const filteredDA = dAnswers.filter(
                (da: DataAnswerTypes) => refName === da.refName
              )
              track += 1
              return filteredDA[0].values.map((val: string) =>
                answerPool.answers.push(val)
              )
            }
            return answerPool.answers.push(answer)
          }
        }
      )
      try {
        array.map(({ answer }: QuestionsType) => {
          const answers = removeDuplicates(answerPool.answers)
          // .filter(() => scope.refID === refID)

          let filteredAns = answers.filter((v: string) => v !== answer)
          let randomAns = []

          while (randomAns.length <= maxOptions) {
            const pickedAns =
              filteredAns[getRandomInt({ min: 0, max: filteredAns.length - 1 })]
            filteredAns = filteredAns.filter((v: string) => v !== pickedAns)
            randomAns.push(pickedAns)
          }
          randomAns[getRandomInt({ min: 0, max: maxOptions })] = answer
          choices.push(randomAns)
        })
        setState((p) => ({ ...p, questions: array, choices }))
      } catch (err) {
        alert("Looks like you've entered a non existing Module and/or Lesson")
        back()
      }
    }
  }
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAnswer =
    (props: HandleAnswerTypes) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const button: HTMLButtonElement = e.currentTarget
      const isCorrect = props.answers.selected === props.answers.correct

      button.classList.add(isCorrect ? "correct" : "incorrect")
      button.parentElement
        ?.querySelectorAll("button")
        .forEach((child) => child.setAttribute("disabled", "true"))

      dispatch(setChoiceAns(props))
      setTimeout(() => {
        if (index === questions.length - 1) return push("/quiz/choice/result")
        button.classList.remove("incorrect")
        button.classList.remove("correct")
        button.parentElement
          ?.querySelectorAll("button")
          .forEach((child) => child.removeAttribute("disabled"))
        return setState((prev) => ({ ...prev, index: prev.index + 1 }))
      }, 1000)
    }

  return (
    <main
      className={` grid place-content-center h-screen ${colorHeader(theme)}`}
    >
      {questions.length === 0 ? (
        <Loading />
      ) : (
        [questions[index]].map(({ refName, question, answer }, i) => (
          <section className="container-multi-choice" key={i}>
            <p className="text-xs">{refName}</p>
            <h3>
              <span className="container-number">
                {`${index + 1}`.length <= 1 ? `0${index + 1}` : `${index + 1}`}
              </span>
              {` What is ${question}?`}
            </h3>
            <div className="flex flex-col gap-2 p-2">
              {choices[index].map((v, ic) => (
                <button
                  className="button-choice"
                  key={ic}
                  onClick={handleAnswer({
                    question,
                    answers: { correct: answer, selected: `${v}` },
                    index: index,
                  })}
                >
                  {`${v}`.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  )
}

export default CHOICE
