import React,  { useState } from "react";
import { useInterval } from "./utils/hooks";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = useState([]);
    const [paused, setPaused] = useState(true);
    const [time, setTime] = useState(0);

    useInterval(() => {
      if (paused) return;
      setTime(t => t + 1);
    }, 1000);

    return (
      <AppContext.Provider
        value={{
          time,
          paused,
          setPaused,
          reset: () => setTime(0),
          createTimer: ({ timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds }) => {
            const id = timers.length;
            setTimers([...timers, { id, timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds }]);
          },
          removeTimer: index => setTimers(timers.filter((t, i) => i !== index)),
          timers,
        }}
      >
        {children}
      </AppContext.Provider>
    );

};