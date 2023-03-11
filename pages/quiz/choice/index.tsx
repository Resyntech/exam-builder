import { useRouter } from "next/router"
import { useState } from "react"
import { useAuth } from "../../../components/AuthContext"
import { answerPool, choice } from "../../../src/M2-L1/electrolytes"
import { setChoiceAns } from "../../../src/redux/actions/choiceActions"
import { useAppDispatch } from "../../../src/redux/hooks"
import { getRandomInt, shuffle } from "../../../src/utils/randomAndShuffle"
import {
  ChoiceAnswersType,
  QuestionsType,
} from "../../../src/utils/types/types"

type ChoicesType = Array<string | number>[]

interface MultipleChoiceTypes {
  questions: QuestionsType
  choices: ChoicesType
}

const CHOICE = ({ questions, choices }: MultipleChoiceTypes) => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useAuth()
  const [state, setState] = useState({
    index: 0,
  })

  if (!currentUser) push("/signin")

  const handleAnswer =
    (props: ChoiceAnswersType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const button: HTMLButtonElement = e.currentTarget
      const isCorrect = props.answers.selected === props.answers.correct

      button.classList.add(isCorrect ? "correct" : "incorrect")
      button.parentElement
        ?.querySelectorAll("button")
        .forEach((child) => child.setAttribute("disabled", "true"))

      dispatch(setChoiceAns(props))
      setTimeout(() => {
        if (questions.length - 1 === state.index)
          return push("/quiz/choice/result")
        return setState((prev) => ({ ...prev, index: prev.index + 1 }))
      }, 1000)
    }

  return (
    <main className="w-full md:w-fit absolute-center">
      {[questions[state.index]].map(({ refID, question, answer }) => (
        <section className="container-multi-choice" key={state.index}>
          <h3>
            <span className="container-number">
              {`${state.index + 1}`.length <= 1
                ? `0${state.index + 1}`
                : `${state.index + 1}`}
            </span>
            {` What is ${question}?`}
          </h3>
          <div className="flex flex-col gap-2 p-2">
            {choices[state.index].map((v) => (
              <button
                className="button-choice"
                key={v}
                onClick={handleAnswer({
                  question,
                  answers: { correct: answer, selected: v },
                  index: state.index,
                })}
              >
                {`${v}`.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export async function getStaticProps() {
  const maxOptions = 3
  let choices: ChoicesType = []

  shuffle({ array: choice })
  choice.map(({ refID, answer }) => {
    const answers = answerPool.filter((v) => v.refID === refID)[0].values
    let filteredAns = answers.filter((v) => v !== answer)
    let randomAns = []

    while (randomAns.length <= maxOptions) {
      const pickedAns =
        filteredAns[getRandomInt({ min: 0, max: filteredAns.length - 1 })]
      filteredAns = filteredAns.filter((v) => v !== pickedAns)
      randomAns.push(pickedAns)
    }
    randomAns[getRandomInt({ min: 0, max: maxOptions })] = answer
    choices.push(randomAns)
  })

  return {
    props: { questions: choice, choices },
  }
}

export default CHOICE
