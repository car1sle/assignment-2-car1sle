import React from "react";
import styled from 'styled-components';
import trash from '../../images/trash.png';

const StyledCounter = styled.div`
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  letter-spacing: -0.75px;
  display: inline-block;
  padding: 0 0 20px;
`;

const Counter = ({ label, duration, progress, removeClick }) => {

  return (
      <div style={{ display: "flex", alignItems: "center", gap: "35px",}}>
        <img src={trash} style={{ width: "17px", height: "20px", cursor: "pointer",}} onClick={removeClick} alt="Delete" />
        <div>{label}:<br></br><StyledCounter>{duration}</StyledCounter></div>
        {progress && <div>Progress:<br></br><StyledCounter>{progress}</StyledCounter></div>}
      </div>
  );
};
  
  export default Counter;