import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";
import avatar from '../assets/images/avatar.jpg';

function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className='headerContainer'>
      <div className='flex-column'>
        <h1 className='header-text'>
          Hello Julia!!!
        </h1>
        <h1 className='header-sub-text'>
          Welcome back!
        </h1>
      </div>
      <div className='header-left-div'>
        <form>
          <div className="search">
            <input
              type="text"
              id="search"
              style={{ backgroundColor: '#f0f9ff' }}
              className={`custom-input ${isSearchFocused ? 'expanded' : 'collapsed'} `}
                            placeholder='Search anything...'
              required
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button type="button" className="search-absolute">
              <IoSearchSharp size={20} color="grey" />
            </button>
          </div>
        </form>
        <div className='profileStatus'>
          <BsBellFill size={28} color="black" className='notifBell' />
          <div className='notificationNumber'>
            <h1 className='number'>4</h1>
          </div>
        </div>
        <div className='profileStatus'>
          <img src={avatar} className='profileimg' />
          <div className='onlineStatus' ></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
