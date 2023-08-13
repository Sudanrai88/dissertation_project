import { React, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '@/firebase/firebaseApp';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Footer from '@/components/Footer';
import RecentlyViewed from '@/components/Dashboard/RecentlyViewed';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import Hero from '@/components/Hero';
import ItineraryList from '@/components/Account/ItineraryList';



function dashboard() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [responseFromBackend, setResponseFromBackend] = useState(false);
  const [popItineraries, setPopItineraries] = useState([]);


  const callApi = async () => {
    const token = await user.getIdToken();
    const backendEndpoint = "http://localhost:8080/api/verify-token";

    try {
      const response = await axios.post(backendEndpoint, token);
      const responseBody = response.data;

      console.log(responseBody);
      if (responseBody === true) {
        setResponseFromBackend(true);
      } else {
        setResponseFromBackend(false);
      }
    } catch (error) {
      setResponseFromBackend(false);
      console.error("Error occurred while making the API call:", error);
    }
  }

  useEffect(() => {
    if (user) {
      callApi();
      console.log(user.uid)
    }
  }, [user])

  useEffect(() => {
  
    async function fetchPopularItineraries() {
      try {
        if (!user) return;
        console.log("Heloooo")
        const token = await user.getIdToken();
        const response = await fetch('http://localhost:8080/api/itinerary/fetchPopularItineraries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });
        const data = await response.json();
        setPopItineraries(data);

      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    }

    fetchPopularItineraries();
  }, [user]);


  if (loading) {
    return <div> Loading 😠 </div>;
  }
  if (!user) {
    router.push("/")
  }

  return (
    <div className='w-[100%] overflow-hidden'>

      <div className='w-full max-w-[1150px] mx-auto px-[20px]'>
        <NavBar startColour={"white"} endColour={"black"} />
      </div>

      <Hero heading={
        <>
          <span className="hidden lg:block">Easy travelling, just one click away!</span>
          <span className="block lg:hidden">Easy travelling</span>
        </>
      } description={'Have your trip generated!'} image={"assets/Backgroud.jpg"}
        backgroundVH={"70vh"} showButton={false} opacity={'0.5'} responseFromBackend={responseFromBackend} />

      {/* Popular Destinations Section */}
      <div className='h-[50vh] max-w-[1140px] flex m-auto text-gray-800 mb-[25px] '>

        <div className='Content '>
          <div className='Title p-4 mt-[10px] '>
            <h1 className='text-[25px] font-bold'>
              Explore
            </h1>
            <h2 className='mt-[15px] font-bold'>
              Popular Destinations
            </h2>
          </div>

          <div className="Itineraries max-w-[75%]">
            <div className="flex flex-row">
              {popItineraries.map(popItineraries => (
                <ItineraryList
                  key={popItineraries.itineraryId}
                  popItineraries={popItineraries}
                  showActions={false} 
                  showPopular={true}
                  source="dashboard"
                  />
              ))}
            </div>
          </div>
        </div>



      </div>


      <div className='w-full mt-auto'>
        <Footer />
      </div>
    </div>

  );



}

export default dashboard