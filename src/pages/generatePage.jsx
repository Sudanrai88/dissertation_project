import React, { useState } from 'react';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import RadiusSelector from '@/components/RadiusSelector';
import PreferenceSelector from '@/components/Preferences/PreferenceSelector';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import NavBar from '@/components/NavBar';

function generatePage() {
  const auth = getAuth();
  
  const [user, loading] = useAuthState(auth);
  const [preferences, setPreferences] = useState({});
  const [radius, setFetchRadius] = useState('');
  const [latitude, setAccessedLatitude] = useState('');
  const [longitude, setAccessedLongitude] = useState('');
  const [text, setLocationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  let Cost = preferences['costScore'];
  let popularity = preferences['popularityScore'];
  let accessibility = preferences['accessibilityScore'];
  let ArrayOfPlaces = preferences['groupTypes'];
  // Other state variables and functions for collecting data

  const handleSearch = async () => {
    
    const token = await user.getIdToken();
    const requestData = {
      text,
      Cost,
      popularity,
      accessibility,
      ArrayOfPlaces,
      radius,
    };
    console.log('Request Data:', requestData);
    setIsLoading(true); // Show loading state

    const backendEndpoint = 'http://localhost:8080/api/search?text=' + text +
    '&Cost=' + Cost +
    '&popularity=' + popularity +
    '&accessibility=' + accessibility +
    '&ArrayOfPlaces=' + ArrayOfPlaces +
    '&radius=' + radius 
  
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  //After generate has been pressed, and the loading is finished. A modal/new page should pop-up that shows the temp Itineraries collection. Each Itinerary should be
  //selectable. 


    try {
      const response = await fetch(backendEndpoint, request);
      if (response.ok) {
        const data = await response.json();
        console.log({ data })
        router.push('/itineraryChooser');
      } else {
        // Handle error response
        setErrorMessage('Error occurred during search');
      }
    } catch (error) {
      setErrorMessage('Error occurred during search');
    }
    setIsLoading(false); // Hide loading state
  };

  const showLoadingPage = () => {
    // Render the loading page while isLoading is true
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return null;
  };

  return (
    <div className='flex flex-col'>
    
      {isLoading && showLoadingPage()} {/* Show loading page when isLoading is true */}
      {!isLoading && (
        <>
          <div>
            <TypedLocation setLocationText={setLocationText} />
          </div>
          <div>
            <RadiusSelector setFetchRadius={setFetchRadius} />
          </div>
          <div>
            <PreferenceSelector setPreferences={setPreferences} />
          </div>
          <button onClick={handleSearch}>Search</button>
        </>
      )}
    </div>
  );
}

export default generatePage;
