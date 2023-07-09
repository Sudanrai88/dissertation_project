
import React, { useState } from 'react';


function CostScore() {
    const [selectedOption, setSelectedOption] = useState(''); //useState initilaizes selectedOption. It is intially
    //initialised to " ". setSelecttedOptioin is a function that will update the current state (selectedOption).

    //The handleChange function is triggered when the user selects something from the dropdown box. The event object
    //is taken as a parameter. The target value of the event (the selected option) is now the current state.
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };

   return (
    <div>
      <h3> How expensive do you want your itinerary to be?: </h3>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="Free">Price level 0</option>
        <option value="Inexpensive">Price level 1</option>
        <option value="Moderate">Price level 2</option>
        <option value="Expensive">Price level 3</option>
        <option value="Very Expensive">Price level 4</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default CostScore