import React, { useState } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = useState([]);
    const [paused, setPaused] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <AppContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          paused,
          setPaused,
          reset: () => setActiveIndex(0),
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