import Link from "next/link"
import { Loading, Main } from "../components"
import { useAuth } from "../components/AuthContext"

const Index = () => {
  const { currentUser } = useAuth()
  return (
    <Main
      title="Exam Builder"
      description="The description must be atleast 150 characters"
      keywords="Exam, Builder, Academic, Study"
      language="English"
      visit="1 days"
    >
      {!currentUser ? (
        <h1>
          Please sign in{" "}
          <span>
            <Link passHref href="/signin">
              <a className="capitalize underline">signin</a>
            </Link>
          </span>{" "}
          to continue
        </h1>
      ) : (
        <>
          <h1 className="absolute-center z-[100] text-center">
            This Website will continue to upgrade...
          </h1>
          <Loading />
        </>
      )}
    </Main>
  )
}

export default Index
