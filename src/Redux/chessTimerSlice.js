import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time1: 300,
  time2: 300,
  gameMode: "default",
  time: 0,
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
  },
});

export const { setTime1, setTime2, setGameMode, setTime } =
  chessTimerSlice.actions;

export default chessTimerSlice.reducer;
