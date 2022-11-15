import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppProvider";
import { translateToSeconds } from '../utils/helpers';

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Timer = styled.div`
  border: 2px solid #2e2e2e;
  margin: 8px;
  background: #ffffff;
`;

const TimerTitle = styled.div`
  font-size: 15px;
  font-style: italic;
  text-align: left;
  background-color: #2e2e2e;
  padding: 7px;
  color: #ffffff;
`;

const TimersView = () => {
  const { timers } = useContext(AppContext);

  const InnerTimer = ({type, props}) => {
    if (type === 'Stopwatch') {
      return <Stopwatch props={props} />
    } else if (type === 'Countdown') {
      return <Countdown props={props} />
    } else if (type === 'XY') {
      return <XY props={props} />
    } else if (type === 'Tabata') {
      return <Tabata props={props} />
    };
  };

  return (
    <Timers>
      {timers && timers.map((timer, index) => (
        <Timer key={timer.id}>
          <TimerTitle>{timer.timerType}</TimerTitle>
          <div style={{ width: "430px", padding: "15px 0 15px 25px",}}>
            <InnerTimer type={timer.timerType} props={{
              index: index,
              workoutDuration: translateToSeconds(timer.inputHours, timer.inputMinutes, timer.inputSeconds),
              restDuration: translateToSeconds(timer.input2Hours, timer.input2Minutes, timer.input2Seconds),
              rounds: timer.inputRounds,
            }} />
          </div>
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;
