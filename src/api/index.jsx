/** @format */

import axios from "axios";

/** @format */
const baseUrl = "https://opentdb.com";

const api = axios.create({
  baseURL: baseUrl,
});

export const getQuestionList = async (amount, category) => {
  const { data } = await api.get(
    `/api.php?amount=${amount}&category=${category}`
  );
  return data;
};
