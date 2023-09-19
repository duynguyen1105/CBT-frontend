import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "slices/app";

const reducer = combineReducers({
  app: appReducer
});

export default reducer;
