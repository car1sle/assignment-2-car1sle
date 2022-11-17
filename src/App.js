import React from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";
import CreateTimerView from "./views/CreateTimerView";
import ButtonsView from "./views/ButtonsView";
import { AppProvider } from "./AppProvider";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const TimersPage = () => {
  return (
    <Container>
      <AppProvider>
        <ButtonsView />
        <TimersView />
        <div style={{ margin: "0 auto", textAlign: "center",}}>
          <Link to="/add">
            <button style={{ margin: "0 auto", textAlign: "center",}}>Add a timer</button>
          </Link>
        </div>
      </AppProvider>
    </Container>
  );
};

const CreateTimerPage = () => {
  return (
    <Container>
      <AppProvider>
        <CreateTimerView />
      </AppProvider>
    </Container>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimersPage />} />
        <Route path="/add" element={<CreateTimerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
