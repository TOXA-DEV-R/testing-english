/** @format */

import React, { memo } from "react";
import { ListGroup } from "react-bootstrap";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function CardItem({ item, listGroupItemHandle, indx }) {
  const { isFinished } = useSelector((state) => state.questionListForUser);

  function cardItemClassControl() {
    const { isClick, forSubmit, isTrue, isShowingSubmit } = item;
    if (!isFinished) {
      if (isTrue && isShowingSubmit) return "bg-success";
      if (!isShowingSubmit && isClick && forSubmit) return "bg-warning";
      if (isClick) return "bg-light";
    } else {
      if (isTrue && isShowingSubmit) return "bg-success";
      if (isClick) return "bg-warning";
      if (isTrue) return "bg-success";
    }

    return "";
  }

  return (
    <ListGroup.Item
      className={`border-0 ${cardItemClassControl()}`}
      key={indx}
      onClick={() => listGroupItemHandle(item, item.id)}
    >
      {parse(`${item.value}`)}
    </ListGroup.Item>
  );
}

export default memo(CardItem);
