import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ViewLogs from './components/ViewLogs'
import Calendar from './components/Calendar'
import Header from './components/Header'
import Filter from './components/Filter'

function App() {

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const handleFilterClick = () => {
    setIsFilterVisible(true);
  };
  const handleCloseFilter = () => {
    setIsFilterVisible(false);
  };
  return (
    <div className=''>
      <div className='TimeLogApp'>
        <Sidebar/>
        <div className='TimeLogContainer'>
          <Header/>
          <Calendar onFilterClick={handleFilterClick}/>
          <ViewLogs/>
        </div> 
       
     </div>
     {isFilterVisible && <Filter onClose={handleCloseFilter} />} 
    </div>
  )
}

export default App