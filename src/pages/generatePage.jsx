import React from 'react'
import AccessLocation from '@/components/AccessLocation';
import TypedLocation from '@/components/TypedLocation';
import RadiusSelector from '@/components/RadiusSelector';
import PreferenceSelector from '@/components/Preferences/PreferenceSelector';

function generatePage() {
  return (
    <div>
       <div>
        <button>
          <AccessLocation />
        </button>
      </div>
      <div>
        <TypedLocation />
      </div>
      <div>
        <RadiusSelector />
      </div>
      <div>
        <PreferenceSelector />
      </div>
    </div>
    
  )
}

export default generatePage