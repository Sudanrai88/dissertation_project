import React, {useState} from 'react'

function AccessibilityScore() {
    const [selectedOption, setSelectedOption] = useState(''); //useState initilaizes selectedOption. It is intially
    //initialised to " ". setSelecttedOptioin is a function that will update the current state (selectedOption).

    //The handleChange function is triggered when the user selects something from the dropdown box. The event object
    //is taken as a parameter. The target value of the event (the selected option) is now the current state.
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };

   return (
    <div>
      <h3> Do you care about accessibility?: </h3>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="Nope!">Nope!</option>
        <option value="Not really">Not really</option>
        <option value="Don't care">Don't care</option>
        <option value="A little">A little</option>
        <option value="Yes!">Yes!</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default AccessibilityScore