import styled from 'styled-components';
import trash from '../../images/trash.png';

const StyledCounter = styled.div`
  text-align: center;
  font-family: 'Roboto Mono', monospace;
  font-size: 30px;
  letter-spacing: -0.75px;
  display: inline-block;
`;

const Counter = ({ duration, progress, removeClick }) => {

  return (
      <div style={{ display: "flex", alignItems: "center", gap: "40px"}}>
        <img src={trash} style={{ width: "20px", height: "25px",}} onClick={removeClick} alt="Delete" />
        <div>Duration:<br></br><StyledCounter>{duration}</StyledCounter></div>
        {progress && <div>Progress:<br></br><StyledCounter>{progress}</StyledCounter></div>}
      </div>
  );
};
  
  export default Counter;