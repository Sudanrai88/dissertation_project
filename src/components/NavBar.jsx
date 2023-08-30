import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


function NavBar({ startColour, endColour }) {
    const [nav, setNav] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textcolor, setTextColor] = useState({ startColour });
    

    const handleNav = () => {
        setNav(!nav)
    }

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

    //Change anchor tags to Link as the whole point of next is to have single page aplpications, meaning that the entirity of the website/application is loaded first. Therefore no wait times.

    //This means no smooth scrolling however move 'Gallery' Link to the images of the about page where we can implement the slider into the about section. We can implement that slider function (Library) in the MODAL of the about section. 

    return (
        <div style={{ backgroundColor: `${color}` }} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
            <div
                className='max-w-[1840px] m-auto flex justify-between items-center p-4 text-white'
                style={{ color: `${startColour}` }}
            >
                <Link href='/dashboard'>
                    <h1 style={{ color: `${textcolor}` }} className='font-bold text-4xl ml-4'> GenTrip </h1>
                </Link>
                <ul style={{ color: `${textcolor}` }} className='Links hidden sm:flex font-bold'>
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
    )
}

export default NavBar;