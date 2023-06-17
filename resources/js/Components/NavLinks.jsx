import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-4">
      <NavLink
        to="/home"
        activeClassName="text-kiwi-green"
        className="text-gray-800 hover:text-kiwi-green"
      >
        Home
      </NavLink>
      <NavLink
        to="/invoices"
        activeClassName="text-kiwi-green"
        className="text-gray-800 hover:text-kiwi-green"
      >
        Invoices
      </NavLink>
      {/* Add more navigation links */}
    </div>
  );
};

export default NavLinks;
