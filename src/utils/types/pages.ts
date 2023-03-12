export interface FormTypes {
  module: string | null
  lesson: string | null
  lesson_name: string | null
  question: string | null
  answer: string | null
}

export type QuestionsType = {
  refID: string
  referRefName?: boolean
  refName: string
  question: string
  answer: string
}

export type ChoiceAnswersType = {
  refID: string
  lessonName: string
  refName: string
  answers: any[]
}

export interface ChoiceIndStateTypes {
  index: number
  choices: Array<string>[]
  questions: QuestionsType[]
}
export type HandleAnswerTypes = {
  question: string
  answers: { correct: string; selected: string }
  index: number
}
