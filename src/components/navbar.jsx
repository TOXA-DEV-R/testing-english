/** @format */

import { memo } from "react";
import { Container, Navbar as NavbarBots } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { closeNavbarFeature } from "../feature/navbar-cantrol/navbar-slice";
import { reloadPage } from "../feature/question-listfor-user/question-listfor-user-slice";
import ModalWindow from "./modal";

function Navbar() {
  const { isOpen } = useSelector((state) => state.navbarFeature);
  const { questionListForUserLength, questionNumber } = useSelector(
    (state) => state.questionListForUser
  );
  const dispatch = useDispatch();

  return (
    <NavbarBots className="bg-light">
      <Container className="d-flex justify-content-between">
        <Link
          to="/"
          className="navbar__brand"
          onClick={() => {
            dispatch(reloadPage());
            dispatch(closeNavbarFeature());
          }}
        >
          FinalExam
        </Link>
        {isOpen && (
          <NavbarBots.Text>
            <NavbarBots.Text>{questionNumber + 1}</NavbarBots.Text>/
            <NavbarBots.Text>{questionListForUserLength}</NavbarBots.Text>
          </NavbarBots.Text>
        )}
        {isOpen && <ModalWindow />}
      </Container>
    </NavbarBots>
  );
}

export default memo(Navbar);
