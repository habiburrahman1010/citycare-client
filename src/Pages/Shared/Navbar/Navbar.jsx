import React, { useState } from 'react';
import { Link } from 'react-router';
import UseAuth from '../../../hooks/UseAuth';

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlelogOut = () => {
    logOut()
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const links = (
    <>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/all-issues-public'>All Issues</Link></li>
      <li><Link to='/about'>About</Link></li>
      <li><Link to='/review'>Review</Link></li>
     
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={'/'} className="btn btn-ghost text-xl">CityCare</Link>
        </div>

      
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

       
        <div className="navbar-end flex items-center gap-3">
          {user ? (
            <div className="relative">
             
              <img
                src={user.photoURL || 'https://ibb.co.com/gMXNTQ51'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-primary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 z-10">
                  <li className="px-4 py-2 text-gray-700 font-semibold">{user.displayName || "User"}</li>
                  <li>
                    <Link to='/dashboard' className="block px-4 py-2 hover:bg-gray-100 rounded">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handlelogOut}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to={'/login'} className="btn">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
