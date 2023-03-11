import { DataAction } from "../types"
import * as actionTypes from "../types"

interface UiStateTypes {
  darkMode: boolean
  error: Error | null
}

const initialState: UiStateTypes = {
  darkMode: false,
  error: null,
}

// Define the data reducer function
export default function uiReducer(
  state: UiStateTypes = initialState,
  action: DataAction
): UiStateTypes {
  switch (action.type) {
    case actionTypes.DATA_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
