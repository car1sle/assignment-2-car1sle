import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const XY = ({ props }) => {

    const { index, workoutRoundDuration, progress, status, rounds, totalDuration } = props;
    const { timers, removeTimer, setIsComplete, currentRound } = useContext(AppContext);

    useEffect(() => {
        if (index + 1 === timers.length && status === 'Complete') {
          setIsComplete(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    let progressVal;

    if (status === 'Current') {
        progressVal = translateFromSeconds(workoutRoundDuration - progress);
    } else {
        progressVal = status;
    }

    return (
        <>
            <Counter label="Total workout time" duration={translateFromSeconds(totalDuration)} progress={progressVal} removeClick={() => removeTimer(index)} />
            <div style={{ textAlign: "center", padding: "5px 0 0",}}>Round: <b>{currentRound}</b> of {rounds}</div>
        </>

    );

};

export default XY;