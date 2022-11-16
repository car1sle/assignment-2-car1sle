import { useContext, useEffect } from 'react';
import { AppContext } from '../../AppProvider';
import { translateFromSeconds } from '../../utils/helpers';
import Counter from '../generic/Counter';

const Countdown = ({ props }) => {

    const { index, workoutDuration, progress, status } = props;
    const { timers, removeTimer, setIsComplete } = useContext(AppContext);

    useEffect(() => {
        if (index === timers.length && status === 'Complete') {
          setIsComplete(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    let progressVal;

    if (status === 'Current') {
        progressVal = translateFromSeconds(workoutDuration - progress);
    } else {
        progressVal = status;
    }

    return (
        <Counter label="Workout duration" duration={translateFromSeconds(workoutDuration)} progress={progressVal} removeClick={() => removeTimer(index)} />
    );

};

export default Countdown;