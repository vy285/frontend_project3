import { legacy_createStore as createStore } from "redux";

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload.token, userId: action.payload.userId };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;