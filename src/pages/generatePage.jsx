import React, { useState } from 'react';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import RadiusSelector from '@/components/RadiusSelector';
import PreferenceSelector from '@/components/Preferences/PreferenceSelector';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

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

  
    if (isLoading) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      {!isLoading && (
        <div>
          <NavBar startColour={"black"} endColour={"white"} />
          <div className='flex flex-col m-auto px-15 custom1:max-w-[1400px] max-w-[90%] justify-center items-center mt-[100px] leading-[200%]'>
            <div className=' sm:w-[620px] max-w-[90%] md:w-[820px]'>
              <h1 class="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 ">Tell us your travel preferences</h1>
              <TypedLocation setLocationText={setLocationText} />
              <hr className='my-[64px]' />
              <RadiusSelector setFetchRadius={setFetchRadius} />
              <hr className='my-[64px]' />
              <PreferenceSelector setPreferences={setPreferences} />

                <div className='my-[64px] flex justify-center'>
                  <button class="border rounded-[15px] text-white font-bold px-[16px] pb-[4px] pt-[2.5px] text-[20px] bg-[rgb(0,0,0)]" onClick={handleSearch}> Search </button>
                </div>
            </div>
          </div>

          <Footer />
        </div>

      )}
      {isLoading}
    </div>
  );
}

export default generatePage;
