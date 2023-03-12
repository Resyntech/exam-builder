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
export function setDarkTheme(): ThunkAction<
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
export function setSubjectModal(
  props: boolean
): ThunkAction<void, RootState, undefined, DataAction> {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: actionTypes.SET_SUBJECT_MODAL,
        payload: props,
      })
    } catch (error: any) {
      console.log(error)
      // dispatch({
      //   type: actionTypes.DATA_ERROR,
      //   payload: error,
      // })
    }
  }
}
export function clearForms(): ThunkAction<
  void,
  RootState,
  undefined,
  DataAction
> {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: actionTypes.CLEAR_FORMS,
        payload: null,
      })
    } catch (error: any) {
      console.log(error)
      // dispatch({
      //   type: actionTypes.DATA_ERROR,
      //   payload: error,
      // })
    }
  }
}
export function setEmail(
  props: string
): ThunkAction<void, RootState, undefined, DataAction> {
  return async (dispatch: any) => {
    try {
      dispatch({
        type: actionTypes.SET_EMAIL,
        payload: props,
      })
    } catch (error: any) {
      console.log(error)
      // dispatch({
      //   type: actionTypes.DATA_ERROR,
      //   payload: error,
      // })
    }
  }
}
export function setTheme(
  props: string
): ThunkAction<void, RootState, undefined, DataAction> {
  return async (dispatch: any) => {
    try {
      localStorage.setItem("theme", props)
      dispatch({
        type: actionTypes.SET_THEME,
        payload: props,
      })
    } catch (error: any) {
      console.log(error)
      // dispatch({
      //   type: actionTypes.DATA_ERROR,
      //   payload: error,
      // })
    }
  }
}
export function setInitTheme(): ThunkAction<
  void,
  RootState,
  undefined,
  DataAction
> {
  return async (dispatch: any) => {
    try {
      const theme = localStorage.getItem("theme")
      if (window !== undefined && theme !== null)
        return dispatch({
          type: actionTypes.SET_THEME,
          payload: theme,
        })
    } catch (error: any) {
      dispatch({
        type: actionTypes.DATA_ERROR,
        payload: error,
      })
    }
  }
}
