import React from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";
import CreateTimerView from "./views/CreateTimerView";
import { AppProvider } from "./AppProvider";

const Container = styled.div`
  background: #dbdbdb;
  height: 100vh;
  overflow: auto;
`;

const App = () => {
  return (
    <Container>
      <AppProvider>
        <TimersView />
        <CreateTimerView />
      </AppProvider>
    </Container>
  );
};

export default App;
