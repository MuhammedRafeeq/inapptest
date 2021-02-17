import { AUTHENTICATE, SET_USER_DATA } from "../actionTypes";

const initialState = {
  isLoggedIn: false,
  userData: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: { ...action.payload },
      };
    case AUTHENTICATE:
      return {
        ...state,
        isLoggedIn:
          Object.keys(state.userData).length &&
          state.userData.email == action.payload.email &&
          state.userData.password == action.payload.password,
      };
    default:
      return state;
  }
}
