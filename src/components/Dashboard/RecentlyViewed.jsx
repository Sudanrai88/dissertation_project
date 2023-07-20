import React from 'react'
import Link from 'next/link'

function RecentlyViewed( {responseFromBackend} ) {
    return (
        <div>
            <div className='max-w-[600px]'>
                <div className='text-[40px] font-bold'>
                    Plan a new personalised trip quickly
                </div>
                <br/>
                <div>
                    <Link href="/generatePage">
                        {responseFromBackend ? (
                            <button className='border'>Plan a new trip</button>
                        ) : (
                            <button className='border' disabled>Invalid JWT Token</button>
                        )}
                    </Link>
                </div>
            </div>



        </div>

    )
}

export default RecentlyViewed