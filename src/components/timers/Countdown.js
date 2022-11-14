import { useContext, useState } from 'react';
import { AppContext } from '../../AppProvider';
import { useInterval } from '../../utils/hooks';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const Countdown = ({ props }) => {

    const { index, workoutDuration } = props;
    const { activeIndex, paused, setActiveIndex, removeTimer } = useContext(AppContext);
    const [time, setTime] = useState(workoutDuration);
    const active = activeIndex === index;

    useInterval(() => {
        if (paused || !active) return;

        if (time === 0) {
            setActiveIndex(index + 1);
        } else {
            setTime(c => c - 1);
        }
    }, 1000);

    let progressVal;

    if (active) {
        progressVal = translateFromSeconds(time);
    } else if (activeIndex > index) {
        progressVal = 'Complete';
    } else {
        progressVal = 'Coming Up';
    }

    return (
        <Counter label="Workout duration" duration={translateFromSeconds(workoutDuration)} progress={progressVal} removeClick={() => removeTimer(index)} />
    );

};

export default Countdown;