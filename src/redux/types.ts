import { ScopeTypes } from "../utils/types/types"

export const SET_THEME = "SET_THEME"
export const SET_CHOICE_EXAM = "SET_CHOICE_EXAM"
export const SET_CHOICE_ANSWERS = "SET_CHOICE_ANSWERS"
export const SET_SUBJECT_MODAL = "SET_SUBJECT_MODAL"
export const CLEAR_FORMS = "CLEAR_FORMS"
export const CLEAR_CHOICE_ANSWERS = "CLEAR_CHOICE_ANSWERS"
export const SET_EMAIL = "SET_EMAIL"
export const DATA_ERROR = "DATA_ERROR"

// Define types for the data and error payloads
export interface setTheme {
  type: typeof SET_THEME
  payload: "discord" | "default"
}
export interface setChoiceExam {
  type: typeof SET_CHOICE_EXAM
  payload: ScopeTypes
}
export interface setChoiceAns {
  type: typeof SET_CHOICE_ANSWERS
  payload: { props: { correct: string; selected: string }; index: number }
}
export interface setSubjectModal {
  type: typeof SET_SUBJECT_MODAL
  payload: boolean
}
export interface clearForms {
  type: typeof CLEAR_FORMS
  payload: void
}
export interface clearChoiceAns {
  type: typeof CLEAR_CHOICE_ANSWERS
  payload: void
}
export interface setEmail {
  type: typeof SET_EMAIL
  payload: string
}
export interface setError {
  type: typeof DATA_ERROR
  payload: Error
}

// Define a union type for all possible actions
export type DataAction =
  | setTheme
  | setChoiceExam
  | setChoiceAns
  | setSubjectModal
  | clearForms
  | clearChoiceAns
  | setEmail
  | setError
