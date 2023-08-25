
import React, { useEffect, useState } from 'react';


function CostScore({setCostScore}) {
    const [selectedOption, setSelectedOption] = useState(''); //useState initilaizes selectedOption. It is intially
    //initialised to " ". setSelecttedOptioin is a function that will update the current state (selectedOption).

    //The handleChange function is triggered when the user selects something from the dropdown box. The event object
    //is taken as a parameter. The target value of the event (the selected option) is now the current state.
    const handleChange = (e) => {
      setSelectedOption(e.target.value);
    };

    useEffect(() => {
      setCostScore(selectedOption);
    }, [selectedOption]);

   return (
    <div className='flex flex-col'>

      <h3 className='text-[20px] mb-[10px]'> How expensive do you want your itinerary to be? </h3>
      
      <select value={selectedOption} onChange={handleChange} className='border p-2 rounded-[10px] bg-slate-50'> 
        <option value="">--Select--</option>
        <option value="0">Free</option>
        <option value="1">Inexpensive</option>
        <option value="2">Moderate</option>
        <option value="3">Expensive</option>
        <option value="4">Very Expensive</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default CostScore