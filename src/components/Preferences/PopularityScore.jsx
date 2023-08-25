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
    <div className='flex flex-col'>

      <h3 className='text-[20px] mb-[10px]'> Care about popularity? </h3>
      <select value={popularityScore} onChange={handleChange} className='border p-2 rounded-[10px] bg-slate-50'>
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