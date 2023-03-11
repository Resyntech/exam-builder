export type AnswersType = {
  correct: string | number
  selected: string | number
}

export interface AnswersExtended extends AnswersType {
  question: string
}

export type ChoiceAnswersType = {
  question: string
  answers: AnswersType
  index: number
}

export type QuestionsType = {
  refID: string
  refName?: string
  question: string
  answer: number | string
}[]
