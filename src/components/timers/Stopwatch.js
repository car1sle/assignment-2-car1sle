import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppProvider';
import Counter from '../generic/Counter';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

const Stopwatch = ({props}) => {

    const { timers, workoutIsRunning, setWorkoutIsRunning, currentTimerId, setCurrentTimerId, setWorkoutIsComplete } = useContext(AppContext);
    const { id, inputHours, inputMinutes, inputSeconds } = props;

    const [time, setTime] = useState(0);
    // eslint-disable-next-line  no-unused-vars
    const [inputTime, setInputTime] = useState(translateToSeconds(inputHours, inputMinutes, inputSeconds));

    useEffect(() => {

        let i;

        if (workoutIsRunning && currentTimerId === id) {
            i = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            if (time >= inputTime) {
                clearInterval(i);
                if (id === timers.length) {
                    setWorkoutIsRunning(false);
                    setWorkoutIsComplete(true);
                } else {
                    setCurrentTimerId(currentTimerId + 1);
                }
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime,  workoutIsRunning, currentTimerId, id, setCurrentTimerId, setWorkoutIsComplete, setWorkoutIsRunning, timers]);

    return (
        <Counter>{translateFromSeconds(time)}</Counter>
    );

};

export default Stopwatch;