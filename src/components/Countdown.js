// Countdown.jsx

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../styles/countdown.css';

const Countdown = ({ isTimerStarted, setIsTimerStarted }) => {
  const [animate, setAnimate] = useState(false);
  const [count, setCount] = useState(3);

  const props = useSpring({
    opacity: animate ? 1 : 0,
    fontSize: animate ? '12rem' : '0rem',
    top: animate ? '50%' : '0%', // Adjust the top position for centering
    left: animate ? '50%' : '0%', // Adjust the left position for centering
    transform: animate ? 'translate(-50%, -25%)' : 'translate(-50%, -50%)', // Center the element
    zIndex: animate ? 1000 : 0,
    onRest: () => setAnimate(false),
  });

  const startAnimation = () => {
    setCount(3);
    animateNumber(3);
  };

  const animateNumber = (number) => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setCount(number - 1);
      if (number > 0) {
        animateNumber(number - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    if (isTimerStarted){
        startAnimation()
        setIsTimerStarted(false)
    }
  }, [isTimerStarted])

  return (
    <div className="Countdown">
      <div className="number-container">
        {count > 0 && <animated.div className="number" style={{ ...props }}>{count}</animated.div>}
        {count === 0 && <animated.div className="number" style={{ ...props }}>Fight</animated.div>}
      </div>
    </div>
  );
};

export default Countdown;
