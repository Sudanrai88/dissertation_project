import React, {useState} from 'react'
import PlaceTypes from './PlaceTypes'
import PopularityScore from './PopularityScore'
import AccessibilityScore from './AccessibilityScore'
import CostScore from './CostScore'

function PreferenceSelector() {
  const [types, setTypes] = useState([]);
  const [costScore, setCostScore] = useState('');
  const [popularityScore, setPopularityScore] = useState('');
  const [accessibilityScore, setAccessibilityScore] = useState('');


  return (
    <div>
    <div>
      <h1> User selected Preferences </h1>
    </div>
    <div>
      <PlaceTypes />
    </div>
      <div>
        <CostScore />
      </div>
      <div>
        <PopularityScore />
      </div>
      <div>
        <AccessibilityScore />
      </div>
  
    </div>
  )
}

export default PreferenceSelector