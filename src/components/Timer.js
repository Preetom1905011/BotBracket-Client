import React, { useEffect, useState } from 'react';
import '../styles/timer.css';

export default function Timer(props) {
    const {toggleState, setToggleState, timerState, setTimerState, reset, outRed, outBlue} = props;

    const [time, setTime] = useState({minutes: "03", seconds: "00"});
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        if (counter >= 0 && timerState === "start") {
            setTimeout(() => setCounter(counter-1), 1000);
            setTime({minutes: Math.floor(counter / 60).toString().padStart(2, '0'), seconds: Math.floor(counter % 60).toString().padStart(2, '0')});
        }
        else {
            if (counter < 0){
                setTimerState("reset");
            }
        }
    }, [counter]);

    useEffect(() => {
        if (toggleState !== "na"){
            pauseTimer();
        }
    }, [toggleState])

    useEffect(() => {
        resetTimer();
    }, [reset])

    const startTimer = () => {
        if ((time.minutes > 0 || time.seconds >> 0)){
            setTimerState("start"); 
        }
        setCounter(Number(time.minutes) * 60 + Number(time.seconds));
    }
    const pauseTimer = () => {
        setTimerState("pause"); 
    }
    const resetTimer = () => {
        setTimerState("reset");
        setCounter(0);
        setToggleState("na");
        setTime({minutes: "03", seconds: "00"});

    }
    const handleInput = (event) => {
        setTime(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
    };
    const handleTime = () => {
        setTime({minutes: time.minutes.toString().padStart(2, '0'), seconds: time.seconds.toString().padStart(2, '0')});
    }

    return (
        <div className='timer'>
            <form>
            <input
                type="number"
                className='timer-input'
                name="minutes"
                autoComplete="off"
                value={time.minutes}
                onChange={handleInput}
                onBlur={handleTime}
                min="0"
                disabled={toggleState === "na"? false: true}
                required/>
            <input
                type="number"
                className='timer-input'
                name="seconds"
                autoComplete="off"
                value={time.seconds}
                onChange={handleInput}
                onBlur={handleTime}
                max="59"
                min="0"
                disabled={toggleState === "na"? false: true}
                required/>
            </form>
            {(timerState === "start")? 
                    <button 
                        className='timer-bt' 
                        onClick={pauseTimer} 
                        disabled={toggleState === "na"? false: true}>Pause</button>
                    : <button 
                            className='timer-bt' 
                            onClick={startTimer}
                            disabled={toggleState === "na" && (outRed._id !== "" && outBlue._id !== "")? false: true}>Start</button>}
            <button 
                className='timer-bt' 
                onClick={resetTimer}>Reset</button>
        </div>
    )
}
