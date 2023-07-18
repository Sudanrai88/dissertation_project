import React, { useState } from 'react';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import RadiusSelector from '@/components/RadiusSelector';
import PreferenceSelector from '@/components/Preferences/PreferenceSelector';
import { useRouter } from 'next/navigation';




function generatePage() {

 


  const [preferences, setPreferences] = useState({});
  const [radius, setFetchRadius] = useState('');
  const [latitude, setAccessedLatitude] = useState('');
  const [longitude, setAccessedLongitude] = useState('');
  const [text, setLocationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

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

    setIsLoading(true); // Show loading state

    try {
      const response = await fetch('http://localhost:8080/api/search?text=' + text +
        '&Cost=' + Cost +
        '&popularity=' + popularity +
        '&accessibility=' + accessibility +
        '&ArrayOfPlaces=' + ArrayOfPlaces +
        '&radius=' + radius +
        '&latitude=' + latitude +
        '&longitude=' + longitude
        ,
      );

      if (response.ok) {
        const data = await response.json();
        console.log({ data })
        router.push('/itineraryViewer');
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
    <div>
    {isLoading && showLoadingPage()} {/* Show loading page when isLoading is true */}
    {!isLoading && (
      <>
        <div>
          <button>
            <AccessLocation setAccessedLatitude={setAccessedLatitude} setAccessedLongitude={setAccessedLongitude} />
          </button>
        </div>
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
