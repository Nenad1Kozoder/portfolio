import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
  homeAnimationDone: boolean;
}

const initialState: HomeState = {
  homeAnimationDone: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeAnimationDone(state, action: PayloadAction<boolean>) {
      state.homeAnimationDone = action.payload;
    },
  },
});

export const { setHomeAnimationDone } = homeSlice.actions;
export default homeSlice.reducer;
