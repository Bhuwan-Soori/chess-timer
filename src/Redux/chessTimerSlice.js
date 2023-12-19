import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time1: 300,
  time2: 300,
  gameMode: "default",
  time: 0,
  whiteColor: "#f2f2f2",
  blackColor: "#434343",
};

const chessTimerSlice = createSlice({
  name: "chessTimer",
  initialState,
  reducers: {
    setTime1: (state, action) => {
      state.time1 = action.payload;
    },
    setTime2: (state, action) => {
      state.time2 = action.payload;
    },
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setWhiteColor: (state, action) => {
      state.whiteColor = action.payload;
    },
    setBlackColor: (state, action) => {
      state.blackColor = action.payload;
    },
  },
});

export const {
  setTime1,
  setTime2,
  setGameMode,
  setTime,
  setWhiteColor,
  setBlackColor,
} = chessTimerSlice.actions;

export default chessTimerSlice.reducer;
