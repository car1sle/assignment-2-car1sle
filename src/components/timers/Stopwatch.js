import { useEffect, useState } from 'react';
import Counter from '../generic/Counter';
import { translateFromSeconds } from '../../utils/helpers';
import { useTimeSetter } from '../../utils/hooks';

const Stopwatch = props => {

    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [time, setTime] = useState(0);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [inputTime, setInputTime] = useState(0);

    const handleClick = value => {
        switch(value) {
            case 'Start':
                setIsRunning(true);
                setIsComplete(false);
                break;
            case 'Pause':
                setIsRunning(false);
                break;
            case 'Resume':
                setIsRunning(true);
                break;
            case 'Fast Forward':
                setTime(inputTime);
                setIsComplete(true);
                break;
            case 'Reset':
                setTime(0);
                setIsComplete(true);
                setIsRunning(false);
                break;
            default:
                break;
        }
    }

    // const makeButton = ({value, disabledValue}) => {
    //     return <Button value={value} disabledValue={inputTime ? disabledValue : true} onClick={handleClick} />
    // };

    useTimeSetter(setInputTime, inputHours, inputMinutes, inputSeconds);

    useEffect(() => {

        let i;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            if (time >= inputTime) {
                clearInterval(i);
                setIsRunning(false);
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, isRunning]);

    return (
        <Counter>{translateFromSeconds(time)}</Counter>
    );
    
    // return (
    //     <div style={{ margin: "10px 0 20px", display: "flex",}}>
    //         {makeButton({
    //             value: "Start",
    //             disabledValue: !isComplete || (time === inputTime)
    //         })}
    //         {makeButton({
    //             value: "Pause",
    //             disabledValue: !isRunning || (time === inputTime)
    //         })}
    //         {makeButton({
    //             value: "Resume",
    //             disabledValue: isRunning || isComplete || (time === inputTime)
    //         })}
    //         {makeButton({
    //             value: "Fast Forward",
    //             disabledValue: isComplete || (time === inputTime)
    //         })}
    //         {makeButton({
    //             value: "Reset",
    //             disabledValue: isComplete && (time !== inputTime)
    //         })}
    //     </div>
    // );
};

export default Stopwatch;