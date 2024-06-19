import React, { useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import axios from "axios";
const AccordionItem = ({ date, mainTask, subTasks, status, time,changeState }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="accordianMain">
      <div 
        className="accordianHeader" 
        onClick={() => setIsOpen(!isOpen)}>
        <div className="dropButton">
          <input type="checkbox" className="mr-2" disabled/>
          <span className="font-semibold">{date} - {mainTask}</span>
        </div>
        <div className="dropButton">
          <span className="mr-[230px]">{time}</span>
          {isOpen ? <IoIosArrowUp className="arrow" /> : <IoIosArrowDown className="arrow"/>}
        </div>
      </div>
      {isOpen && subTasks && (
         <div className="subView">
          {/* <div className="branchHorizontal" style={{ height: `${subTasks.length*36}px`}}></div> */}
          {subTasks.map((subTask, index) => (
            <div key={index} className="subtasks">
              <div className="branchVertical"  style={{ height: `${index === 0 ? '24' : '57'}px` }}></div>
              <div className="subTaskDesc">
                <input type="checkbox" className="mr-2" />
                <span>{subTask.task}</span>
              </div>
              <div>
                <span className={`status ${subTask.status === 'Billable' ? 'status-billable' : 'status-nonbillable'}`}>{subTask.status}</span>
                <span className="custom-margin">{subTask.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AccordianView = () => {
  const [tasks,setTasks] = useState([
    {
      date: '',
      mainTask: '',
      subTasks: [
        { task: '', status: '', time: '' },
        { task: '', status: '', time: '' },
        { task: '', status: '', time: '' },
        { task: '', status: '', time: '' }
      ],
      status:'' ,
      time: ''
    }
  ]);
  useEffect(()=>{
    getTimeLog();
  },[]);
const getTimeLog= async ()=>{
 
 
axios.get("http://localhost:8080/api/timetracker/getall").then(res => {
  if (res.data.data != null) {
    const updatedTasks = res.data.data.map(obj => {
      const [datePart, timePart] = obj.endTime.split('T');
      return {
        date: datePart,
        mainTask: obj.projectName,
        subTasks: [{
          task: obj.taskDescription,
          status: obj.billingStatus,
          time: obj.noOfHrsWorked+":00"
        }],
        status: obj.billingStatus,
        time: obj.noOfHrsWorked+":00"
      };
    });
    setTasks(updatedTasks);
    console.log("Updated Tasks:", updatedTasks);
  }
});
 
}
  return (
    <div className="accordian-container">
      {/* <div className="bg-white shadow rounded-lg"> */}
      {console.log("anamika",tasks)}
        {tasks.map((task, index) => (
          <AccordionItem
            key={index}
            date={task.date}
            mainTask={task.mainTask}
            subTasks={task.subTasks}
            status={task.status}
            time={task.time}
          />
        ))}
      {/* </div> */}
    </div>
  );
};




export default AccordianView;
