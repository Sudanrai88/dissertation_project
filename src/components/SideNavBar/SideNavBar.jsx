import { React, useEffect, useState } from 'react'
import { SideNavBarData } from './SideNavBarData'
import Link from 'next/link'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';




function SideNavBar() {
    const [currentPath, setCurrentPath] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showBorder, setShowBorder] = useState(true);



    //window does not render due to NEXT ssr (server side rendering), 
    //as code is running on server first 
    useEffect(() => {
        const currentPath2 = window.location.pathname;
        setCurrentPath(currentPath2);
        // Now you can use currentPath
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);

        if (isSidebarOpen) {
            setTimeout(() => {
                setShowBorder(false);
            }, 10);
        } else {
            setShowBorder(true);
        }
    }

    return (
        <div className=''>
            <div className={`z-[10] absolute lg:relativel h-[100%] flex flex-col bg-[white] ${showBorder ? 'border-r' : ''} ${isSidebarOpen ? 'w-[200px]' : 'closedSidebar'} transition`}>
                <ul className={`SideNavBarList w-[100%] h-auto p-0 ${isSidebarOpen ? '' : 'hiddenContent'} `}>
                    <div className='w-[100%] h-[60px] list-none margin-0 
                             text-black hover:cursor-pointer text-[30px] font-bold 
                             flex flex-row justify-center items-center'>

                        <Link href="/dashboard">
                            GenTrip

                        </Link>

                    </div>
                    {SideNavBarData.map((val, key) => {
                        //Mapping function
                        return (
                            <li key={key} className='SideBarRow 
                             w-[100%] h-[60px] list-none margin-0 
                             text-black hover:cursor-pointer hover:bg-gray-200'
                                id={currentPath == val.Link ? "active" : ""}>
                                <Link href={val.Link} className='h-[100%] flex flex-row justify-center items-center'>
                                    <div className='icon flex-[30%] grid place-items-center'>
                                        {val.icon}
                                    </div>
                                    <div className='title flex-[70%]'>
                                        {val.title}
                                    </div>
                                </Link>

                            </li>
                        )
                    })}
                </ul>
                <div className={`flex items-end justify-center ${isSidebarOpen ? 'absolute bottom-0' : ''}`}>
                    <button onClick={toggleSidebar} className=''>
                        {isSidebarOpen ?
                            <div className='flex ml-[25px] mb-[10px]'>
                                
                                <KeyboardDoubleArrowLeftIcon className='mr-3' />
                                <p className='text-[15px] text-gray-800 mx-3'>
                                    Press to hide
                                </p>
                            </div>

                            : <div className='flex items-end align-bottom ml-[5px] mt-[5px]'>
                                <MenuIcon />
                            </div>}
                    </button>
                </div>


            </div >


        </div >
    )
}

export default SideNavBar;