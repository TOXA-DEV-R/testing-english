/** @format */

import { memo } from "react";
import { useSelector } from "react-redux";

function Buttons({ item, indx, controlquestionNumberHandle }) {
  const { questionNumber, isFinished } = useSelector(
    (state) => state.questionListForUser
  );

  function controlButtonsClass() {
    if (!isFinished) {
      if (questionNumber === indx) {
        return "btn-primary";
      } else if (item.isClickedSubmit) {
        return "btn-warning";
      } else {
        if (item.isChecked) {
          return "testing__btn-checked";
        }
      }
    } else {
      if (!item.isChecked) {
        return "btn-warning";
      } else {
        return "btn-primary";
      }
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-outline-primary shadow-none testing__btn rounded-0 ${controlButtonsClass()} `}
      onClick={() => controlquestionNumberHandle(indx)}
    >
      {indx + 1}
    </button>
  );
}

export default memo(Buttons);
