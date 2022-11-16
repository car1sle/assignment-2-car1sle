import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import { Button } from '../components/generic/Button';

const ButtonsView = () => {

    const { timers, currentTime, paused, setPaused, reset, isComplete } = useContext(AppContext);

    const handleClick = value => {

        if (value === 'Start' || value === 'Pause' || value === 'Resume') {
            setPaused(!paused);
        } else if (value === 'Reset') {
            reset();
        }
    };

    const makeButton = ({value}) => {
        return <Button value={value} disabledValue={(timers.length > 0) ? false : true} onClick={handleClick} />
    };

    return (
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "center",}}>
            {!isComplete && makeButton({
                value: paused && currentTime === 0 ? 'Start' : paused ? 'Resume' : 'Pause'
            })}
            {/* TODO: Can I make this mount more instantly? */}
            {currentTime !== 0 && makeButton({
                value: "Reset"
            })}
        </div>
    );

};

export default ButtonsView;