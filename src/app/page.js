'use client';
import LoginWindow from '@/components/LoginWindow'
import { initFirebase } from '@/firebase/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import axios from 'axios';

export default function Login() {
  initFirebase();

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const facebookProvider = new FacebookAuthProvider();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();



  if (loading) {
    return <div> Loading 😠 </div>;
  }
  if (user) {
    router.push("/dashboard")
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth , googleProvider);
    console.log(result.user);
  }

  const facebookSignIn = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log(result.user);
  }

  return (
    <div>
      <LoginWindow signIn={signIn} facebookSignIn={facebookSignIn}/>
    </div>
  )
}
