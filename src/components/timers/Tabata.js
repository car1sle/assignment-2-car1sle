import { useEffect, useState, useContext } from 'react';
// import { AppContext } from '../../AppProvider';
import Counter from '../generic/Counter';
import { translateFromSeconds } from '../../utils/helpers';
import { useTimeSetter } from '../../utils/hooks';

const Tabata = ({props}) => {

    // const { setcurrentTimerId, isRunningMain } = useContext(AppContext);
    const { inputHours, inputMinutes, inputSeconds, input2Hours, input2Minutes, input2Seconds, inputRounds } = props;

    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState(0);
    const [round, setRound] = useState(1);
    const [counterRound, setCounterRound] = useState(1);
    const [time2, setTime2] = useState(0);
    const [input2Time, setInput2Time] = useState(0);

    useTimeSetter(setInputTime, inputHours, inputMinutes, inputSeconds);
    useTimeSetter(setTime, inputHours, inputMinutes, inputSeconds);
    useTimeSetter(setInput2Time, input2Hours, input2Minutes, input2Seconds);
    useTimeSetter(setTime2, input2Hours, input2Minutes, input2Seconds);

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
    //             setTime(0);
    //             setTime2(0);
    //             setIsRunning(false);
    //             setIsComplete(true);
    //             setRound(inputRounds);
    //             setCounterRound(inputRounds);
    //             break;
    //         case 'Reset':
    //             setTime(inputTime);
    //             setTime2(input2Time);
    //             setIsComplete(true);
    //             setIsRunning(false);
    //             setRound(inputRounds);
    //             setCounterRound(1);
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
        let i2;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
                if (time2 !== 0) {
                    i2 = setInterval(() => {
                        setTime2(time2 - 1);
                    }, 1000);
                    clearInterval(i);
                } else if (round === 1) {
                    clearInterval(i);
                    clearInterval(i2);
                    setIsRunning(false);
                } else {
                    setTime(inputTime);
                    setTime2(input2Time);
                    setRound(round - 1);
                    setCounterRound(counterRound + 1);
                }
            }
        }

        return () => {
            clearInterval(i);
            clearInterval(i2);
        };

    }, [time, inputTime, isRunning, round, counterRound, time2, input2Time ]);

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
            <div style={{ margin: "15px 0 20px", fontStyle: "italic",}}>Round {counterRound} of {inputRounds}</div>
        </div>
    );

    // return (
//         <div style={{ margin: "10px 0 20px", display: "flex",}}>
//             {makeButton({
//                 value: "Start",
//                 disabledValue: !isComplete || (time === 0)
//             })}
//             {makeButton({
//                 value: "Pause",
//                 disabledValue: !isRunning
//             })}
//             {makeButton({
//                 value: "Resume",
//                 disabledValue: isRunning || isComplete || (time === 0 && time2 === 0)
//             })}
//             {makeButton({
//                 value: "Fast Forward",
//                 disabledValue: isComplete || (time === 0 && time2 === 0)
//             })}
//             {makeButton({
//                 value: "Reset",
//                 disabledValue: isComplete && (time === inputTime)
//             })}
//         </div>
    // );
};

export default Tabata;
