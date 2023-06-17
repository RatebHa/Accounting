import React from 'react';
import { usePage } from '@inertiajs/react';


const UserProfile = () => {
  const { auth } = usePage();

  return (
    <div>
      {auth.user ? (
        <p>Welcome, {auth.user.name}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default UserProfile;
