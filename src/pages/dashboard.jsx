import '@/styles/globals.css';
import React from 'react';
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { initFirebase } from '@/firebase/firebaseApp';
import { useRouter } from 'next/navigation';
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import Link from 'next/link';


function dashboard() {

  initFirebase();
  const auth = getAuth();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
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
        <button className='border'>
          generate 
        </button>
        </Link>
      </div>
    </div>


  )
}

export default dashboard