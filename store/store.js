import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  homeAnimationDone: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOME_ANIMATION_END":
      return { ...state, homeAnimationDone: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    homeAnimationDone: userReducer,
  },
});
