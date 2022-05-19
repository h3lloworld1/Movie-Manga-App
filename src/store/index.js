import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { showAnimeState: true };

const contentSwitch = createSlice({
  name: "animeMangaSwitcher",
  initialState: initialState,
  reducers: {
    contentSwitcher(state) {
      state.showAnimeState = !state.showAnimeState;
    },
  },
});

const store = configureStore({
  reducer: contentSwitch.reducer,
});

export const switchActions = contentSwitch.actions;

export default store;
