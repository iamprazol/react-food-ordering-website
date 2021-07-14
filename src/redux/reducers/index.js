import { combineReducer } from "react";
import { registration } from "./regsitration.reducer";

const rootReducer = combineReducer({
  registration,
});

export default rootReducer;
