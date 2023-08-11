import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <div className='max-w-[100%]'>

      <div className='navBar flex m-auto max-w-[60%]'>
        <Link href="/dashboard">
          HOME
        </Link>
        <div className="links flex ml-[20px]">
          <div>
            NavBar
          </div>
          <div>
            <Link href="/account">
              Account
            </Link>
          </div>
          <div>
            <Link href="/account">
              Setting
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar