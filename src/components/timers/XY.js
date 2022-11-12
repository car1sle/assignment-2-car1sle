import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppProvider';
import Counter from '../generic/Counter';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

const XY = ({props}) => {

    const { timers, workoutIsRunning, setWorkoutIsRunning, currentTimerId, setCurrentTimerId, setWorkoutIsComplete } = useContext(AppContext);
    const { id, inputHours, inputMinutes, inputSeconds, inputRounds } = props;

    const inputTime = translateToSeconds(inputHours, inputMinutes, inputSeconds);

    const [time, setTime] = useState(inputTime);
    const [currentRound, setCurrentRound] = useState(1);

    useEffect(() => {

        let i;

        if (workoutIsRunning && currentTimerId === id) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
                if (currentRound === inputRounds) {
                    clearInterval(i);
                    if (id === timers.length) {
                        setWorkoutIsRunning(false);
                        setWorkoutIsComplete(true);
                    } else {
                        setCurrentTimerId(currentTimerId + 1);
                    }
                } else {
                    setTime(inputTime);
                    setCurrentRound(currentRound + 1);
                }
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, workoutIsRunning, currentRound, currentTimerId, id, setCurrentTimerId, setWorkoutIsComplete, setWorkoutIsRunning, timers, inputRounds]);

    return (
        <>
            <Counter>{translateFromSeconds(time)}</Counter>
            <div style={{ margin: "15px 0 20px", fontStyle: "italic",}}>Round {currentRound} of {inputRounds}</div>
        </>
    );

};

export default XY;