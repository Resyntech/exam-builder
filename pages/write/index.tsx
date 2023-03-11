import { useRouter } from "next/router"
import React, { useState } from "react"
import { Main, Select, Textfield } from "../../components"
import { useAuth } from "../../components/AuthContext"
import { FormTypes } from "../../src/utils/types/pages"
import { QuestionsType } from "../../src/utils/types/types"

const initState: FormTypes = {
  module: null,
  lesson: null,
  lesson_name: null,
  question: null,
  answer: null,
}

const Home = () => {
  const { currentUser } = useAuth()
  const { push } = useRouter()
  const [form, setForm] = useState(initState)

  const selection = ["module", "lesson"]
  const textfields = ["lesson_name", "answer"]
  const isModLesNull = () => {
    const { module, lesson } = form
    return module && lesson
  }
  const isFormNull = () => {
    const { module, lesson, lesson_name, question, answer } = form
    return module && lesson && lesson_name && question && answer
  }

  const choices: number[] = []
  const MAX_LENGTH = 20
  for (let x = 0; x < MAX_LENGTH; x++) {
    choices.push(x + 1)
  }

  if (!currentUser) push("/signin")

  const handleSelect =
    (props: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setForm((p) => ({
        ...p,
        [props]: `${props.charAt(0).toUpperCase()}${e.target.value}`,
      }))
    }
  const handleInput =
    (props: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [props]: e.target.value }))
    }
  const handleClick = () => {
    const { module, lesson, lesson_name, question, answer } = form
    if (module && lesson && lesson_name && question && answer) {
      const obj: QuestionsType[number] = {
        refID: `${module}-${lesson}`,
        refName: lesson_name,
        question,
        answer,
      }
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
      <div>
        <section className="grid grid-flow-col text-center items-center">
          {selection.map((v) => (
            <Select
              key={v}
              onChange={handleSelect(v)}
              choices={choices}
              label={v}
            />
          ))}
        </section>
        <section>
          <div className="grid grid-flow-col mx-2 gap-2">
            {textfields.sort().map((v) => (
              <Textfield
                disabled={!isModLesNull()}
                key={v}
                label={v}
                onChange={handleInput(v)}
              />
            ))}
          </div>
          <div className="mx-2">
            <Textfield
              disabled={!isModLesNull()}
              label="question"
              rows={6}
              onChange={handleInput("question")}
            />
          </div>
        </section>
        <div className="button-contain-center">
          <button
            className="capitalize text-xs p-2 m-2 mt-0 bg-green-200"
            onClick={handleClick}
            disabled={!isFormNull()}
          >
            submit
          </button>
        </div>
      </div>
    </Main>
  )
}

export default Home
