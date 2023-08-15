import React, { useEffect, useState } from 'react'

function RadiusSelector( {setFetchRadius} ) {
  const [radius, setRadius] = useState('');

  useEffect(() => {
    setFetchRadius(radius);
  }, [radius]) //Run this useEffect everytime radius changes to update setFetchRadius

  const handleChange = (e) => {
    setRadius(e.target.value);
  }

  return (
    <div className='flex flex-col'>
     <label className="text-[20px] mb-[16px]" htmlFor="locationInput">How far are you willing to travel?</label>
     <select value={radius} onChange={handleChange} className='border p-2 rounded-[10px] bg-slate-50'>
      <option value="">--Select--</option>
      <option value="1000">1 km</option>
      <option value="2000">2 km</option>
      <option value="3000">3 km</option>
      <option value="4000">4 km</option>
      <option value="5000">5 km</option>
     </select>
    
    </div>
  )
}

export default RadiusSelector