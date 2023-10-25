import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    netlifyIdentity.logout();
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default LogoutButton;