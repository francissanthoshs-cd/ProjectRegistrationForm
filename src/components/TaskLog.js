import React, { useEffect, useState } from 'react'
import { FaMinus } from "react-icons/fa6";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiSquarePlus } from 'react-icons/ci';
import axios from 'axios';
import { BsListTask } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const TaskLog = () => {
    //Form Data Values
    const [forms, setForms] = useState({
        isActive: 1,
        createdBy: "Shrini",
        createdDateTime: "2024-06-07T05:58:44.87",
        updatedBy: "string",
        updatedDateTime: "2024-06-07T05:58:44.87",
        projectname: "", jobId: "", jobName: "", jobStartDate: "",
        jobEndDate: "", taskAssignedBy: "", taskDescription: "", reminderDate: "",
        // files: []
    })
    const [intialData, setInitialData] = useState({
        isActive: 1,
        createdBy: "Shrini",
        createdDateTime: "2024-06-07T05:58:44.87",
        updatedBy: "string",
        updatedDateTime: "2024-06-07T05:58:44.87",
        projectname: "", jobId: "", jobName: "", jobStartDate: "",
        jobEndDate: "", taskAssignedBy: "", taskDescription: "", reminderDate: "", startTime: null,
        endTime: null,
        totalNoOfHours: null
        // files: []
    })

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [allJobs, setAllJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState('');
    const [availableMembers, setAvailableMembers] = useState([])
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [projects, setProjects] = useState([])
    const [projectStartDate, setProjectStartDate] = useState('');

    const [nav, setNav] = useState(false)
    const toggleNav = async () => {
        setNav(!nav)
        setForms(intialData)
        const projs = await axios.get('http://192.168.1.41:8080/api/projects/getall')
        setProjects(projs.data.data)
    }

    //set the hrs and ins for totalNoOfHours
    const handleHourChange = (e) => {
        const selectedHours = e.target.value.padStart(2, '0');
        setHours(selectedHours);
        updateTotalHours(selectedHours, minutes);
    };

    const handleMinuteChange = (e) => {
        const selectedMinutes = e.target.value.padStart(2, '0');
        setMinutes(selectedMinutes);
        updateTotalHours(hours, selectedMinutes);
    };

    const updateTotalHours = (selectedHours, selectedMinutes) => {
        const now = new Date();
        const isoDateString = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            selectedHours,
            selectedMinutes
        ).toISOString();
        setForms({ ...forms, totalNoOfHours: isoDateString });
    };

    //Handle Project StartDate
    const handleProjectChange = async (event) => {
        const selectedValue = event.target.value;
        setForms({ ...forms, projectname: selectedValue });
        const selectedProject = projects.find(project => project.projectName === selectedValue);
        if (selectedProject) {
            const parsedDate = new Date(selectedProject.projectStartDate);
            const dateOnly = parsedDate.toISOString().split('T')[0];
            setProjectStartDate(dateOnly);
            console.log(parsedDate)
        }
    };

    //timer type state
    const [timerType, setTimerType] = useState('th');

    //handle timer type
    const handleOptionChange = (option) => {
        setTimerType(option);
        let updatedForms = { ...forms };

        if (option === 'stent') {
            updatedForms = { ...updatedForms, startTime: '10:00', endTime: '02:00' };
            delete updatedForms.totalNoOfHours;
        } else if (option === 'th') {
            updatedForms = { ...updatedForms, totalNoOfHours: '00:00' };
            delete updatedForms.startTime;
            delete updatedForms.endTime;
        } else {
            delete updatedForms.startTime;
            delete updatedForms.endTime;
            delete updatedForms.totalNoOfHours;
        }

        setForms(updatedForms);
    };

    const saveStartTimeInISOFormat = (name, hours, minutes) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const isoDateTime = `${currentDate}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;
        setForms(prevForms => ({ ...prevForms, [name]: isoDateTime }));
    };

    //File Upload
    const handleFileChangeAndUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        setForms({ ...forms, files: [...forms.files, ...files] });

        if (files.length > 0) {
            console.log(files);
            event.target.value = '';
        } else {
            console.log('No files selected');
        }
    };


    const handleJobChange = (event) => {
        setSelectedJob(event.target.value)
        if (isValueUnique(event.target.value)) {
            alert(`${event.target.value} is already Done`);
            setForms({ ...forms, jobId: "", jobName: "" });
            setIsButtonDisabled(true)
            return;
        }
        const selectedIndex = event.target.selectedIndex - 1;
        if (selectedIndex >= 0) {
            setForms({
                ...forms, jobId: jobList[selectedIndex].id,
                jobName: jobList[selectedIndex].name
            });
            setIsButtonDisabled(false)
        }
    }

    const isValueUnique = (value) => {
        const lowerCaseValue = value.toLowerCase();
        return allJobs.some(name => name.toLowerCase() === lowerCaseValue);
    };
    const jobList = [
        { id: "A1", name: "Research and Analysis" },
        { id: "B2", name: "Design and Prototyping" },
        { id: "C3", name: "Development and Coding" },
        { id: "D4", name: "Testing and Debugging" },
        { id: "E5", name: "Deployment and Maintenance" }
    ];

    const handleRemoveFile = (indexToRemove) => {
        const updatedSelectedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(updatedSelectedFiles);
        const updatedforms = { ...forms };
        updatedforms.files = forms.files.filter((_, index) => index !== indexToRemove);
        setForms(updatedforms);
    };

    // End of File Upload
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tl = await axios.get('http://192.168.1.41:9000/api/employee/all')
                setAvailableMembers(tl.data.data.map(project => project.employeeName))
                const jobs = await axios.get('http://192.168.1.41:8080/api/jobs/getall')
                setAllJobs(jobs.data.data.map(job => job.jobName))
                console.log(allJobs)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    }, [])

    //Setting Data Without Validation 
    const withoutValid = (event) => {
        const { name, value } = event.target;
        if (name === 'startTime' || name === 'endTime') {
            const [hours, minutes] = value.split(':');
            saveStartTimeInISOFormat(name, hours, minutes);
            return;
        }
        setForms(prevForms => ({ ...prevForms, [name]: value }));
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        const newDate = new Date(value);

        if (!forms.projectname) {
            alert("Please select a project first.");
            return;
        }
        const selectedProject = projects.find(project => project.projectName === forms.projectname);
        if (!selectedProject) {
            console.error("Selected project not found:", forms.projectname);
            return;
        }

        const projectStartDate = new Date(selectedProject.projectStartDate);
        console.log(projectStartDate)
        const projectSubmissionDate = new Date(selectedProject.submissionDate);
        console.log(projectSubmissionDate)


        if (name === 'jobStartDate') {
            if (newDate < projectStartDate) {
                alert("Job start date cannot be before project start date!");
                return;
            }

            if (newDate >= projectSubmissionDate) {
                alert("Job start date cannot be on or after project submission date!");
                return;
            }

            if (!forms.jobEndDate) {
                setForms(prevForms => ({
                    ...prevForms,
                    jobStartDate: newDate.toISOString(),
                    jobEndDate: newDate.toISOString()
                }));
            } else if (newDate > new Date(forms.jobEndDate)) {
                alert("Start Date cannot be greater than End Date");
            } else {
                setForms(prevForms => ({ ...prevForms, jobStartDate: newDate.toISOString() }));
            }
        } else if (name === 'jobEndDate') {
            if (newDate < projectStartDate) {
                alert("Job end date cannot be before project start date!");
                return;
            }

            if (newDate > projectSubmissionDate) {
                alert("Job end date cannot be after project submission date!");
                return;
            }

            if (forms.jobStartDate && newDate < new Date(forms.jobStartDate)) {
                alert("End Date cannot be less than Start Date");
                return;
            }

            setForms(prevForms => ({ ...prevForms, jobEndDate: newDate.toISOString() }));
        }
    };

    //Form Submission
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://192.168.1.41:8080/api/jobs/add', forms)
            .then((response) => {
                alert("Task Uploaded Successfully")
            }).catch((error) => {
                console.log("Enter Data")
                alert(error)
            })
        console.log(forms)
        toggleNav()
    }

    return (
        <>
            <BsListTask color="white" size={20} onClick={toggleNav} />
            {
                nav && (
                    <div className='taskslog fixed right-0 bg-white h-full overflow-y-auto top-0 w-[50%] rounded-l border z-50 opacity-100'>
                        <div className='flex justify-between'>
                            <header className='title justify-between flex'>
                                <div className='pagename font-poppins ml-4 mt-1 text-2xl font-semibold'>Task Details</div>
                            </header>
                            <div className='w-[10%] flex justify-center items-center'>
                                <RxCross2 size={30} className=' text-blue-300 hover:text-red-700 stroke-2 relative top-1 right-3' onClick={toggleNav} />
                            </div>
                        </div>
                        <div className='bodyform mt-3'>
                            <form onSubmit={onSubmit} className='tasks-details mr-5'>

                                {/* Project Selection */}
                                <div className='projname mt-2 ml-5'>
                                    <div>
                                        <label className='font-poppins font-semibold text-sm' htmlFor='projname'>Project Name
                                            <span className='text-red-700'>*</span>
                                        </label>
                                    </div>
                                    <div className='flex'>
                                        <div className='w-[90%] mr-2'>
                                            <select name="projectname" id="projectname"
                                                onChange={handleProjectChange} value={forms.projectname}
                                                placeholder='Enter the Job Name'
                                                className="bg-blue-50 text-sm text-gray-900 rounded-lg font-poppins
                         focus:ring-blue-500 focus:border-blue-500 font-extralight block w-full p-2.5"
                                                required={true}>
                                                <option value="" className='p-2' disabled>Select Project</option>
                                                {projects.map((project, index) => (
                                                    <option key={index} value={`${project.projectName}`}>
                                                        {project.projectName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/*Job Type Selection */}
                                <div className='jbname mt-2 ml-5'>
                                    <div className='jbnmlbl'>
                                        <label className='font-poppins font-semibold text-sm' htmlFor='jbname'>Job Name </label>
                                    </div>
                                    <div className='flex'>
                                        <div className=' w-[90%] mr-2'>
                                            <select
                                                name="jobName"
                                                id="jobName"
                                                className='bg-blue-50 text-gray-900 text-sm rounded-lg font-poppins block mr-3 w-full p-2.5'
                                                onChange={handleJobChange}
                                                value={selectedJob}
                                            >
                                                <option value="" disabled>--Select a Job--</option>
                                                {jobList.map((job) => (
                                                    <option key={job.id} value={job.name}>
                                                        {job.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <IoIosAddCircleOutline size={25} className='text-blue-500' />
                                        </div>
                                    </div>
                                </div>

                                {/* Start Date and End Date of the Task */}
                                <div className='mt-2 ml-5 flex w-[90%]'>
                                    <div className='stdate w-[40%]'>
                                        <div className='stdatlbl'>
                                            <label className='font-poppins font-semibold text-sm' htmlFor='strdate'>Start Date</label>
                                        </div>
                                        <div className='w-full'>
                                            <input value={forms.jobStartDate ? forms.jobStartDate.slice(0, 10) : ""} onChange={handleChange}
                                                name="jobStartDate" id="jobStartDate" type='date'
                                                className="bg-blue-50  text-gray-900 text-sm pr-2 rounded-lg font-poppins
                         focus:ring-blue-500 focus:border-blue-500 font-extralight block mr-3 w-full p-2.5">
                                            </input>
                                        </div>
                                    </div>
                                    <div className='endate ml-5 w-[40%]'>
                                        <div className='endatlbl '>
                                            <label className='font-poppins font-semibold' htmlFor='strdate'>End Date</label>
                                        </div>
                                        <div className=' w-full'>
                                            <input value={forms.jobEndDate ? forms.jobEndDate.slice(0, 10) : ""} onChange={handleChange}
                                                name="jobEndDate" id="jobEndDate" type='date'
                                                className="bg-blue-50  text-gray-900 text-sm pr-2 rounded-lg font-poppins
                         focus:ring-blue-500 focus:border-blue-500 font-extralight block mr-3 w-full p-2.5">
                                            </input>
                                        </div>
                                    </div>
                                </div>

                                {/* Start and End Time or the Total No. of Hours */}
                                <div className='tmspntlbl mt-2 ml-5'>
                                    <div className='timespntlbl'>
                                        <label className='font-poppins text-sm font-semibold' htmlFor='time'>Hours</label>
                                    </div>
                                    <div className='mb-1'>
                                        <input type="radio" id="option1" className='bg-blue-600 mx-0.5'
                                            name="options" value="th" checked={timerType === 'th'}
                                            onChange={() => handleOptionChange('th')} />
                                        <span className="option1 text-sm mx-1 font-poppins font-semibold">Total hours</span>

                                        <input type="radio" id="option2" name="options" value="stent"
                                            checked={timerType === 'stent'} className='bg-blue-600 ml-3 mr-0.5'
                                            onChange={() => handleOptionChange('stent')}
                                        />
                                        <span className="option2 text-sm mx-1 font-poppins font-semibold">Start and End Time</span>

                                    </div>
                                    {timerType === 'stent' && (
                                        <div className='w-[60%] flex '>
                                            <div className='w-[80%] mr-2.5'>
                                                <label htmlFor="startTime" >Start Time:</label>
                                                <input
                                                    type="time"
                                                    id="startTime"
                                                    name="startTime"
                                                    className='bg-blue-50 text-gray-900 text-sm mt-0.5 pr-2 rounded-lg font-poppins block w-full p-2.5'
                                                    value={forms.startTime ? forms.startTime.slice(11, 16) : ""}
                                                    onChange={withoutValid}
                                                />
                                            </div>
                                            <div className='w-[80%] ml-2.5'>
                                                <label htmlFor="endTime" >End Time:</label>
                                                <input
                                                    type="time"
                                                    id="endTime"
                                                    name="endTime"
                                                    className='bg-blue-50 text-gray-900 text-sm mt-0.5  pr-2 rounded-lg font-poppins block w-full p-2.5'
                                                    value={forms.endTime ? forms.endTime.slice(11, 16) : ""}
                                                    onChange={withoutValid}
                                                />
                                            </div>

                                        </div>
                                    )}
                                    {timerType === "th" && (
                                        <div className=' w-full flex '>
                                            <div className="bg-blue-50 p-2 rounded-md flex w-[40%] mr-2">
                                                <select value={hours} onChange={handleHourChange} className="mr-2 bg-blue-50 w-full text-center">
                                                    {[...Array(24).keys()].map((hour) => (
                                                        <option key={hour} value={hour < 10 ? `0${hour}` : `${hour}`}>
                                                            {hour < 10 ? `0${hour}` : `${hour}`}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="mr-2">:</span>
                                                <select value={minutes} onChange={handleMinuteChange} className="bg-blue-50 w-full text-center">
                                                    {[...Array(60).keys()].map((minute) => (
                                                        <option key={minute} value={minute < 10 ? `0${minute}` : `${minute}`}>
                                                            {minute < 10 ? `0${minute}` : `${minute}`}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Name of the Person who assigned the task */}
                                <div className='assignees mt-2 ml-5'>
                                    <div className='assignees'>
                                        <label className='font-poppins text-sm font-semibold' htmlFor='assignees'>Tasks Assigned By
                                            <span className='text-red-700'>*</span> </label>
                                    </div>
                                    <div className=' w-[90%]'>
                                        <select name="taskAssignedBy" id="taskAssignedBy"
                                            onChange={withoutValid}
                                            value={forms.taskAssignedBy}
                                            placeholder='Enter the Job Name'
                                            className="bg-blue-50 text-sm text-gray-900 rounded-lg font-poppins
                          font-extralight block w-full p-2.5"
                                            required={true}>
                                            <option value="" disabled>Select a Team Leader</option>
                                            {availableMembers.map((member, index) => (
                                                <option key={index} value={member}>{member}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Task Description */}
                                <div className='tkds mt-2 ml-5'>
                                    <div className='tkdslbl'>
                                        <label className='font-poppins font-semibold text-sm' htmlFor='task'>Task Description </label>
                                    </div>
                                    <div>
                                        <textarea value={forms.taskDescription} onChange={withoutValid}
                                            name="taskDescription" id="taskDescription"
                                            className="bg-blue-50 w-[90%] text-gray-900 text-sm rounded-lg font-poppins
                                                block mr-3 p-2.5"  rows="3" cols="25">
                                        </textarea>
                                    </div>
                                </div>

                                {/* Reminder Date */}
                                <div className='redate mt-2 ml-5'>
                                    <div className='redatlbl'>
                                        <label className='font-poppins font-semibold ' htmlFor='redate'>Reminder Date</label>
                                    </div>
                                    <div>
                                        <input value={forms.reminderDate} onChange={withoutValid}
                                            name="reminderDate" id="reminderDate" type='date'
                                            className="bg-blue-50 w-[90%] text-gray-900 text-sm pr-2 
                                            rounded-lg font-poppins block mr-3 p-2.5">
                                        </input>
                                    </div>
                                </div>

                                {/* <div className='files mt-2 ml-5 '>
                                    <div>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            onChange={handleFileChangeAndUpload}
                                            multiple
                                            style={{ display: 'none' }}
                                        />

                                        <button onClick={() => document.getElementById('fileInput').click()}
                                            className="border-2 border-dashed border-blue-700 flex justify-center bg-blue-50 w-[90%] text-blue-700 text-sm rounded-lg p-2.5">
                                            <CiSquarePlus size={25} className='text-blue-700' />
                                            <label className='font-poppins mt-0.5 font-medium'>Tap to Upload Job Related Documents</label>
                                        </button>
                                        {selectedFiles.length > 0 && (
                                            <div>
                                                Selected Files:
                                                <ul>
                                                    {selectedFiles.map((file, index) => (
                                                        <li className='w-[90%] justify-between flex px-2 py-2 rounded border shadow-md' key={index}>
                                                            <div>{file.name}</div>
                                                            <div><button onClick={() => handleRemoveFile(index)}>
                                                                <FaMinus />
                                                            </button></div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div> */}

                                <div className='buttons mt-4 w-full'>
                                    <div className='mt-2 flex  justify-end'>
                                        <button className={`py-3 px-8 mx-4 rounded-lg font-poppins font-semibold ${allJobs.includes(forms.jobName) ?
                                            'bg-gray-200 text-black' : 'bg-blue-500 text-white'}`}
                                            type="submit" disabled={allJobs.includes(forms.jobName)}> Add Task
                                        </button>
                                        <button className='bg-gray-200 text-black font-poppins font-semibold py-3 px-8  rounded-lg' onClick={toggleNav}> Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default TaskLog