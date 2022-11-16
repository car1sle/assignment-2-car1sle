import React from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";
import CreateTimerView from "./views/CreateTimerView";
import ButtonsView from "./views/ButtonsView";
import { AppProvider } from "./AppProvider";

const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const App = () => {
  return (
    <Container>
      <AppProvider>
        <ButtonsView />
        <TimersView />
        <CreateTimerView />
      </AppProvider>
    </Container>
  );
};

export default App;
