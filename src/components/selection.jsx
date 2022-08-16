/** @format */

import { memo, useEffect } from "react";
import { useRef } from "react";
import Form from "react-bootstrap/Form";

function Selection({
  title,
  data = [],
  paddingTopClass,
  controlSlectionValue,
  setAmount,
  setCategory,
}) {
  const selectionref = useRef(null);

  function selectionChanging(event, defaultValue) {
    if (controlSlectionValue) {
      setAmount(defaultValue ? defaultValue.value : event.target.value);
    } else {
      setCategory(defaultValue ? defaultValue.value : event.target.value);
    }
  }

  useEffect(function () {
    selectionChanging(null, selectionref.current);
  }, []);

  return (
    <div className={paddingTopClass ? paddingTopClass : ""}>
      <span className="slection__numberOf-questions mb-1 d-block">{title}</span>
      <Form.Select
        aria-label="1"
        className="border-0 rounded-0 border-bottom border-dark p-1 ps-0 pe-0 shadow-none form__selection"
        ref={selectionref}
        onChange={(event) => selectionChanging(event, null)}
      >
        {data.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
export default memo(Selection);
