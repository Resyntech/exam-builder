import { DataAction } from "../types"
import * as actionTypes from "../types"

interface UiStateTypes {
  darkMode: boolean
  theme: "discord" | "default"
  subjectModal: boolean
  clearingForms: number
  email: string | null
  error: Error | null
}

const initialState: UiStateTypes = {
  darkMode: false,
  theme: "default",
  subjectModal: false,
  clearingForms: 0,
  email: null,
  error: null,
}

// Define the data reducer function
export default function uiReducer(
  state: UiStateTypes = initialState,
  action: DataAction
): UiStateTypes {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      }
    case actionTypes.SET_SUBJECT_MODAL:
      return {
        ...state,
        subjectModal: action.payload,
      }
    case actionTypes.CLEAR_FORMS:
      return {
        ...state,
        clearingForms: state.clearingForms + 1,
      }
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    default:
      return state
  }
}
