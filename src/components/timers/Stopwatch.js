import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const Stopwatch = ({ props }) => {

    const { index, workoutRoundDuration, progress, status } = props;
    const { timers, removeTimer, setIsComplete } = useContext(AppContext);

    useEffect(() => {
        if (index + 1 === timers.length && status === 'Complete') {
          setIsComplete(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    let progressVal;

    if (status === 'Current') {
        progressVal = translateFromSeconds(progress);
    } else {
        progressVal = status;
    }

    return (
        <Counter label="Workout duration" duration={translateFromSeconds(workoutRoundDuration)} progress={progressVal} removeClick={() => removeTimer(index)} />
    );

};

export default Stopwatch;