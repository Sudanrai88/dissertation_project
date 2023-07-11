import React, { useEffect } from 'react';

function AccessLocation( {setAccessedLatitude, setAccessedLongitude} ) {
  useEffect(() => {
    const handleLocationPermission = (position) => {
      const LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setAccessedLongitude(LocationData.longitude);
      setAccessedLatitude(LocationData.latitude);
      alert('Access Allowed')
    };
    

    const requestLocationAccess = () => {
      if (allowLocationCheckbox.checked) {
        navigator.geolocation.getCurrentPosition(handleLocationPermission);
      }
    };
    const allowLocationCheckbox = document.getElementById('allowLocationCheckbox');
    if (allowLocationCheckbox) {
      allowLocationCheckbox.addEventListener('change', requestLocationAccess);
    }
    return () => {
      if (allowLocationCheckbox) {
        allowLocationCheckbox.removeEventListener('change', requestLocationAccess);
      }
    };
  }, []);

  return (
    <div>
      <label htmlFor="allowLocationCheckbox">Allow Location Access</label>
      <input type="checkbox" id="allowLocationCheckbox" />
    </div>
  );
}

export default AccessLocation;
