'use client';
import LoginWindow from '@/components/LoginWindow'
import { initFirebase } from '@/firebase/firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth'
import { React, useState } from 'react';


export default function Login() {
  initFirebase();

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [loginError, setLoginError] = useState('');
  const [signUpError, setSignUpError] = useState('');


  if (loading) {
    return <div> Loading 😠 </div>;
  }
  if (user) {
    router.push("/dashboard")
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result.user);
  }

  const signUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result.user);
    } catch (error) {
      setSignUpError('Invalid email or password.')
      console.error('Error during sign-up:', error);
    }
  }

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError('Invalid credentials.');
    }
  }

  return (
    <div>
      <LoginWindow signIn={signIn} signUpError={signUpError} loginError={loginError} signInWithEmail={signInWithEmail} signUp={signUp} />
    </div>
  )
}
