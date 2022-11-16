import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import { Button } from '../components/generic/Button';

const ButtonsView = () => {

    const { timers, currentTime, paused, setPaused, reset, fastForward, isComplete } = useContext(AppContext);

    const handleClick = value => {

        if (value === 'Start' || value === 'Pause' || value === 'Resume') {
            setPaused(!paused);
        } else if (value === 'Fast Forward') {
            fastForward();
        } else if (value === 'Reset') {
            reset();
        }
    };

    const makeButton = ({value, disabledValue}) => {
        return <Button value={value} disabledValue={(timers.length > 0) ? disabledValue : true} onClick={handleClick} />
    };

    if (timers.length === 0) {return};

    return (
        <div style={{ margin: "0 auto", width: "430px",}}>
            <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between",}}>
                <div style={{ flexBasis: "33%",}}>
                    {makeButton({
                        value: isComplete || (paused && currentTime === 0) ? 'Start' : paused ? 'Resume' : 'Pause',
                        disabledValue: isComplete,
                    })}
                </div>
                <div style={{ flexBasis: "33%",}}>
                    {makeButton({
                        value: "Fast Forward",
                        disabledValue: isComplete,
                    })}
                </div>
                <div style={{ flexBasis: "33%",}}>
                    {makeButton({
                        value: "Reset", 
                        disabledValue: !isComplete && !paused,
                    })}
                </div>
            </div>
        </div>
    );

};

export default ButtonsView;