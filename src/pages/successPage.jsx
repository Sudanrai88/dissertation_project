import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function SuccessPage() {
  return (
    <div className='flex items-center justify-center'>
      <div className="flex flex-col items-center justify-center min-h-screen w-[60%]">

        <div className="mb-8">
          <Image
            src="/assets/SuccessPage.jpg"
             // Make sure to include your image in the public folder
            alt="Success Icon"
            width={500}
            height={500}
          />
        </div>


        <h2 className="text-2xl font-semibold mb-4">Success!</h2>


        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/generatePage">
            <button className="bg-blue-500 text-white p-4 rounded hover:bg-blue-700">
              Create Another
            </button>
          </Link>
          <Link href="/account">
            <button className="bg-green-500 text-white p-4 rounded hover:bg-green-700">
              View Itineraries
            </button>
          </Link>
        </div>

      </div>
    </div>

  );
}

export default SuccessPage;