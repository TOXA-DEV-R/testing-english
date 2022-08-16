/** @format */

import React, { memo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calcPercent } from "../custom/custom-hooks";
import { closeNavbarFeature } from "../feature/navbar-cantrol/navbar-slice";
import {
  finalResult,
  reloadPage,
} from "../feature/question-listfor-user/question-listfor-user-slice";

function ModalWindow() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { questionListForUserLength, questionListForUser } = useSelector(
    (state) => state.questionListForUser
  );
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    dispatch(finalResult());
    setShow(true);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} className="shadow-none">
        FINISH
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Your results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title
            as="h5"
            className="fw-normal"
            style={{ textAlign: "center" }}
          >{`${calcPercent(
            questionListForUser,
            "isTrueanswer"
          )} / ${questionListForUserLength}`}</Modal.Title>
          <p className=" mt-2 mb-2" style={{ textAlign: "center" }}>
            or
          </p>
          <Modal.Title
            as="h5"
            className="fw-normal"
            style={{ textAlign: "center" }}
          >
            {`${Number(
              (100 * calcPercent(questionListForUser, "isTrueanswer")) /
                questionListForUserLength
            )}%`}
          </Modal.Title>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-nowrap justify-content-between">
          <Button
            variant="light"
            className="border-01 border-primary rounded-0 w-50 text-primary"
            onClick={handleClose}
          >
            Ok
          </Button>
          <Button
            variant="light"
            className="border-01 border-danger rounded-0 w-50 text-danger"
            onClick={() => {
              navigate("/");
              dispatch(reloadPage());
              dispatch(closeNavbarFeature());
            }}
          >
            Go home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(ModalWindow);
