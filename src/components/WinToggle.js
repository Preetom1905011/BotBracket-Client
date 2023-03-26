import '../styles/winTog.css';
import React from 'react';

export default function SwitchToggle({outRed, setOutRed, outBlue, setOutBlue, toggleState, setToggleState}) {

  const handleToggleChange = (e) => {
    setToggleState(e.target.id);
    
    if (e.target.id === 'red') {
      setOutRed({...outRed, result:"winner"});
      setOutBlue({...outBlue, result:"loser"});
    }
    else if (e.target.id === 'blue') {
      setOutRed({...outRed, result:"loser"});
      setOutBlue({...outBlue, result:"winner"});
    }
    else {
      setOutRed({...outRed, result:""});
      setOutBlue({...outBlue, result:""});
    }
  };

  return (
    <div className="switch-toggle switch-candy">
      <input
        id="red"
        name="state-d"
        type="radio"
        checked={toggleState === 'red'}
        onChange={handleToggleChange}
      />
      <label htmlFor="red" className="red">WINNER</label>

      <input
        id="na"
        name="state-d"
        type="radio"
        disabled
        checked={toggleState === 'na'}
        onChange={handleToggleChange}
      />
      <label htmlFor="na" className="disabled">WINNER</label>

      <input
        id="blue"
        name="state-d"
        type="radio"
        checked={toggleState === 'blue'}
        onChange={handleToggleChange}
      />
      <label htmlFor="blue" className="blue">WINNER</label>
      <a></a>
    </div>
  );
}
