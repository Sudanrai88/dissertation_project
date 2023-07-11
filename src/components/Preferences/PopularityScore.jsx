import React, { useState, useEffect } from 'react'

function PopularityScore({setPopularityScore}) {
    const [popularityScore, setSelectedOption] = useState(''); //useState initilaizes selectedOption. It is intially
    //initialised to " ". setSelecttedOptioin is a function that will update the current state (selectedOption).
    useEffect(() => {
      setPopularityScore(popularityScore);
    }, [popularityScore]) 
    //The handleChange function is triggered when the user selects something from the dropdown box. The event object
    //is taken as a parameter. The target value of the event (the selected option) is now the current state.
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };
    

   return (
    <div>
      <h3> Care about popularity?: </h3>
      <select value={popularityScore} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="0">No</option>
        <option value="1">Not really</option>
        <option value="2">Somewhat</option>
        <option value="3">Yes</option>
        <option value="4">Matters a lot</option>
      </select>
      {popularityScore && <p>You selected: {popularityScore}</p>}
    </div>
  );
};

export default PopularityScore