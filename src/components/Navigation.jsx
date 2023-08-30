import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import SideNavBar from './SideNavBar/SideNavBar';
import NavBar from './NavBar';

function Navigation({ startColour, endColour }) {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState('transparent');
  const [textcolor, setTextColor] = useState(startColour);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor(startColour);
        setTextColor(endColour);
      } else {
        setColor('transparent');
        setTextColor(startColour);
      }
    };

    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Mobile View */}
      <div className="sm:hidden">
        <button onClick={toggleSidebar}>
          <AiOutlineMenu />
        </button>
        {isSidebarOpen && (
          <div className="sidebar">
            <SideNavBar />
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <NavBar />
      </div>
    </div>
  );
}

export default Navigation;