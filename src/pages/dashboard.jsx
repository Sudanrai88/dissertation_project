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
import Link from 'next/link';
import SideNavBar from '@/components/SideNavBar/SideNavBar';



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

  const explore = () => {
    <Link href="/explore">
      <p>
        explore
      </p>
    </Link>
  }

  return (
    <div className='overflow-hidden'>
      <div className='w-full max-w-[1150px] mx-auto px-[20px]'>
        <NavBar startColour={"white"} endColour={"black"} />
      </div>
      

      <Hero heading={
        <>
          <span className="hidden lg:block">Easy travelling, just one click away!</span>
          <span className="block lg:hidden">Easy travelling</span>
        </>
      } description={'Have your trip generated!'} image={"assets/Backgroud.jpg"}
        backgroundVH={"70vh"} showButton={false} opacity={'0.4'} responseFromBackend={responseFromBackend} text={"Start"} />


      <section className='flex flex-col m-auto px-[15px] sm:px-[0]  custom1:max-w-[840px] max-w-[800px] justify-center items-center pt-[80px] leading-[200%]'>
        <div className='flex flex-col'>
          <h1 className='text-gray-800 text-[40px] font-bold flex justify-center pb-[60px]'>
            Travel itinerary generator
          </h1>
          <div className=' relative content custom1:w-[500px] custom1:h-[400px]'>
            <Image
              className="rounded-[10px]" objectFit='cover' layout="fill" src="/assets/Backgroud.jpg" alt="Destination Image" />
          </div>
          <div className='text flex flex-col justify-center max-w-[500px] text-[20px] font-[400]'>
            <h3 className='text-[#5182a4] py-6 font-bold text-[24px]'>
              Quick easy trips planned for you instantly.
            </h3>
            <p className='pb-[36px]'>
              Using the Gentrip website easily plan out your entire itinerary for the day!
            </p>
            <p className='pb-[36px]'>
              Create a new personalized trip by pressing 'Start' above, or <Link href="/explore" className='font-bold'> explore </Link>
              some of our pre-planned trips.
            </p>
            <p className='pb-[36px]'>
              Create and share guides / itineraries to grow the community!
            </p>
            <p className='pb-[36px]'>
              Feel free to change any generated itienrary to truly fit your choices.
            </p>
          </div>
        </div>
      </section>
      
      <section className='flex m-auto px-15 py-[50px]'>
        <div className='m-auto custom1:max-w-[840px] max-w-[800px]'>
          <RecentlyViewed responseFromBackend={responseFromBackend} text={"Get started by clicking here!"} />
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className='px-15 custom1:max-w-[1160px] max-w-[800px] flex m-auto text-gray-800 mb-[25px] '>

        <div className='Content '>
          <div className='Title p-4 mt-[10px] '>
            <h1 className='text-[25px] font-bold'>
              Explore
            </h1>
            <h2 className='mt-[15px] font-bold'>
              Popular Destinations
            </h2>
          </div>

          <div className="Itineraries">
            <div className="flex flex-row flex-wrap justify-center items-center">
              {popItineraries.slice(0, 4).map(popItineraries => (
                <ItineraryList
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

          <Link href="/explore" >
            <div className='px-[16px] mt-[30px]'>
              Find more here
            </div>
          </Link>

        </div>

      </section>


      <div className='w-full mt-auto'>
        <Footer />
      </div>
    </div>

  );



}

export default dashboard