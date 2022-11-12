import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../AppProvider';
import Counter from '../generic/Counter';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

const Tabata = ({props}) => {

    const { timers, workoutIsRunning, setWorkoutIsRunning, currentTimerId, setCurrentTimerId, setWorkoutIsComplete } = useContext(AppContext);
    const { id, inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds } = props;

    const inputTime = translateToSeconds(inputHours, inputMinutes, inputSeconds);
    const input2Time = translateToSeconds(input2Hours, input2Minutes, input2Seconds);

    const [time, setTime] = useState(inputTime);
    const [time2, setTime2] = useState(input2Time);
    const [currentRound, setCurrentRound] = useState(1);

    useEffect(() => {

        let i;
        let i2;

        if (workoutIsRunning && currentTimerId === id) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
                if (time2 !== 0) {
                    i2 = setInterval(() => {
                        setTime2(time2 - 1);
                    }, 1000);
                    clearInterval(i);
                } else if (currentRound === inputRounds) {
                    clearInterval(i);
                    clearInterval(i2);
                    if (id === timers.length) {
                        setWorkoutIsRunning(false);
                        setWorkoutIsComplete(true);
                    } else {
                        setCurrentTimerId(currentTimerId + 1);
                    }
                } else {
                    setTime(inputTime);
                    setTime2(input2Time);
                    setCurrentRound(currentRound + 1);
                }
            }
        }

        return () => {
            clearInterval(i);
            clearInterval(i2);
        };

    }, [time, time2, inputTime, input2Time, workoutIsRunning, currentRound, currentTimerId, id, setCurrentTimerId, setWorkoutIsComplete, setWorkoutIsRunning, timers, inputRounds ]);

    return (
        <div style={{ textAlign: "center",}}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
                <div style={{ width: "75px", textAlign: "right"}}>Workout:</div>
                <Counter>{translateFromSeconds(time)}</Counter>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
                <div style={{ width: "75px", textAlign: "right"}}>Rest:</div>
                <Counter>{translateFromSeconds(time2)}</Counter>
            </div>
            <div style={{ margin: "15px 0 20px", fontStyle: "italic",}}>Round {currentRound} of {inputRounds}</div>
        </div>
    );

};

export default Tabata;
