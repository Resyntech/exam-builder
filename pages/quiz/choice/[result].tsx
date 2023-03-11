import { collection } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/router"
// import { useState } from "react"
import { useAuth } from "../../../components/AuthContext"
import { useAppSelector } from "../../../src/redux/hooks"
import { db } from "../../../src/utils/firebase"

const Result = () => {
  const result = useAppSelector((s) => s.choice.result)
  const userCollect = collection(db, "user")
  const { currentUser } = useAuth()
  const { push } = useRouter()
  // const [state, setState] = useState<number>(0)
  let array = 0
  // const test = addDoc(userCollect, {
  //   email: "alarma1930681@mls.ceu.edu.ph",
  // })

  if (!currentUser) push("/")

  return (
    <div>
      {result.map(({ correct, selected, question }, i) => {
        if (selected === correct) array += 1
        const isCorrect = selected === correct

        const format = (val: string) => val.replace(/_/g, " ")

        return (
          <section className="container-result" key={i}>
            <h3 className="font-semibold">{`What is ${question}?`}</h3>
            <p
              className={
                isCorrect
                  ? "capitalize text-base before:content-['✓_'] before:text-green-500"
                  : "capitalize text-base before:content-['X_'] text-red-500"
              }
            >
              {format(`${selected}`)}
              {!isCorrect && (
                <span className="text-base text-green-500">
                  {` ${format(`${correct}`)}`}
                </span>
              )}
            </p>
          </section>
        )
      })}
      <p>Total: {array}</p>
      <div className="button-contain-center">
        <Link href="/quiz" passHref>
          <a>confirm</a>
        </Link>
      </div>
    </div>
  )
}

export default Result
