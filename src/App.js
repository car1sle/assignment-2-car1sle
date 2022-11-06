import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import TimersView from "./views/TimersView";

const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const App = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<TimersView />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
