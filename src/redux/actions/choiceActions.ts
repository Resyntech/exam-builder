import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { DataAction } from "../types"
import * as actionTypes from "../types"
import { ChoiceAnswersType } from "../../utils/types/types"

export function setChoiceAns({
  question,
  answers,
  index,
}: ChoiceAnswersType): ThunkAction<void, RootState, undefined, DataAction> {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: actionTypes.SET_CHOICE_ANSWERS,
        payload: { props: { ...answers, question }, index },
      })
    } catch (error: any) {
      console.log(error)
      //   dispatch({
      //     type: actionTypes.DATA_ERROR,
      //     payload: error,
      //   })
    }
  }
}
export function clearChoiceAns(): ThunkAction<
  void,
  RootState,
  undefined,
  DataAction
> {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: actionTypes.CLEAR_CHOICE_ANSWERS,
        payload: null,
      })
    } catch (error: any) {
      console.log(error)
      //   dispatch({
      //     type: actionTypes.DATA_ERROR,
      //     payload: error,
      //   })
    }
  }
}
