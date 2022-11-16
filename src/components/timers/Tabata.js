import { useContext, useState } from 'react';
import { AppContext } from '../../AppProvider';
import { useInterval } from '../../utils/hooks';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const Tabata = ({ props }) => {

    const { index, workoutRoundDuration, restRoundDuration, rounds } = props;
    const { activeIndex, paused, setActiveIndex, removeTimer } = useContext(AppContext);
    const [time, setTime] = useState(workoutRoundDuration);
    const [time2, setTime2] = useState(restRoundDuration);
    const [currentRound, setCurrentRound] = useState(1);
    const active = activeIndex === index;

    useInterval(() => {
        if (paused || !active) return;

        let i2;

        if (time === 0) {
            if (time2 === 0) {
                if (currentRound === rounds) {
                    setActiveIndex(index + 1);
                } else {
                    setCurrentRound(currentRound + 1);
                    setTime(workoutRoundDuration);
                    setTime2(restRoundDuration);
                }
            } else {
                i2 = setInterval(() => {
                    setTime2(time2 - 1);
                }, 1000);
            }
        } else {
            setTime(c => c - 1);
        }

        return () => {
            clearInterval(i2);
        };
        
    }, 1000);

    return (
        <>
            <Counter label="Workout duration" duration={translateFromSeconds(workoutRoundDuration * rounds)} progress={active && translateFromSeconds(time)} removeClick={() => removeTimer(index)} />
            <Counter label="Rest duration" duration={translateFromSeconds(restRoundDuration * rounds)} progress={active && translateFromSeconds(time2)} removeClick={() => removeTimer(index)} />
            {active && <div>Round {currentRound} of {rounds}</div>}
        </>
    );

};

export default Tabata;