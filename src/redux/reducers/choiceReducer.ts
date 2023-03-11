import { DataAction } from "../types"
import * as actionTypes from "../types"
import { AnswersExtended } from "../../utils/types/types"

type ChoiceAnswersType = {
  result: AnswersExtended[]
}

const initialState: ChoiceAnswersType = {
  result: [],
}

// Define the data reducer function
export default function choiceReducer(
  state: ChoiceAnswersType = initialState,
  action: DataAction
): ChoiceAnswersType {
  switch (action.type) {
    case actionTypes.SET_CHOICE_ANSWERS:
      let array = [...state.result]
      array[action.payload.index] = action.payload.props
      return {
        ...state,
        result: array,
      }
    case actionTypes.CLEAR_CHOICE_ANSWERS:
      return {
        ...state,
        result: [],
      }
    default:
      return state
  }
}
