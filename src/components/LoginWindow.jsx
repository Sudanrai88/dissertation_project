import React from 'react';
import LoginButton from './LoginButton';
import { RiFacebookCircleFill } from "react-icons/ri";

function LoginWindow() {
    let facebookLogo = <RiFacebookCircleFill />;

    return (
        <div>
            <div className="min-h-[100vh] bg-sage-green flex justify-center items-center bg-green-50/80">
                <div className='bg-green-200 min-w-[50%] min-h-full'>
                    <div className="bg-white max-w-sm p-6 rounded-md shadow-lg">
                        <div className='flex flex-col max-w-[80%] m-auto'>
                            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                            <h2 className="text-lg text-gray-600 mb-8">Plan the best day for YOU!</h2>
                            <form>
                                <div className="mb-4">
                                    <input
                                        className="w-[100%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-200"
                                        type="email"
                                        placeholder="Email Address"
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-200"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                            </form>
                            <div className="mb-6">
                                <button className="w-full bg-green-200 text-black py-2 px-4 rounded border-gray-300 focus:outline-none focus:border-black">
                                    Sign in
                                </button>
                            </div>
                            <p className="text-sm text-black mb-6 ">Forgot password?</p>
                            <div className='text-center'>
                                <div >
                                    <LoginButton authType="Google" logo={facebookLogo} />
                                </div>
                                <div className="text-gray-500 my-4">or</div>
                                <div>
                                    <LoginButton logo={"there"} authType="Facebook" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default LoginWindow;
