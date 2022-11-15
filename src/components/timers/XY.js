import { useContext, useState } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutDuration, currentDuration, progress, status, rounds } = props;
    const { removeTimer } = useContext(AppContext);
    const [currentRound, setCurrentRound] = useState(1);

    let progressVal;

    if (status === 'Current') {
        if (workoutDuration * currentRound === progress) {
            setCurrentRound(currentRound + 1);
        }
        progressVal = translateFromSeconds(currentDuration - progress);
    } else {
        progressVal = status;
    }

    return (
        <>
            <Counter label="Workout duration" duration={translateFromSeconds(workoutDuration * rounds)} progress={progressVal} removeClick={() => removeTimer(index)} />
            {/* {active && <div style={{ fontStyle: "italic",}}>Round {currentRound} of {rounds}</div>} */}
        </>
    );

};

export default XY;