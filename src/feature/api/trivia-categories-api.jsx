/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://opentdb.com";

export const triviaCategoriesApi = createApi({
  reducerPath: "triviaCategoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    triviaCategories: builder.query({
      query: () => "/api_category.php",
    }),
  }),
});

export const { useTriviaCategoriesQuery } = triviaCategoriesApi;
