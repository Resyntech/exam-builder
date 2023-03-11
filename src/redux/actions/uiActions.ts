import { ThunkAction } from "redux-thunk"
import { RootState } from "../store"
import { DataAction } from "../types"
import * as actionTypes from "../types"

// Define the action creator to fetch the data from Firebase
export function toggleDarkMode(): ThunkAction<
  void,
  RootState,
  undefined,
  DataAction
> {
  return async (dispatch: any) => {
    try {
      const isDarkMode =
        localStorage.getItem("darkMode") === "true" ? true : false
      localStorage.setItem("darkMode", JSON.stringify(!isDarkMode))
      if (window !== undefined && isDarkMode !== null)
        return dispatch({
          type: actionTypes.DATA_ERROR,
          payload: !isDarkMode,
        })
      localStorage.setItem("darkMode", "true")
    } catch (error: any) {
      dispatch({
        type: actionTypes.DATA_ERROR,
        payload: error,
      })
    }
  }
}
export function setTheme(): ThunkAction<
  void,
  RootState,
  undefined,
  DataAction
> {
  return async (dispatch: any) => {
    try {
      const isDarkMode = localStorage.getItem("darkMode")
      if (window !== undefined && isDarkMode !== null)
        return dispatch({
          type: actionTypes.DATA_ERROR,
          payload: JSON.parse(isDarkMode),
        })
      return localStorage.setItem("darkMode", "false")
    } catch (error: any) {
      dispatch({
        type: actionTypes.DATA_ERROR,
        payload: error,
      })
    }
  }
}
