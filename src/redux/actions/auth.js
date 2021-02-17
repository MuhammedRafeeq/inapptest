import { SET_USER_DATA, AUTHENTICATE } from "../actionTypes";

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});

export const authenticate = (payload) => ({
  type: AUTHENTICATE,
  payload,
});
