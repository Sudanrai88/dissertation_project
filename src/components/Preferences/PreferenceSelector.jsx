import React, {useEffect, useState} from 'react'
import PlaceTypes from './PlaceTypes'
import PopularityScore from './PopularityScore'
import AccessibilityScore from './AccessibilityScore'
import CostScore from './CostScore'

function PreferenceSelector({setPreferences}) {
  const [groupTypes, setGroupTypes] = useState([""]);
  const [costScore, setCostScore] = useState('');
  const [popularityScore, setPopularityScore] = useState('');
  const [accessibilityScore, setAccessibilityScore] = useState('');

  useEffect(() => {
    setPreferences({
    'groupTypes': groupTypes, 
    'popularityScore': popularityScore,
    'costScore': costScore,
    'accessibilityScore':accessibilityScore})
  }, [groupTypes, popularityScore, costScore, accessibilityScore])

  return (
    <div className='flex flex-col'>
    
    <div>
      <PlaceTypes setGroupTypes={setGroupTypes}/>
    </div>
    <hr className='my-[50px]'/>
      <div>
        <CostScore setCostScore={setCostScore} />
      </div>
      <hr className='my-[50px]'/>
      <div>
        <PopularityScore setPopularityScore={setPopularityScore} />
      </div>
      <hr className='my-[50px]'/>
      <div>
        <AccessibilityScore setAccessibilityScore={setAccessibilityScore} />
      </div>
  
    </div>
  )
}

export default PreferenceSelector