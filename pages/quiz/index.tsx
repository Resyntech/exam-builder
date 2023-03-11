import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Main } from "../../components"
import { useAuth } from "../../components/AuthContext"
import { clearChoiceAns } from "../../src/redux/actions/choiceActions"
import { useAppDispatch } from "../../src/redux/hooks"

const Index = () => {
  const { currentUser } = useAuth()
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const subjects = [
    { name: "clinical_chemistry" },
    { name: "clinical_parasitology" },
    { name: "hematology_2" },
    { name: "immunology_and_serology" },
    { name: "mycology_and_virology" },
    { name: "special_topics" },
  ]
  useEffect(() => {
    dispatch(clearChoiceAns())
  }, [dispatch])

  if (!currentUser) push("/signin")

  return (
    <Main
      title="Exam Builder | Quiz"
      description="The description must be atleast 150 characters"
      keywords="Exam, Builder, Academic, Study"
      language="English"
      visit="1 days"
    >
      {subjects.map(({ name }) => (
        <Link key={name} href={`/quiz/choice`} passHref>
          <a className="text-xs text-center capitalize p-2 border-2 border-transparent bg-white shadow-md rounded-md">
            {name.replace(/_/g, " ")}
          </a>
        </Link>
      ))}
    </Main>
  )
}

export default Index
