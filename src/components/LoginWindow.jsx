
import { React, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SignUpModal from '@/components/SignUpModal';
import Image from 'next/image';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Required!'),
    password: yup.string().min(6, 'Minimum 6 characters required!').required('Required!'),
});

function LoginWindow({ signIn, signUp, signInWithEmail, loginError, signUpError }) {

    const [showSignUpModal, setShowSignUpModal] = useState(false);



    // Use Formik for form handling
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signInWithEmail(values.email, values.password);
        },
    });


    return (
        <div className=''>
            {showSignUpModal && <SignUpModal onClose={() => setShowSignUpModal(false)} signUp={signUp} signUpError={signUpError} />}

            <div className="min-h-[100vh] bg-sage-green flex justify-center items-center bg-[#5182a4]/20">
                <div className='bg-[#5182a4]/50 min-w-[80%] md:min-w-[800px] lg:min-w-[1100px] lg:min-h-[750px] min-h-full flex'>

                    <div className="bg-white p-6 rounded-md shadow-lg w-[100%] sm:w-[60%] md:w-[40%]">

                        <div className='flex flex-col max-w-[80%] m-auto'>
                            <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                            <h2 className="text-lg text-gray-600 mb-8">Plan the best day for YOU!</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <input
                                        className="w-[100%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-200"
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? <div className="text-red-500 mt-1">{formik.errors.email}</div> : null}
                                </div>
                                <div className="mb-6">
                                    <input
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-200"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.touched.password && formik.errors.password ? <div className="text-red-500 mt-1">{formik.errors.password}</div> : null}
                                </div>
                                <div className="mb-6">
                                    <button type="submit" className="w-full bg-[#5182a4]/50 text-black py-2 px-4 rounded border-gray-300 focus:outline-none focus:border-black">
                                        Sign in
                                    </button>
                                    {loginError && <div className="text-red-500 mt-2 text-center">{loginError}</div>}
                                </div>
                            </form>

                            <p className="text-sm text-black mb-6 text-center ">Forgot password?</p>

                            <div className='text-center'>
                                <div className='w-[100%] bg-[#5182a4]/50 text-black py-2 px-4 rounded border-gray-300 flex justify-center items-center'>
                                    <button onClick={() => setShowSignUpModal(true)}>
                                        Sign up?
                                    </button>
                                </div>
                                <div className="text-gray-500 my-4">or</div>
                                <div>
                                    <div >
                                        <div className='w-[100%] bg-[#5182a4]/50 text-black py-2 px-4 rounded border-gray-300 flex justify-center items-center'>
                                            <div>
                                                <button onClick={signIn}>
                                                    Continue with Google
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative md:w-[60%] sm:w-[40%]'>
                        <Image src={"/assets/LoginImage.jpg"} fill objectFit='cover' >
                        </Image>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default LoginWindow;
