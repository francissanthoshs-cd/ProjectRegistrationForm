import React, { useState } from 'react'
import logo from '../assets/images/logo.jpg'
import { IoReorderFourOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import Signout from './Signout';
import { GoProjectRoadmap } from 'react-icons/go';
import ProjReg from './ProjReg';
import TaskLog from './TaskLog';
function Sidebar() {
  const iconComponents = { IoReorderFourOutline, MdHome, FaFileCirclePlus, MdSettings };
  const iconAddOn = ["More", "Home", "Add Daily Log", "Settings"];
  const [signout, setSignout] = useState(false);
  const toggleSignOut = () => {
    setSignout(!signout);
  };
  const [projReg, setProjReg] = useState(false)
  const toggleProjAdd = () => {
    setProjReg(!projReg)
  }

  return (
    <div className='SideBarContainer'>
      <div className='Logo' >
        <img src={logo} />
      </div>
      <ul className='SideBarIcons'>
        {Object.keys(iconComponents).map((iconName, index) => {
          const IconComponent = iconComponents[iconName];
          return (
            <acronym title={iconAddOn[index]} ><div className='IconList'>
              <li key={index}><IconComponent color="white" size={20} /></li></div>
            </acronym>
          );
        })
        }
        <acronym title="Add Project" >
          <li className='IconList'>
            <ProjReg/>
            {console.log(projReg)}
          </li>
        </acronym>

        <acronym title="Add Task" >
          <li className='IconList'>
            <TaskLog/>
            {console.log(projReg)}
          </li>
        </acronym>

        <acronym title="Signout" >
          <li className='IconList'>
            <PiSignOutBold color="white" size={20} onClick={() => toggleSignOut()} />
            {signout && (<Signout />)}
          </li></acronym>
      </ul>
    </div>
  )
}

export default Sidebar