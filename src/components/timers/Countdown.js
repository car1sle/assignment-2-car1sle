import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppProvider';
import Counter from '../generic/Counter';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

const Countdown = ({props}) => {

    const { timers, workoutIsRunning, setWorkoutIsRunning, currentTimerId, setCurrentTimerId, setWorkoutIsComplete } = useContext(AppContext);
    const { id, inputHours, inputMinutes, inputSeconds } = props;

    const [time, setTime] = useState(translateToSeconds(inputHours, inputMinutes, inputSeconds));

    useEffect(() => {

        let i;

        if (workoutIsRunning && currentTimerId === id) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
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

    }, [time, workoutIsRunning, currentTimerId, id, setCurrentTimerId, setWorkoutIsComplete, setWorkoutIsRunning, timers]);

    return (
        <Counter>{translateFromSeconds(time)}</Counter>
    );

};

export default Countdown;