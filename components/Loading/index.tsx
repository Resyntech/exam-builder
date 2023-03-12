import Head from "next/head"
import Image from "next/image"
import { colorChildren } from "../theme"
import { Animation } from "./Animation"

const Loading = () => {
  const DIMENSION = 80
  return (
    <div className="absolute-center">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      </Head>
      <div className={`relative ${colorChildren("default")}`}>
        <Image
          width={DIMENSION}
          height={DIMENSION}
          src="/favicon.svg"
          alt="Exam Builder Icon"
        />
        <Animation isChild />
      </div>
    </div>
  )
}

export default Loading
