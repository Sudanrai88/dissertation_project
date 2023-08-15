import React from 'react'
import Link from 'next/link'

function RecentlyViewed({ responseFromBackend, text }) {
    return (
        <div>
            <div>
                <Link href="/generatePage" className='z-10'>
                    {responseFromBackend ?
                        (<button className='border rounded-[15px] text-white font-bold px-[16px] pb-[4px] pt-[2.5px] text-[20px] bg-[rgb(246,155,70)]'>{text}</button>)
                        :
                        (<button className='border' disabled>Invalid JWT Token</button>)
                    }
                </Link>
            </div>
        </div>


    )
}

export default RecentlyViewed