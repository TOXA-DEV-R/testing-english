/** @format */

import { memo } from "react";
import { useSelector } from "react-redux";
import Buttons from "./buttons";

function ButtonsContainer({ controlquestionNumberHandle }) {
  const { questionListForUser } = useSelector(
    (state) => state.questionListForUser
  );

  return (
    <div
      className="btn-group mt-3 testing__buttons-container"
      role="group"
      aria-label="Basic radio toggle button group"
      style={{ width: "100%" }}
    >
      {questionListForUser.map((item, indx) => {
        return (
          <Buttons
            item={item}
            indx={indx}
            controlquestionNumberHandle={controlquestionNumberHandle}
            key={indx}
          />
        );
      })}
    </div>
  );
}

export default memo(ButtonsContainer);
