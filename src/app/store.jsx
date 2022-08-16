/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { triviaCategoriesApi } from "../feature/api/trivia-categories-api";
import navbarControlSlice from "../feature/navbar-cantrol/navbar-slice";
import questionListForUserSlice from "../feature/question-listfor-user/question-listfor-user-slice";

export const store = configureStore({
  reducer: {
    questionListForUser: questionListForUserSlice,
    navbarFeature: navbarControlSlice,
    [triviaCategoriesApi.reducerPath]: triviaCategoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(triviaCategoriesApi.middleware),
});
