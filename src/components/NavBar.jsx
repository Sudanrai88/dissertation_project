import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import SideNavBar from './SideNavBar/SideNavBar';


function NavBar({ startColour, endColour, menuColor }) {
    const [nav, setNav] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textcolor, setTextColor] = useState({ startColour });
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    

    const handleNav = () => {
        setNav(!nav)
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640); 
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
     }, []);


    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 90) {
                setColor(startColour)
                setTextColor(endColour)
            } else {
                setColor('transparent')
                setTextColor(startColour)
            }
        }
        window.addEventListener('scroll', changeColor)
    }, [])




    return (
        <>
               { isSmallScreen ? <SideNavBar isSmallScreen={isSmallScreen} menuColor={menuColor} /> : null }

        <div style={{ backgroundColor: `${color}` }} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
            <div
                className='max-w-[1840px] m-auto  hidden sm:flex justify-between items-center p-4 text-white'
                style={{ color: `${startColour}` }}
            >
                <Link href='/dashboard'>
                    <h1 style={{ color: `${textcolor}` }} className='font-bold text-4xl ml-4'> GenTrip </h1>
                </Link>
                <ul style={{ color: `${textcolor}` }} className='Links flex font-bold'>
                    <li className='p-4'>
                        <Link href='/dashboard'>
                            <h1>Home</h1>
                        </Link>
                    </li>
                    <li className='p-4'>
                        <Link href='/explore'>
                            <h1>Explore</h1>
                        </Link>
                    </li>
                    <li className='p-4'>
                        <Link href='/account'>
                            <h1>Account</h1>
                        </Link>
                    </li>
                </ul>
            </div>
            
        </div>
          
         </>
    )
}

export default NavBar;