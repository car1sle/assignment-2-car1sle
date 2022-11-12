import React,  { useState } from "react";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {

    const [timers, setTimers] = useState([]);
    const [currentTimerId, setCurrentTimerId] = useState(null);
    const [workoutIsRunning, setWorkoutIsRunning] = useState(false);
    const [workoutIsComplete, setWorkoutIsComplete] = useState(true);

    return (
      <AppContext.Provider
        value={{
          timers,
          setTimers,
          currentTimerId,
          setCurrentTimerId,
          workoutIsRunning,
          setWorkoutIsRunning,
          workoutIsComplete,
          setWorkoutIsComplete,
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