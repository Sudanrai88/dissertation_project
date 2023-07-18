import '@/styles/globals.css';
import {React, useState, useEffect} from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '@/firebase/firebaseApp';
import { useRouter } from 'next/navigation';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import Link from 'next/link';
import axios from 'axios';


function dashboard() {
  initFirebase();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [responseFromBackend, setResponseFromBackend] = useState(false);


  const callApi = async() => {
    const token = await user.getIdToken();
    const backendEndpoint = "http://localhost:8080/api/verify-token";

    try {
      const response = await axios.post(backendEndpoint, token);
      const responseBody = response.data;

      console.log(responseBody);
      if(responseBody === true) {
        setResponseFromBackend(true); 
      } else {
        setResponseFromBackend(false);
      }
    } catch (error) {
      setResponseFromBackend(false);
      console.error("Error occurred while making the API call:", error);
    }
  }

  useEffect(() =>{
    if(user) {
       callApi(); 
    }
  }, [user])

  
  if (loading) {
    return <div> Loading 😠 </div>;
  }
  if (!user) {
    router.push("/")
  }



  return (
    <div>
      <div>
        <button> Continue with DASHBOARD,</button>
      </div>
      <div>
        <button onClick={() => auth.signOut()}> Logout </button>
      </div>
      <div>
      <Link href="/generatePage"> 
        {responseFromBackend ? (
          <button className='border'>Generate</button>
        ) : (
          <button className='border' disabled>Invalid JWT Token</button>
        )}
      </Link>
      </div>
    </div>


  )
}

export default dashboard