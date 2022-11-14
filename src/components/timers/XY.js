import { useContext, useState } from 'react';
import { AppContext } from '../../AppProvider';
import { useInterval } from '../../utils/hooks';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutDuration, rounds } = props;
    const { activeIndex, paused, setActiveIndex, removeTimer } = useContext(AppContext);
    const [time, setTime] = useState(workoutDuration);
    const [currentRound, setCurrentRound] = useState(1);
    const active = activeIndex === index;

    useInterval(() => {
        if (paused || !active) return;

        if (time === 0) {
            if (currentRound === rounds) {
                setActiveIndex(index + 1);
            } else {
                setCurrentRound(currentRound + 1);
                setTime(workoutDuration);
            }
        } else {
            setTime(c => c - 1);
        }
    }, 1000);

    return (
        <>
            <Counter label="Workout duration" duration={translateFromSeconds(workoutDuration * rounds)} progress={active && translateFromSeconds(time)} removeClick={() => removeTimer(index)} />
            {active && <div style={{ fontStyle: "italic",}}>Round {currentRound} of {rounds}</div>}
        </>
    );

};

export default XY;