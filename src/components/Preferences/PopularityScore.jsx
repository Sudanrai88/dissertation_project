import React, { useState } from 'react'

function PopularityScore() {
    const [selectedOption, setSelectedOption] = useState(''); //useState initilaizes selectedOption. It is intially
    //initialised to " ". setSelecttedOptioin is a function that will update the current state (selectedOption).

    //The handleChange function is triggered when the user selects something from the dropdown box. The event object
    //is taken as a parameter. The target value of the event (the selected option) is now the current state.
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };

   return (
    <div>
      <h3> Care about popularity?: </h3>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="No">0</option>
        <option value="Not really">1</option>
        <option value="Somewhat">2</option>
        <option value="Yes">3</option>
        <option value="Matters a lot">4</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default PopularityScore