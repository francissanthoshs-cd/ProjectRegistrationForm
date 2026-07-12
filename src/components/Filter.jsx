import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

function Filter({ onClose }) {
  const [project, setProject] = useState('');
  const [job, setJob] = useState('');
  const [billable, setBillable] = useState('Billable');
  const [status, setStatus] = useState('Completed');
  const [projectToggle, setProjectToggle] = useState(false);
  const [jobToggle, setJobToggle] = useState(false);
  const [billableToggle, setBillableToggle] = useState(false);
  const [statusToggle, setStatusToggle] = useState(false);

  const handleSearch = () => {
    // Implement search functionality here
    console.log({
      project,
      job,
      billable,
      status,
      projectToggle,
      jobToggle,
      billableToggle,
      statusToggle,
    });
  };
  function CloseFilter(){
      document.getElementById('FilterDiv').hidden=true;
  }
  return (
    <div className='relative w-full h-screen' id='FilterDiv'>
      <div className='absolute right-0 w-[300px] h-[450px] bg-white z-10  p-4 shadow-lg bottom-0'>
        <GrClose
          color='black'
          className='absolute right-5 top-5 cursor-pointer'
          onClick={onClose}
        />
        <div className='mb-4 mt-10 flex items-center justify-between'>
          <label htmlFor='project' className='block text-sm font-medium text-gray-700'>
            Project
          </label>
          <Toggle
            id='project-toggle'
            className='toggle-small'
            defaultChecked={projectToggle}
            onChange={(e) => setProjectToggle(e.target.checked)}
          />
        </div>
        <div className='mb-4'>
          <select
            id='project'
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
          >
            <option value=''>Select Project</option>
            <option value='Project A'>Project A</option>
            <option value='Project B'>Project B</option>
            <option value='Project C'>Project C</option>
          </select>
        </div>

        <div className='mb-4 flex items-center justify-between'>
          <label htmlFor='job' className='block text-sm font-medium text-gray-700'>
            Job
          </label>
          <Toggle
            id='job-toggle'
            className='toggle-small'
            defaultChecked={jobToggle}
            onChange={(e) => setJobToggle(e.target.checked)}
          />
        </div>
        <div className='mb-4'>
          <select
            id='job'
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
          >
            <option value=''>Select Job</option>
            <option value='Job A'>Job A</option>
            <option value='Job B'>Job B</option>
            <option value='Job C'>Job C</option>
          </select>
        </div>

        <div className='mb-4 flex items-center justify-between'>
          <label htmlFor='billable' className='block text-sm font-medium text-gray-700'>
            Billable/Non-Billable
          </label>
          <Toggle
            id='billable-toggle'
            className='toggle-small'
            defaultChecked={billableToggle}
            onChange={(e) => setBillableToggle(e.target.checked)}
          />
        </div>
        <div className='mb-4'>
          <select
            id='billable'
            value={billable}
            onChange={(e) => setBillable(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'>
            <option value='Billable'>All</option>
            <option value='Billable'>Billable</option>
            <option value='Non-Billable'>Non-Billable</option>
          </select>
        </div>

        <div className='mb-4 flex items-center justify-between'>
          <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
            Status
          </label>
          <Toggle
            id='status-toggle'
            className='toggle-small'
            defaultChecked={statusToggle}
            onChange={(e) => setStatusToggle(e.target.checked)}
          />
        </div>
        <div className='mb-4'>
          <select
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50'
          >
            <option value='Completed'>Completed</option>
            <option value='In-progress'>In-progress</option>
            <option value='In-Review'>In-Review</option>
          </select>
        </div>

        <div>
          <button
            onClick={handleSearch}
            className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50'
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
