import Link from 'next/link'
import React from 'react'
import { FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <div className='sb_footer section_padding p-[4rem] bg-[#f0f1f3] flex flex-col items-center '>
                <div className='sb_footer-links'>
                    <div className='sb_footer-links-div ml-[200px]'>
                        <div className='Customercare'>
                            <h4 > CUSTOMER CARE </h4>
                            <div>
                                <a>
                                    <p> FILLER</p>
                                </a>
                                <a>
                                    <p>FILLER</p>
                                </a>
                                <a>
                                    <p>FILLER</p>
                                </a>
                                <a>
                                    <p>FILLER</p>
                                </a>
                                <a>
                                    <p>FILLER</p>
                                </a>
                            </div>

                        </div>

                    </div>

                    <div className='sb_footer-links-div'>
                        <h4> GUIDES AND RESOURCES </h4>
                        <p>Sign up for travel tips and places to visit!</p>
                        <input className='border p-2 mt-[5px]' placeholder='Enter your email' />
                    </div>

                    <div className='sb_footer-links-div'>
                        <h4 id='logo'> GenericLogo </h4>
                        <div className='socialMedia'>
                            <p><FaInstagram size={30} /> </p>
                        </div>
                    </div>
                </div>
                <hr className='hr1'></hr>

                <div className='sb_footer-below'>
                    <div className='sb_footer-copyright text-[13px] leading-[15px] font-[600]'>
                        <p>
                            @{new Date().getFullYear()} Sudan Rai. All rights reserved.
                        </p>
                    </div>
                    <div className='sb_footer-below-links'>
                        <a><div><p>Terms & Conditions</p></div></a>
                    </div>
                </div>

            </div>
        </footer>

    )
}

export default Footer