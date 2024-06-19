import React, { useState } from 'react'
import avatar from '../assets/images/avatar.jpg'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import Filter from './Filter';
function Calendar({onFilterClick}) {
    const [hidden,setHidden]=useState(false);
  
    const [selectedDate, setSelectedDate] = useState(new Date());
      const handleDateChange = (date) => {
        setSelectedDate(date);
      };
      const handlePreviousDate = () => {
            const previousDate = new Date(selectedDate);
            previousDate.setDate(previousDate.getDate() - 1);
            setSelectedDate(previousDate);
          };
        
          const handleNextDate = () => {
            const nextDate = new Date(selectedDate);
            nextDate.setDate(nextDate.getDate() + 1);
            setSelectedDate(nextDate);
          };
        
          const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };
  return (
    <div className='  flex flex-col w-full h-50 p-5 space-y-5 justify-between'>
      <div className='flex flex-row space-x-2 '>
        <div className='flex felx-row w-full justify-between'>        
        <h1 className='text-base font-medium'>Log Your Time</h1>
        <div className='flex flex-row space-x-4'>
        <acronym  title="Import" >
            {/* <div className='w-10 h-9  flex justify-center py-1 rounded'> */}
            <CiImport size={25}  className=' cursor-pointer' color="red"/></acronym>
            <acronym  title="Export" >
            {/* <div className='w-10 h-9 bg-blue-900 flex justify-center py-1  rounded'> */}
          <CiExport size={25}  className=' cursor-pointer flex flex-row' color="green"/></acronym> </div>
             </div>
        </div>
        <div className='flex flex-row w-full h-[70px] rounded-lg border- border-300 p-3 px-4 justify-between' style={{"border":"2px solid #bae6fd"}}>
          
        <div className='flex flex-row space-x-2 '>
            <img src={avatar} className='z-10 w-8 h-8 inset-0 rounded-full mt-1'/>
            <h1 className='py-3 text-sm text-slate-500 font-medium'>ED000231 - Jullia Jonathan</h1>
          </div>
          <div className='px-2 py-2 flex flex-row '>
            
          <button onClick={handlePreviousDate} className="mr-4 mt-2">
      <GrFormPrevious size={24} />
       </button>
      <div className="text-center">
        <p className="text-lg font-semibold cursor-pointer z-20"><Datepicker
        type="date" value={selectedDate} 
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        formatDate="DD/MM/YYY"
        selected={selectedDate} onChange={handleDateChange} className="text-center rounded  py-1 focus:outline-none z-20"
      />
</p>
        
      </div>
      
      <button onClick={handleNextDate} className="ml-4 mt-2">
        <GrFormNext size={24} />
      </button>
          </div>
          <div className='flex flex-row space-x-3'>
            <button id="dropdownDefaultButton" onClick={() => setHidden(!hidden)} data-dropdown-toggle="dropdown" className="text-white bg-sky-400   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Log Time
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
          <div id="dropdown"className={`${hidden ? 'block' : 'hidden'} absolute right-[60px] mt-7 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-25 dark:bg-gray-700`}>    
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Daily logs</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Weekly logs</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Semi-monthly logs</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Monthly logs</a>
              </li>
            </ul>
          </div>
          <IoFilter  size={30} color="grey" className='pt-3 pl-2 cursor-pointer'onClick={onFilterClick} />
          
        </div>
        
      </div>
      
    </div>
  )
}

export default Calendar