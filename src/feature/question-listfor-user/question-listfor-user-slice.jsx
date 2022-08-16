/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestionList } from "../../api";
import { randomArray } from "../../custom/custom-hooks";

const initialState = {
  questionListForUserLength: 0,
  questionNumber: 0,
  questionListForUser: [],
  categoriesList: [],
  isLoading: false,
  isFinished: false,
};

export const getQuestionListForUser = createAsyncThunk(
  "questionListForUser/getCategoriesList",
  async (payload, thunkAPI) => {
    const response = await getQuestionList(payload.amount, payload.category);
    return response.results;
  }
);

const questionListForUserSlice = createSlice({
  name: "questionListForUser",
  initialState,
  reducers: {
    changeUserCheckedList(state, { payload }) {
      return {
        ...state,
        questionNumber: payload,
        userCheckedList: state.userCheckedList.map((item, indx) => {
          return payload === item.number ? { ...item, isChecked: true } : item;
        }),
      };
    },
    controlQuestionNumber(state, { payload }) {
      return {
        ...state,
        questionNumber: payload,
      };
    },
    controlUsersTrueanswerList(state, { payload }) {
      function isItClickingTrue() {
        let _list = [];

        _list = state.questionListForUser.map((question) => {
          return question.id === payload.questionNumber
            ? {
                ...question,
                isChecked: true,
                isTrueanswer: true,
                incorrect_answers: question.incorrect_answers.map((item) => {
                  return item.id === payload.id
                    ? { ...item, isClick: true }
                    : { ...item, isClick: false };
                }),
              }
            : question;
        });
        return _list;
      }
      return {
        ...state,
        questionListForUser: isItClickingTrue(),
      };
    },
    isClickinginAnswers(state, { payload }) {
      function ControlincorrectAnswers(item) {
        return item.id === payload.id
          ? { ...item, isClick: true }
          : { ...item, isClick: false };
      }

      function changeSomedata() {
        let _res = [];

        _res = state.questionListForUser.map((question) => {
          return question.id === state.questionNumber
            ? {
                ...question,
                isChecked: true,
                incorrect_answers: question.incorrect_answers.map(
                  ControlincorrectAnswers
                ),
              }
            : question;
        });

        return _res;
      }

      return {
        ...state,
        questionListForUser: changeSomedata(),
      };
    },
    questionIncorrectAnswersShow(state, { payload }) {
      function changedIncorrectAnswers(item) {
        return item.isTrue
          ? { ...item, forSubmit: true, isShowingSubmit: true }
          : { ...item, forSubmit: true, isShowingSubmit: false };
      }

      return {
        ...state,
        questionListForUser: state.questionListForUser.map((question) => {
          return question.id === payload.questionNumber
            ? {
                ...question,
                isClickedSubmit: true,
                incorrect_answers: question.incorrect_answers.map(
                  changedIncorrectAnswers
                ),
              }
            : question;
        }),
      };
    },
    finalResult(state, action) {
      state.isFinished = true;
    },
    reloadPage() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getQuestionListForUser.fulfilled, (state, { payload }) => {
      function addThings() {
        let _res = [];
        _res = payload.map((question, index) => {
          return {
            correct_answer: question.correct_answer,
            question: question.question,
            isChecked: false,
            id: index,
            isTrueanswer: false,
            isClickedSubmit: false,
            incorrect_answers: question.incorrect_answers.map((item, indx) => ({
              value: item,
              isClick: false,
              isTrue: false,
              forSubmit: false,
              isShowingSubmit: false,
              id: indx,
            })),
          };
        });
        return _res;
      }

      function formattedData() {
        let _list = [];

        _list = addThings().map((question) => {
          let questionToChange = [...question.incorrect_answers];

          questionToChange = [
            ...questionToChange,
            {
              value: question.correct_answer,
              isTrue: true,
              isClick: false,
              id: question.incorrect_answers.length,
              forSubmit: false,
              isShowingSubmit: false,
            },
          ];
          return {
            ...question,
            incorrect_answers: randomArray(questionToChange),
          };
        });
        return _list;
      }

      return {
        ...state,
        isLoading: true,
        categoriesList: [],
        questionListForUserLength: payload.length,
        questionListForUser: formattedData(),
      };
    });
  },
});

export const {
  changeUserCheckedList,
  controlQuestionNumber,
  isClickinginAnswers,
  controlUsersTrueanswerList,
  finalResult,
  questionIncorrectAnswersShow,
  reloadPage,
} = questionListForUserSlice.actions;

export default questionListForUserSlice.reducer;
