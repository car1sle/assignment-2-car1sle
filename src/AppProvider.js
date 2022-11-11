import React,  { useState } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = useState([]);
    const [currentTimerId, setcurrentTimerId] = useState(null);
    const [isRunningMain, setIsRunningMain] = useState(false);
    const [isCompleteMain, setIsCompleteMain] = useState(true);

    return (
      <AppContext.Provider
        value={{
          currentTimerId,
          setcurrentTimerId,
          isRunningMain,
          setIsRunningMain,
          isCompleteMain,
          setIsCompleteMain,
          timers,
          createTimer: ({ timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds }) => {
            const id = timers.length + 1;
            setTimers([...timers, { id, timerType, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds }]);
          },
        //   deleteTimer: xxx,
        }}
      >
        {children}
      </AppContext.Provider>
    );

};