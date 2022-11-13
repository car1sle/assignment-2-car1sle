import { useContext } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const Countdown = ({ props }) => {

    const { time, timers, removeTimer } = useContext(AppContext);
    const { index, workoutDuration } = props;

    // Calculate total time of all timers before this one
    const timeBeforeMe = timers.reduce((acc, curr, i) => {
        const workoutDuration = translateToSeconds(curr.inputHours, curr.inputMinutes, curr.inputSeconds);
        if (i < index) {
            return workoutDuration + acc;
        } else {
            return acc;
        }
    }, 0);

    // This timer is active if the current time is between 
    // the sum of all previous and the duration of this one
    const active = time >= timeBeforeMe && time < timeBeforeMe + workoutDuration;

    return (
        <>
        <div>Duration</div>
        <div><Counter>{translateFromSeconds(workoutDuration)}</Counter></div>
        {(active) && 
            <div>
                <div>Progress</div>
                <div><Counter>{translateFromSeconds(workoutDuration - timeBeforeMe)}</Counter></div>
            </div>
        }
        <button onClick={() => removeTimer(index)}>Remove</button>
        </>
    );

};

export default Countdown;