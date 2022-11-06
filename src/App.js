import React from "react";
import styled from "styled-components";
import TimersView from "./views/TimersView";

const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: auto;
`;

const App = () => {
  return <TimersView />;
};

export default App;
