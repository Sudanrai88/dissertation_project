import React, { useEffect } from 'react';

function AccessLocation() {
  useEffect(() => {
    const handleLocationPermission = (position) => {
      console.log(position);
      showNotification('Access Allowed');
    };

    const requestLocationAccess = () => {
      if (allowLocationCheckbox.checked) {
        navigator.geolocation.getCurrentPosition(handleLocationPermission);
      }
    };

    const showNotification = (message) => {
      if (Notification.permission === 'granted') {
        new Notification(message);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(message);
          }
        });
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
