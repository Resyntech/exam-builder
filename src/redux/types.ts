import { AnswersExtended } from "../utils/types/types"

export const SET_CHOICE_ANSWERS = "SET_CHOICE_ANSWERS"
export const CLEAR_CHOICE_ANSWERS = "CLEAR_CHOICE_ANSWERS"
export const DATA_ERROR = "DATA_ERROR"

// Define types for the data and error payloads
export interface setChoiceAns {
  type: typeof SET_CHOICE_ANSWERS
  payload: { props: AnswersExtended; index: number }
}
export interface clearChoiceAns {
  type: typeof CLEAR_CHOICE_ANSWERS
  payload: void
}
export interface setError {
  type: typeof DATA_ERROR
  payload: Error
}

// Define a union type for all possible actions
export type DataAction = setChoiceAns | clearChoiceAns | setError
