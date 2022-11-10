import { useEffect, useState } from 'react';
import Counter from '../generic/Counter';
import { translateFromSeconds } from '../../utils/helpers';
import { useTimeSetter } from '../../utils/hooks';

const XY = props => {

    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [time, setTime] = useState(0);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [inputTime, setInputTime] = useState(0);
    const [round, setRound] = useState(1);
    const [counterRound, setCounterRound] = useState(1);
    const [inputRounds, setInputRounds] = useState(1);

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
                setTime(0);
                setIsRunning(false);
                setIsComplete(true);
                setRound(inputRounds);
                setCounterRound(inputRounds);
                break;
            case 'Reset':
                setTime(inputTime);
                setIsComplete(true);
                setIsRunning(false);
                setRound(inputRounds);
                setCounterRound(1);
                break;
            default:
                break;
        }
    }

    // const makeButton = ({value, disabledValue}) => {
    //     return <Button value={value} disabledValue={inputTime ? disabledValue : true} onClick={handleClick} />
    // };

    useTimeSetter(setInputTime, inputHours, inputMinutes, inputSeconds);
    useTimeSetter(setTime, inputHours, inputMinutes, inputSeconds);

    useEffect(() => {

        let i;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
                if (round === 1) {
                    clearInterval(i);
                    setIsRunning(false);
                } else {
                    setTime(inputTime);
                    setRound(round - 1);
                    setCounterRound(counterRound + 1);
                }
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, isRunning, round, counterRound ]);

    return (
        <Counter>{translateFromSeconds(time)}</Counter>
    );

    // return (
    //         <>
    //             <div style={{ margin: "15px 0 20px", fontStyle: "italic",}}>Round {counterRound} of {inputRounds}</div>
    //             <div style={{ margin: "10px 0 20px", display: "flex",}}>
    //                 {makeButton({
    //                     value: "Start",
    //                     disabledValue: !isComplete || (time === 0)
    //                 })}
    //                 {makeButton({
    //                     value: "Pause",
    //                     disabledValue: !isRunning
    //                 })}
    //                 {makeButton({
    //                     value: "Resume",
    //                     disabledValue: isRunning || isComplete || (time === 0)
    //                 })}
    //                 {makeButton({
    //                     value: "Fast Forward",
    //                     disabledValue: isComplete || (time === 0)
    //                 })}
    //                 {makeButton({
    //                     value: "Reset",
    //                     disabledValue: isComplete && (time === inputTime)
    //                 })}
    //             </div>
    //         </>
    // );
};

export default XY;
