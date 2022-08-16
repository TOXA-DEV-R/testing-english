/** @format */

import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import { useTriviaCategoriesQuery } from "./feature/api/trivia-categories-api";
import HomePage from "./pages/home-page";
import TestingPage from "./pages/testing-page";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const { isLoading } = useTriviaCategoriesQuery();

  if (isLoading) {
    return (
      <div className="spinner__container">
        <Spinner animation="grow" />
      </div>
    );
  } else {
    return (
      <Layout>
        <Container className="container__app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/testing" element={<TestingPage />} />
          </Routes>
        </Container>
      </Layout>
    );
  }
}

export default App;
