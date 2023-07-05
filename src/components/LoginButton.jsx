import React from 'react'


function LoginButton({ authType}) {
    return (
      <div className='w-[100%] bg-green-200 text-black py-2 px-4 rounded border-gray-300 flex justify-center items-center'>
      <div>
        <button>
            Continue with {authType}  
        </button>
      </div>
        
      </div>
    );
  }
//Going to have firebase stuff here. Depending on authType the authentication route will be different.

export default LoginButton