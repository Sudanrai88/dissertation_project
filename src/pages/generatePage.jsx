import React, { useState } from 'react';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import RadiusSelector from '@/components/RadiusSelector';
import PreferenceSelector from '@/components/Preferences/PreferenceSelector';
import CostScore from '@/components/Preferences/CostScore';

function generatePage() {
  const [preferences, setPreferences] = useState({});
  const [radius, setFetchRadius] = useState('');
  const [latitude, setAccessedLatitude] = useState('');
  const [longitude, setAccessedLongitude] = useState('');
  const [text, setLocationText] = useState('');

  // Other state variables and functions for collecting data

  const handleSearch = async () => {
    let Cost = preferences['costScore'];
    let popularity = preferences['popularityScore'];
    let accessibility = preferences['accessibilityScore'];
    let ArrayOfPlaces = preferences['groupTypes'];

    const requestData = {
      text,
      Cost,
      popularity,
      accessibility,
      ArrayOfPlaces,
      radius,
      latitude,
      longitude,
    };
    console.log('Request Data:', requestData);

      try {
        const response = await fetch('http://localhost:8080/api/search?text=' + text + 
        '&Cost=' + Cost +
        '&popularity=' + popularity +
        '&accessibility=' + accessibility +
        '&ArrayOfPlaces=' + ArrayOfPlaces +
        '&radius=' + radius +
        '&latitude=' + latitude +
        '&longitude=' + longitude
         , {mode:'cors'});
        const data = await response.json();
        console.log({data})
      }
      catch (error) {
        console.log(error)
      }
  };

  return (
    <div>
      <div>
        <button>
          <AccessLocation setAccessedLatitude={setAccessedLatitude} setAccessedLongitude={setAccessedLongitude}/>
        </button>
      </div>
      <div>
        <TypedLocation setLocationText={setLocationText}   />
      </div>
      <div>
        <RadiusSelector setFetchRadius={setFetchRadius} />
      </div>
      <div>
        <PreferenceSelector setPreferences={setPreferences} />
      </div>
      <button onClick={handleSearch}>Search </button>
    </div>
  );
}

export default generatePage;
