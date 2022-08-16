/** @format */

import React, { memo, useCallback, useState } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import {
  controlUsersTrueanswerList,
  isClickinginAnswers,
  questionIncorrectAnswersShow,
} from "../../feature/question-listfor-user/question-listfor-user-slice";
import CardItem from "./card-item";

function CardsContainer({
  nextButtonClasses,
  prevButtonClasses,
  nextButtonHandel,
  prevButtonHandel,
}) {
  const [idIncorrectAnswer, setIdIncorrectAnswer] = useState(0);

  const dispatch = useDispatch();
  const { questionListForUser, questionNumber } = useSelector(
    (state) => state.questionListForUser
  );
  const data = questionListForUser;

  function listGroupItemHandle(item, id) {
    setIdIncorrectAnswer(id);

    let changedString = `${item.value}`.trim().toLocaleLowerCase();
    let changedAnswer = `${data[questionNumber].correct_answer}`
      .trim()
      .toLocaleLowerCase();

    if (changedString === changedAnswer) {
      dispatch(controlUsersTrueanswerList({ questionNumber, id }));
    } else {
      dispatch(isClickinginAnswers({ id, questionNumber }));
    }
  }

  function submitHandle() {
    const { incorrect_answers } = data[questionNumber];
    const some = incorrect_answers.some(
      (item) => item.isClick && !item.forSubmit
    );

    if (some) {
      dispatch(
        questionIncorrectAnswersShow({ questionNumber, id: idIncorrectAnswer })
      );
    }
  }

  function controlClassSubmit() {
    const { incorrect_answers } = data[questionNumber];

    const some = incorrect_answers.some(
      (item) => item.isClick && !item.forSubmit
    );

    if (some) {
      return "bg-success";
    }
    return "bg-secondary";
  }

  const cardBody = useCallback(
    (data, questionNumber) => {
      const cardItem = data[questionNumber].incorrect_answers?.map(
        (item, indx) => (
          <CardItem
            item={item}
            key={indx}
            indx={indx}
            listGroupItemHandle={listGroupItemHandle}
          />
        )
      );

      return cardItem;
    },
    [data, questionNumber]
  );

  if (!data.length > 0) {
    return (
      <div className="spinner__container">
        <Spinner animation="grow" />
      </div>
    );
  } else {
    return (
      <Card className="mt-3 rounded-0">
        <Card.Header>
          <Card.Title as="h5" style={{ fontWeight: "400" }}>
            {parse(`${data[questionNumber]?.question}`)}
          </Card.Title>
        </Card.Header>

        <Card.Body as={ListGroup} className="rounded-0">
          {cardBody(data, questionNumber)}
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
          <Button
            className={`testing__btns shadow-none ${
              prevButtonClasses.length > 0 ? prevButtonClasses : ""
            }`}
            onClick={() => prevButtonHandel(questionNumber - 1)}
          >
            Previous
          </Button>
          <Button
            className={`shadow-none ${controlClassSubmit()}`}
            onClick={submitHandle}
          >
            Submit
          </Button>
          <Button
            className={`testing__btns shadow-none ${
              nextButtonClasses.length > 0 ? nextButtonClasses : ""
            }`}
            onClick={() => nextButtonHandel(questionNumber + 1)}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default memo(CardsContainer);
