import { useContext } from 'react';
import { AppContext } from '../AppProvider';
import Button from '../components/generic/Button';

const ButtonsView = () => {

    const { timers, setWorkoutIsRunning, setWorkoutIsComplete, setCurrentTimerId } = useContext(AppContext);

    const handleClick = value => {
        switch(value) {
            case 'Start':
                setWorkoutIsRunning(true);
                setWorkoutIsComplete(false);
                setCurrentTimerId(1);
                break;
            case 'Pause':
                setWorkoutIsRunning(false);
                break;
            case 'Resume':
                setWorkoutIsRunning(true);
                break;
            default:
                break;
        }
    };

    const makeButton = ({value}) => {
        return <Button value={value} disabledValue={(timers.length > 0) ? false : true} onClick={handleClick} />
    };

    return (
        <div style={{ margin: "20px 0", display: "flex", justifyContent: "center",}}>
            {makeButton({
                value: "Start"
            })}
            {makeButton({
                value: "Pause"
            })}
            {makeButton({
                value: "Resume"
            })}
            {/* {makeButton({
                value: "Fast Forward"
            })}
            {makeButton({
                value: "Reset"
            })} */}
        </div>
    );

};

export default ButtonsView;