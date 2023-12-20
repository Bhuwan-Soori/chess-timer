import { combineReducers } from "@reduxjs/toolkit";
import chessTimerReducer from "../Redux/chessTimerSlice";

const rootReducer = combineReducers({
  chessTimer: chessTimerReducer,
});

export default rootReducer;
