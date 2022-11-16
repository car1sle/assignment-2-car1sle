import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useInterval } from "./utils/hooks";
import { translateToSeconds } from "./utils/helpers";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = useState([]);
    const [paused, setPaused] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isComplete, setIsComplete] = useState(0);

    useInterval(() => {
      if (paused || activeIndex >= timers.length) return;

      if (currentTime === timers[activeIndex].totalDuration) {
          setActiveIndex(activeIndex + 1);
          setCurrentTime(0);
      } else {
          setCurrentTime(c => c + 1);
      }
    }, 1000);

    const reset = () => {
      setActiveIndex(0);
      setCurrentTime(0);
      setPaused(true);
      setIsComplete(false);
    };

    const fastForward = () => {
    };

    return (
      <AppContext.Provider
        value={{
          timers,
          currentTime,
          setCurrentTime,
          activeIndex,
          setActiveIndex,
          paused,
          setPaused,
          isComplete,
          setIsComplete,
          reset: reset,
          fastForward: fastForward,
          createTimer: ({ timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds = 1 }) => {
            const id = uuid();
            setTimers([...timers, { 
              id, 
              timerType, 
              inputRounds, 
              workoutRoundDuration: translateToSeconds(inputHours, inputMinutes, inputSeconds), 
              restRoundDuration: translateToSeconds(input2Hours, input2Minutes, input2Seconds), 
              totalWorkoutDuration: (translateToSeconds(inputHours, inputMinutes, inputSeconds) * inputRounds),
              totalRestDuration: (translateToSeconds(input2Hours, input2Minutes, input2Seconds) * inputRounds),
              totalDuration: ((translateToSeconds(inputHours, inputMinutes, inputSeconds) * inputRounds) + (translateToSeconds(input2Hours, input2Minutes, input2Seconds) * inputRounds)),
            }]);
          },
          removeTimer: index => setTimers(timers.filter((t, i) => i !== index)),
        }}
      >
        {children}
      </AppContext.Provider>
    );

};