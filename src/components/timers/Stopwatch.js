import { useEffect, useState, useContext } from 'react';
// import { AppContext } from '../../AppProvider';
import Counter from '../generic/Counter';
import { translateFromSeconds } from '../../utils/helpers';
import { useTimeSetter } from '../../utils/hooks';

const Stopwatch = ({props}) => {

    // const { setcurrentTimerId, isRunningMain } = useContext(AppContext);
    const { inputHours, inputMinutes, inputSeconds } = props;

    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState(0);

    useTimeSetter(setInputTime, inputHours, inputMinutes, inputSeconds);

    // const handleClick = value => {
    //     switch(value) {
    //         case 'Start':
    //             setIsRunning(true);
    //             setIsComplete(false);
    //             break;
    //         case 'Pause':
    //             setIsRunning(false);
    //             break;
    //         case 'Resume':
    //             setIsRunning(true);
    //             break;
    //         case 'Fast Forward':
    //             setTime(inputTime);
    //             setIsComplete(true);
    //             break;
    //         case 'Reset':
    //             setTime(0);
    //             setIsComplete(true);
    //             setIsRunning(false);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // const makeButton = ({value, disabledValue}) => {
    //     return <Button value={value} disabledValue={inputTime ? disabledValue : true} onClick={handleClick} />
    // };

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