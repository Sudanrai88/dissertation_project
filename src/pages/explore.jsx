import NavBar from '@/components/NavBar'
import SideNavBar from '@/components/SideNavBar/SideNavBar'
import {React, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import ItineraryList from '@/components/Account/ItineraryList';



function explore() {
  const auth = getAuth();

  const [popItineraries, setPopItineraries] = useState([]);
  const [user, loading] = useAuthState(auth);


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

  return (

    //The explore page should show all of the popular destinations 
    <div className='max-w-[1440px] flex flex-col justify-center items-center align-middle m-auto'>
      <div>
        <NavBar startColour={"black"} endColour={"white"} />
      </div> 
      <div>
        <h1 className='text-gray-800 text-[30px] font-bold flex justify-center mt-[140px]'>
          Explore All Popular Shared Destinations!
        </h1>
      </div>
      <div className="Itineraries mt-[40px]">
            <div className="flex flex-row flex-wrap justify-start items-center">
              {popItineraries.map(popItineraries => (
                <ItineraryList
                  BottomMargin={"mb-[50px]"}
                  className="w-full custom1:w-1/2"
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
  )
}

export default explore