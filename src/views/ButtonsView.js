import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import Button from '../components/generic/Button';

const ButtonsView = () => {

    const { timers, paused, setPaused, reset } = useContext(AppContext);

    const handleClick = value => {

        if (value === 'Start' || value === 'Pause') {
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
            {makeButton({
                value: paused ? 'Start' : 'Pause'
            })}
            {makeButton({
                value: "Reset"
            })}
        </div>
    );

};

export default ButtonsView;