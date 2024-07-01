import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { GoProjectRoadmap } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx';

const ProjReg = () => {
    const [ids, setIds] = useState([])
    const [projectNames, setProjectNames] = useState([])
    const [availableMembers, setAvailableMembers] = useState([])

    const [formData, setFormData] = useState({
        isActive: 1,
        createdBy: "Shrini",
        createdDateTime: "2024-06-07T05:58:44.87",
        updatedBy: "string",
        updatedDateTime: "2024-06-07T05:58:44.87",
        // projectId: "",
        projectName: "",
        projectClient: "Cloud Destinations Pvt Ltd.,",
        projectDepartment: "SE",
        projectType: "Internal",
        projectStartDate: "",
        submissionDate: "",
        // files: [],
        projectmembersList: []
    });

    const [initialData, setInitialData] = useState({
        isActive: 1,
        createdBy: "Shrini",
        createdDateTime: "2024-06-07T05:58:44.87",
        updatedBy: "string",
        updatedDateTime: "2024-06-07T05:58:44.87",
        // projectId: "",
        projectName: "",
        projectDepartment: "SE",
        projectClient: "Cloud Destinations Pvt Ltd.,",
        projectType: "Internal",
        projectStartDate: "",
        submissionDate: "",
        // files: [],
        projectmembersList: []
    },
    );

    const [selectedFiles, setSelectedFiles] = useState([]);
    const designations = ["Manager", "Developer", "Designer", "Tester", "Analyst"];
    const [suggestions, setSuggestions] = useState([
        "Olivia Enterprises", "Liam Innovations", "Sophia Solutions", "Noah Technologies",
        "Ava Ventures", "William Consulting", "Isabella Industries", "James & Co.",
        "Mia Marketing", "Benjamin Holdings", "Charlotte Creations", "Alexander Associates",
    ]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [error, setError] = useState('');
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [availableDesignations, setAvailableDesignations] = useState(designations);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [selectedMemberEmail, setSelectedMemberEmail] = useState('');
    const [errors, setErrors] = useState('')
    const [nav, setNav] = useState(false)

    //Open this Window fn
    const toggleNav = async () => {
        setNav(!nav)
        setFormData(initialData)
        setSelectedMember(''); setFilteredSuggestions([]); setError(''); setErrors('');
        setSelectedDesignation(''); setAvailableDesignations(designations); setIsDropdownVisible(false);
        setSelectedMemberId(''); setSelectedMemberEmail(''); setSelectedFiles([]);
        const teamem = await axios.get('http://192.168.2.38:9000/api/employee/all')
        setAvailableMembers(teamem.data.data)
    }

    useEffect(() => {
        if (selectedMember && selectedDesignation) {
            handleAddMember(selectedMember, selectedDesignation);
        }

    }, [selectedMember, selectedDesignation]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pId = await axios.get('http://192.168.1.68:8080/api/projects/getall');
                setIds(pId.data.data.map(project => project.projectId));
                const pName = await axios.get('http://192.168.1.68:8080/api/projects/getall');
                setProjectNames(pName.data.data.map(project => project.projectName));
                const teamem = await axios.get('http://192.168.2.38:9000/api/employee/all')
                setAvailableMembers(teamem.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    //File Upload
    const handleFileChangeAndUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        setFormData({ ...formData, files: [...formData.files, ...files] });

        if (files.length > 0) {
            console.log(files);
            event.target.value = '';
        } else {
            console.log('No files selected');
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        const updatedSelectedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(updatedSelectedFiles);

        const updatedFormData = { ...formData };
        updatedFormData.files = formData.files.filter((_, index) => index !== indexToRemove);
        setFormData(updatedFormData);
    };
    //End of File Upload

    //Team Members
    const currentDateTime = new Date().toISOString();
    const updatedBy = "Francis";
    const handleAddMember = (member, designation) => {
        // Find the selected member object
        const selectedMemberObj = availableMembers.find(m => m.firstName === member);

        if (selectedMemberObj) {
            const { employeeId, emailId } = selectedMemberObj; // Destructure id and email from the selected member object
            setFormData(prevFormData => ({
                ...prevFormData,
                projectmembersList: [...prevFormData.projectmembersList, {
                    projectMembersName: member,
                    projectMembersRole: designation,
                    projectMemberId: employeeId,
                    projectMemberEmailId: emailId,
                    isActive: 1,
                    createdBy: updatedBy,
                    createdDateTime: currentDateTime,
                    updatedBy: updatedBy,
                    updatedDateTime: currentDateTime,
                    // projectId: prevFormData.projectId
                    // empName: member, project_role: designation,
                    // empId: employeeId, empEmail: emailId, isActive: 1
                }]
            }));

            console.log(selectedMember, selectedDesignation)
            setAvailableMembers(prevMembers => prevMembers.filter(m => m.firstName !== member));
            setSelectedMember('');
            setSelectedDesignation('');
            setAvailableDesignations(prevDesignations => prevDesignations.filter(d => d !== designation));
        }
    };

    const handleRemoveMember = (member, event) => {

        event && event.preventDefault();
        // Find the member object to be removed
        const removedMember = formData.projectmembersList.find(item => item.projectMembersName === member);

        if (removedMember) {
            // Update the formData state to remove the member
            setFormData(prevFormData => ({
                ...prevFormData,
                projectmembersList: prevFormData.projectmembersList.filter(m => m.projectMembersName !== member)
            }));

            // Add the removed member back to available members
            setAvailableMembers(prevMembers => [
                ...prevMembers,
                {
                    firstName: removedMember.projectMembersName,
                    employeeId: removedMember.projectMemberId,
                    emailId: removedMember.projectMemberEmailId
                }
            ]);

            // Add the removed member's designation back to available designations
            setAvailableDesignations(prevDesignations => [
                ...prevDesignations,
                removedMember.projectMembersRole
            ]);

        }
    };
    //End ofTeam Members

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    // Client DropDown
    const onClientChange = (e) => {
        const value = e.target.value;

        if (formData.projectType === 'Internal') {
            setFormData({ ...formData, projectClient: 'Cloud Destinations Pvt Ltd.,' });
            setFilteredSuggestions([]);
            setIsDropdownVisible(false);
            setError('');
            setIsButtonDisabled(false);
        } else {
            setFormData({ ...formData, projectClient: value });

            if (value.length > 0) {
                const filtered = suggestions.filter((suggestion) =>
                    suggestion.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredSuggestions(filtered);
                setIsDropdownVisible(true);
                setError('');
            } else {
                setFilteredSuggestions([]);
                setIsDropdownVisible(false);
                setError('Client name is required');
            }

            const hasErrors = value.length === 0 || !suggestions.includes(value);
            setIsButtonDisabled(hasErrors);
        }
    };

    const onSuggestionClick = (suggestion) => {
        setFormData({ ...formData, projectClient: suggestion });
        setFilteredSuggestions([]);
        setIsDropdownVisible(false);
        setError('');
        setIsButtonDisabled(false);
    };

    const onBlur = () => {
        if (formData.projectType === 'Internal') {
            // If the project type is internal, don't show errors
            setError('');
            setIsButtonDisabled(false);
        } else {
            if (!suggestions.includes(formData.projectClient)) {
                setError('Please select a valid client name from the suggestions');
                setIsButtonDisabled(true);
            } else {
                setError('');
                setIsButtonDisabled(false);
            }
        }
    };
    

    //Handle Input Changes 
    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'projectType') {
            if (value === 'Internal') {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    projectType: value,
                    projectClient: 'Cloud Destinations Pvt Ltd.,'
                }));
                setFilteredSuggestions([]);
                setIsDropdownVisible(false);
                setError('');
                setIsButtonDisabled(false);
            } else {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    projectType: value,
                    projectClient: ''
                }));
            }
        } else {
            // Handle normal input changes
            if (name === 'projectStartDate' && !formData.submissionDate) {
                setFormData(prevFormData => ({ ...prevFormData, submissionDate: value }));
            } else if (name === 'projectStartDate' && value > formData.submissionDate) {
                alert("Start Date cannot be greater than End Date");
                return;
            } else if (name === 'submissionDate' && formData.projectStartDate && value < formData.projectStartDate) {
                alert("End Date cannot be less than Start Date");
                return;
            }
            setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
    };

    //Checks Validation For Project Id and Project Name
    const withValid = (event) => {
        const { name, value } = event.target;
        let errorMessage = '';
        if (name === 'projectName') {
            if (value.trim() === '') {
                errorMessage = '* Valid Input is Required';
            } else if (!isValueUnique(value)) {
                errorMessage = '* Must be unique';
            }
        }
        // if (name === 'projectId') {
        //     if (value.trim() === '') {
        //         errorMessage = '* Valid Input is Required';
        //     } else if (!isIdUnique(value)) {
        //         errorMessage = '* Must be unique';
        //     }
        // }
        setErrors({ ...errors, [name]: errorMessage });
        const hasErrors = Object.values({ ...errors, [name]: errorMessage }).some(error => error !== '');
        setIsButtonDisabled(hasErrors);
        setFormData({ ...formData, [name]: value });
    };

    //Validation Chackers Fns
    const isValueUnique = (value) => {
        const lowerCaseValue = value.toLowerCase();
        return !projectNames.some(name => name.toLowerCase() === lowerCaseValue);
    };
    //Submission Functions
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://192.168.1.68:8080/api/projects/add', formData)
            .then(response => {
                alert("Project Has Been Added Successfully")
                console.log(formData)
            })
            .catch(error => {
                console.error('Error Uploading Task.....');
            });
        console.log(formData)
        toggleNav()
    };

    return (
        <>
            <GoProjectRoadmap color="white" size={20} onClick={toggleNav} />
            {nav && (
                <div className="fixed right-0 bg-white h-full overflow-y-auto top-0 w-[50%] rounded-l border z-50 opacity-100'">
                    <div className='flex justify-between'>
                        <div className='justify-around font-semibold font-poppins mt-2 ml-6 text-xl'>
                            Project Registration
                        </div>
                        <div className='w-[10%] flex justify-center items-center'>
                            <RxCross2 size={30} className=' text-blue-400 stroke-2 hover:text-red-700 relative top-1 right-3' onClick={toggleNav} />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <form onSubmit={onSubmit} className="bg-white mt-1 px-4 pt-3 mb-1 w-full">
                            <div className='mx-2'>

                                {/* Project ID */}
                                {/* <div className='projectId'>
                                    <div>
                                        <label className='font-poppins text-sm font-semibold'>Project Id <span className='text-red-600'>*</span></label>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="projectId"
                                            id="projectId"
                                            placeholder='Enter the Project Id'
                                            value={formData.projectId}
                                            onChange={withValid}
                                            className=" text-sm font-poppins bg-blue-50 rounded w-[90%] p-3 text-gray-700 "
                                            required />
                                    </div>
                                    {errors.projectId && (
                                        <span className="text-red-500 text-sm">{errors.projectId}</span>
                                    )}
                                </div> */}

                                {/* Project Name */}
                                <div className='projectName'>
                                    <div>
                                        <label className='font-poppins text-sm font-semibold'>Project Name <span className='text-red-600'>*</span></label>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="projectName"
                                            id="projectName"
                                            placeholder='Enter the Project Name'
                                            value={formData.projectName}
                                            onChange={withValid}
                                            className=" text-sm font-poppins bg-blue-50 rounded w-[90%] p-3 text-gray-700 "
                                            required />
                                    </div>
                                    {errors.projectName && (
                                        <span className="text-red-500 text-sm">{errors.projectName}</span>
                                    )}
                                </div>

                                {/* Project Type */}
                                <div className='projectType'>
                                    <div>
                                        <label className='font-poppins text-sm font-semibold'>Project Type <span className='text-red-600'>*</span></label>
                                    </div>
                                    <div>
                                        <select
                                            type="text"
                                            name="projectType"
                                            id="projectType"
                                            placeholder='Enter the Project Name'
                                            value={formData.projectType || ''}
                                            onChange={onInputChange}
                                            className=" text-sm font-poppins bg-blue-50 rounded w-[90%] p-3 text-gray-700 "
                                            required>
                                            <option value='Internal'>Internal</option>
                                            <option value='External'>External</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Project Client */}
                                <div className='projectClient'>
                                    <div>
                                        <label className='font-poppins text-sm font-semibold'>
                                            Client Name <span className='text-red-600'>*</span>
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="projectClient"
                                            id="projectClient"
                                            placeholder={formData.projectType === 'Internal' ? 'Cloud Destinations Pvt Ltd.,' : 'Enter the Client Name'}
                                            value={formData.projectClient}
                                            onChange={onClientChange}
                                            onBlur={onBlur}
                                            className={`text-sm font-poppins bg-blue-50 rounded w-[90%] p-3
                                             text-gray-700 ${formData.projectType === 'Internal' ?
                                                    'placeholder:text-gray-700 font-semibold' : ''}`}
                                            readOnly={formData.projectType === 'Internal'}
                                            required
                                        />
                                        {isDropdownVisible && filteredSuggestions.length > 0 && (
                                            <ul className='bg-white border border-gray-300 mt-1 rounded shadow-lg w-[50%] absolute max-h-40 overflow-y-auto'>
                                                {filteredSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className='p-2 cursor-pointer hover:bg-gray-200'
                                                        onClick={() => onSuggestionClick(suggestion)}
                                                    >
                                                        {suggestion}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {error && (
                                            <p className="text-red-500 text-sm">{error}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Project Team */}
                                <div className='projectTeam'>
                                    <div>
                                        <label className='font-poppins text-sm font-semibold'>Team Members <span className='text-red-600'>*</span></label>
                                    </div>
                                    <div>
                                        <div className='flex justify-evenly font-poppins w-[90%]'>
                                            <select
                                                className='text-sm font-poppins bg-blue-50 w-[45%] rounded p-3 text-gray-700'
                                                value={selectedMember ? selectedMember.firstName : ""}
                                                onChange={(e) => {
                                                    const selectedEmployee = JSON.parse(e.target.value);
                                                    setSelectedMember(selectedEmployee.firstName);
                                                    setSelectedMemberId(selectedEmployee.employeeId);
                                                    setSelectedMemberEmail(selectedEmployee.emailId);
                                                }}
                                            >
                                                <option value="" disabled>Select a member</option>
                                                {availableMembers.map((member) => (
                                                    <option key={member.employeeId}
                                                        value={JSON.stringify(member)}
                                                    >
                                                        {member.employeeId} - {member.firstName}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                className='text-sm font-poppins bg-blue-50 w-[45%] rounded p-3 text-gray-700'
                                                value={selectedDesignation}
                                                onChange={(e) => setSelectedDesignation(e.target.value)}
                                            >
                                                <option value="" disabled>Select a designation</option>
                                                {availableDesignations.map((designation, index) => (
                                                    <option key={index} value={designation}>{designation}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            {formData.projectmembersList.length > 0 && (
                                                <div>
                                                    <h2 className='font-poppins text-sm font-bold'>Current Team</h2>
                                                    <ul>
                                                        {formData.projectmembersList.map((item, index) => (
                                                            <li className='w-[90%] justify-between flex px-2 py-2 rounded shadow-sm' key={`${item.projectMembersName}_${index}`}>
                                                                <div>
                                                                    {item.projectMembersName} - {item.projectMembersRole}
                                                                </div>
                                                                <div>
                                                                    <button type="button" onClick={() => handleRemoveMember(item.projectMembersName)}><FaMinus /></button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Start Date and Submission Date */}
                                <div className='flex w-[90%] justify-between'>
                                    <div className='projectStartDate w-[45%]'>
                                        <div>
                                            <label className='font-poppins text-sm font-semibold'>Start Date<span className='text-red-800 font-bold'>*</span></label>
                                        </div>
                                        <div className='flex-1'>
                                            <acronym title="Project Start Date">
                                                <input
                                                    type="date"
                                                    name="projectStartDate"
                                                    id="projectStartDate"
                                                    placeholder='Enter the Project Start Date'
                                                    value={formData.projectStartDate}
                                                    onChange={onInputChange}
                                                    className=" font-poppins bg-blue-50 rounded w-full py-2 px-3 "
                                                    required />
                                            </acronym>
                                        </div>

                                    </div>

                                    <div className='projectSubmissionDate w-[45%]'>
                                        <div>
                                            <label className='font-poppins text-sm font-semibold'>End Date<span className='text-red-800 font-bold'>*</span></label>
                                        </div>
                                        <div className='flex-1'>
                                            <acronym title="Project Submission Date"><input
                                                type="date"
                                                name="submissionDate"
                                                id="submissionDate"
                                                value={formData.submissionDate}
                                                onChange={onInputChange}
                                                className="font-poppins bg-blue-50 rounded py-2 px-3 w-full"
                                                required />
                                            </acronym>
                                        </div>
                                    </div>
                                </div>

                                {/* 
                                <div className='taskno mt-2'>
                                    <div>
                                        <label className='font-poppins text-sm font-semibold'>Total Number of Tasks <span className='text-red-600'>*</span></label>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="project_task"
                                            id="project_task"
                                            placeholder='Enter the Number of Tasks'
                                            value={formData.project_task}
                                            onChange={onInputChange}
                                            className=" text-sm font-poppins bg-blue-50 rounded w-[90%] p-3 text-gray-700 "
                                            required />
                                    </div>
                                </div> */}

                                {/* <div className='files mt-5'>
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
                                            <label className='font-poppins mt-0.5 font-medium'>Tap to Upload Project Related Documents</label>
                                        </button>
                                        {selectedFiles.length > 0 && (
                                            <div>
                                                <h2 className='font-poppins text-sm font-bold mt-1'>Selected Files:</h2>
                                                <ul>
                                                    {selectedFiles.map((file, index) => (
                                                        <li className='w-[90%] justify-between flex px-2 py-2 rounded shadow-sm' key={index}>
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
                            </div>

                            {/* Submit and Cancel Button */}
                            <div className='submit flex mt-5 items-center justify-center  w-[90%]'>
                                <button
                                    type="submit"
                                    className={isButtonDisabled ?
                                        "bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-5" :
                                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5"}
                                    onClick={onSubmit}
                                    disabled={isButtonDisabled}>
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none  focus:shadow-outline"
                                    onClick={toggleNav}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>)
            }
        </>
    );
};

export default ProjReg;
