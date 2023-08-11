import React from 'react'
import Link from 'next/link'

function successPage() {
  return (
    <div>
        <Link href="/account">
                View and adjust your itinerary here!
        </Link>
    </div>
  )
}

export default successPage