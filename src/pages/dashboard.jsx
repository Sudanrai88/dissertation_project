import '@/styles/globals.css';
import { React, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '@/firebase/firebaseApp';
import { useRouter } from 'next/navigation';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import Link from 'next/link';
import axios from 'axios';
import Footer from '@/components/Footer';
import RecentlyViewed from '@/components/Dashboard/RecentlyViewed';
import NavBar from '@/components/NavBar';
import image1 from "src/assets/Picture1.jpg";
import Image from 'next/image';


function dashboard() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [responseFromBackend, setResponseFromBackend] = useState(false);


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


  if (loading) {
    return <div> Loading 😠 </div>;
  }
  if (!user) {
    router.push("/")
  }


  return (
    <div className='w-[100%] overflow-hidden'>

      {/* Top Navbar */}
      <div className='w-full max-w-[1150px] mx-auto px-[20px]'>
        <NavBar />
      </div>
      <div className='flex flex-col items-center h-[30vw] m-auto max-w-[1150px] px-[20px]'>
        <div className='mr-[600px]'>
          <div>
            <Image src={image1} width={900} height={400} className='absolute mt-[-80px] ml-[500px] z-[-1]' />
          </div>
          <div className='w-full mt-[150px]'>
            <RecentlyViewed responseFromBackend={responseFromBackend} />
          </div>
        </div>
        <div>
          
        </div>

        {/* Logout and Continue buttons */}
        <div className='w-full mt-[300px]'>
          <div>
            <button>Continue with DASHBOARD</button>
          </div>
          <div>
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>
        </div>
        {/* Footer */}
        
      </div>
      <div className='w-full mt-auto'>
          <Footer />
        </div>
    </div>

  );



}

export default dashboard