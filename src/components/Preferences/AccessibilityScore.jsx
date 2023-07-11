import React, {useEffect, useState} from 'react'

function AccessibilityScore({setAccessibilityScore}) {
    const [selectedOption, setSelectedOption] = useState(''); //useState initilaizes selectedOption. It is intially
    //initialised to " ". setSelecttedOptioin is a function that will update the current state (selectedOption).

    //The handleChange function is triggered when the user selects something from the dropdown box. The event object
    //is taken as a parameter. The target value of the event (the selected option) is now the current state.
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };

    useEffect(() => {
      setAccessibilityScore(selectedOption);
    }, [selectedOption]);

   return (
    <div>
      <h3> Do you care about accessibility?: </h3>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="0">Nope!</option>
        <option value="1">Not really</option>
        <option value="2">Don't care</option>
        <option value="3">A little</option>
        <option value="4">Yes!</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default AccessibilityScore