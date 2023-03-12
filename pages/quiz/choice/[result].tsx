import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useAuth } from "../../../components/AuthContext"
import { colorHeader } from "../../../components/theme"
import { useAppSelector } from "../../../src/redux/hooks"
import { userCollection } from "../../../src/utils/firebase"

const Result = () => {
  const result = useAppSelector((s) => s.choice.result)
  const theme = useAppSelector((s) => s.ui.theme)
  const { currentUser } = useAuth()
  const { push } = useRouter()
  let array = 0

  if (!currentUser) push("/")

  const handleConfirm = async () => {
    await updateDoc(doc(userCollection, `${currentUser?.email}`), {
      results: arrayUnion({ result, dateTaken: new Date() }),
    })
    push("/quiz")
  }

  return (
    <div>
      {result.map(({ correct, selected, question }, i) => {
        if (selected === correct) array += 1
        const isCorrect = selected === correct

        const format = (val: string) => val.replace(/_/g, " ")

        return (
          <section className={`container-result ${colorHeader(theme)}`} key={i}>
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
        <button onClick={handleConfirm}>confirm</button>
      </div>
    </div>
  )
}

export default Result
