import { useEffect, useState } from 'react';
import Button from '../generic/Button';
import Input from '../generic/Input';
import Counter from '../generic/Counter';
import { translateFromSeconds } from '../../utils/helpers';
import { useTimeSetter } from '../../utils/hooks';

const Countdown = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [inputIsDisabled, setInputIsDisabled] = useState(false);
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
                setInputIsDisabled(true);
                break;
            case 'Pause':
                setIsRunning(false);
                break;
            case 'Resume':
                setIsRunning(true);
                break;
            case 'Fast Forward':
                setTime(0);
                setIsComplete(true);
                setInputIsDisabled(false);
                break;
            case 'Reset':
                setTime(inputTime);
                setIsComplete(true);
                setIsRunning(false);
                setInputIsDisabled(false);
                break;
            default:
                break;
        }
    }

    const makeInput = (state, setter, label) => {
        return <Input label={label} value={state} disabledValue={inputIsDisabled} onChange={e => {
            if (e.target.value) {
                setter(parseInt(e.target.value));
                setTime(parseInt(e.target.value));
            } else {
                setter(0);
            }
        }} />
    };

    const makeButton = ({value, disabledValue}) => {
        return <Button value={value} disabledValue={inputTime ? disabledValue : true} onClick={handleClick} />
    };

    useTimeSetter(setInputTime, inputHours, inputMinutes, inputSeconds);
    useTimeSetter(setTime, inputHours, inputMinutes, inputSeconds);

    useEffect(() => {

        let i;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
                clearInterval(i);
                setIsRunning(false);
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, isRunning]);

    return (
        <div style={{ textAlign: "center",}}>
            <Counter>{translateFromSeconds(time)}</Counter>
            <div style={{ margin: "10px 0 20px", display: "flex",}}>
                {makeButton({
                    value: "Start",
                    disabledValue: !isComplete || (time !== inputTime)
                })}
                {makeButton({
                    value: "Pause",
                    disabledValue: !isRunning
                })}
                {makeButton({
                    value: "Resume",
                    disabledValue: isRunning || isComplete || (time === 0)
                })}
                {makeButton({
                    value: "Fast Forward",
                    disabledValue: isComplete || (time === 0)
                })}
                {makeButton({
                    value: "Reset",
                    disabledValue: isComplete && (time === inputTime)
                })}
            </div>
            <div style={{ margin: "0 0 10px",display: "flex", justifyContent: "center", alignItems: "center",}}>
                <div style={{ width: "135px", textAlign: "right"}}>Set workout time:</div>
                {makeInput(inputHours, setInputHours, "H")}
                {makeInput(inputMinutes, setInputMinutes, "M")}
                {makeInput(inputSeconds, setInputSeconds, "S")}
            </div>
        </div>
    );
};

export default Countdown;