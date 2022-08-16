/** @format */

import React, { memo, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ButtonsContainer from "../components/buttons/buttons-container";
import CardsContainer from "../components/cards/cards-container";
import {
  getQuestionListForUser,
  controlQuestionNumber,
} from "../feature/question-listfor-user/question-listfor-user-slice";

const TestingPage = () => {
  const { amount, category } = useLocation()?.state;

  const dispatch = useDispatch();

  const { questionListForUser, questionNumber } = useSelector(
    (state) => state.questionListForUser
  );

  const [nextButtonClasses, setNextButtonClasses] = useState("");
  const [prevButtonClasses, setPrevButtonClasses] = useState(
    "testing__btns-disayble"
  );

  const dataLength = questionListForUser?.length - 1;
  const CONTROL_BUTTONS_NUMBER = 0;

  function controlquestionNumberHandle(indx) {
    dispatch(controlQuestionNumber(indx));

    setNextButtonClasses("");
    setPrevButtonClasses("");

    if (dataLength === indx) {
      setNextButtonClasses("testing__btns-disayble");
    }
    if (CONTROL_BUTTONS_NUMBER === indx) {
      setPrevButtonClasses("testing__btns-disayble");
    }
  }

  function nextButtonHandel(indx) {
    if (dataLength >= indx) {
      if (dataLength === indx) {
        setNextButtonClasses("bg-secondary");
        dispatch(controlQuestionNumber(indx));
      } else {
        dispatch(controlQuestionNumber(indx));
        setNextButtonClasses("");
      }
    }
    setPrevButtonClasses("");
  }

  function prevButtonHandel(indx) {
    if (indx > CONTROL_BUTTONS_NUMBER) {
      setPrevButtonClasses("");
      dispatch(controlQuestionNumber(indx));
    } else {
      setPrevButtonClasses("bg-secondary");
      dispatch(controlQuestionNumber(0));
    }
    setNextButtonClasses("");
  }

  useEffect(() => {
    dispatch(getQuestionListForUser({ amount, category }));
  }, []);

  if (!dataLength > 0) {
    return (
      <div className="spinner__container">
        <Spinner animation="grow" />
      </div>
    );
  } else {
    return (
      <div>
        <ButtonsContainer
          questionNumber={questionNumber}
          controlquestionNumberHandle={controlquestionNumberHandle}
        />
        <CardsContainer
          nextButtonClasses={nextButtonClasses}
          prevButtonClasses={prevButtonClasses}
          nextButtonHandel={nextButtonHandel}
          prevButtonHandel={prevButtonHandel}
        />
      </div>
    );
  }
};

export default memo(TestingPage);
