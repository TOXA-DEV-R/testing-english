/** @format */

import { memo, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Selection from "../components/selection";
import { useTriviaCategoriesQuery } from "../feature/api/trivia-categories-api";
import { openNavbarFeature } from "../feature/navbar-cantrol/navbar-slice";

function HomePage() {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(0);

  const navigate = useNavigate();

  const { data = [] } = useTriviaCategoriesQuery();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="selection__container mt-4">
        <Selection
          title="Number Of Questions:"
          data={[
            { name: "10", id: 10 },
            { name: "15", id: 15 },
            { name: "20", id: 20 },
            { name: "25", id: 25 },
            { name: "30", id: 30 },
          ]}
          controlSlectionValue={true}
          setAmount={setAmount}
        />
        <Selection
          title="Select Category:"
          data={data?.trivia_categories}
          paddingTopClass="pt-2"
          controlSlectionValue={false}
          setCategory={setCategory}
        />
        <div className="d-grid gap-2">
          <Button
            variant="success"
            className="mt-3 shadow-none"
            onClick={() => {
              navigate("testing", { state: { amount, category } });
              dispatch(openNavbarFeature());
            }}
          >
            START
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(HomePage);
