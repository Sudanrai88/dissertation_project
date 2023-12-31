import React from 'react'
import RecentlyViewed from './Dashboard/RecentlyViewed';


function Hero({ heading, description, image, backgroundVH, showButton, opacity, responseFromBackend, text }) {
    console.log(image);

    const containerStyle = {
        height: backgroundVH,
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    };

    const overlay = {
        height: backgroundVH,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        zIndex: 2
    };

    return (
        <div id='homeee' className="flex flex-col items-center justify-center relative " style={containerStyle}>
            <div className="absolute" style={overlay} />
                <div className='p-5 text-white z-[2]  mt-[-3rem] sm:ml-[-15rem]'>
                    <h2 className='text-5xl font-bold'>{heading}</h2>
                    <p className='py-5 text-xl'>{description}</p>
                    <RecentlyViewed responseFromBackend={responseFromBackend} text={text} />
                </div>
            
        </div>
    )
}

export default Hero