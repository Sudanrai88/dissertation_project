import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

 const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email format').required('Required!'),
        password: yup.string().min(6, 'Minimum 6 characters required!').required('Required!'),
    });

function SignUpModal({ onClose, signUp, signUpError }) {


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            signUp(values.email, values.password);
            onClose();
        },
    });

    return (
        <div className="">
            <div className="">
                <div className="modal-bg fixed inset-0 bg-gray-500 opacity-70" onClick={onClose}></div>
                <div className="modal-content bg-white rounded-lg p-5">
                    <div className='flex justify-end'>
                        <button onClick={onClose}>X</button>
                    </div>
                    <div >
                        <h1 className="text-2xl font-bold mb-4">Sign Up!</h1>
                    </div>
                    <h2 className="text-lg text-gray-600 mb-8"> Please provide the required details below</h2>
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
                        {/* The input fields for email and password will be similar to your existing form, adjust them as needed */}
                        <button type='submit' onClick={signUp}>Sign Up</button>
                        {signUpError && <div className="text-red-500 mt-2 text-center">{signUpError}</div>}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpModal;
