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
    <div>
     <h1>
      How far are you willing to travel?
     </h1>
     <select value={radius} onChange={handleChange}>
      <option value="">--Select--</option>
      <option value="1000">1 km</option>
      <option value="2000">2 km</option>
      <option value="3000">3 km</option>
      <option value="4000">4 km</option>
      <option value="5000">5 km</option>
     </select>
     {radius && <p>You selected: {radius}</p>} {/* If radius value is truthy (not an empty string) */}
    </div>
  )
}

export default RadiusSelector