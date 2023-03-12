import Head from "next/head"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Children, Footer, Header, Select } from "../../components"
import { setChoiceExam } from "../../src/redux/actions/choiceActions"
import { useAppDispatch } from "../../src/redux/hooks"
import { genNumArray } from "../../src/utils/genNumArray"

const initState = {
  module: null,
  lesson: null,
}

const Settings = () => {
  const dispatch = useAppDispatch()
  const { push, query } = useRouter()
  const [{ lesson, module }, setForm] = useState(initState)
  const selection = ["module", "lesson"]
  const isFormNull = !(module && lesson)

  const handleSelect =
    (props: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault()
      e.currentTarget.firstElementChild?.setAttribute("disabled", "true")
      setForm((p) => ({
        ...p,
        [props]: `${props.charAt(0).toUpperCase()}${e.target.value}`,
      }))
    }

  const handleSubmit = () => {
    if (!isFormNull) {
      dispatch(
        setChoiceExam({
          subject: `${query.subject}`,
          refID: `${module}-${lesson}`,
        })
      )
      push("/quiz/choice")
    }
  }

  return (
    <main>
      <Head>
        <title>Exam Builder | Settings</title>
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Children>
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
        <button
          className="text-xs"
          onClick={handleSubmit}
          disabled={isFormNull}
        >
          submit
        </button>
      </Children>
      <Footer />
    </main>
  )
}

export default Settings
