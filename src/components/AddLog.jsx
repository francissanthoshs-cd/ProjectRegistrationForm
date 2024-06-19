import React, { useState, useRef, useEffect } from "react";
import { FaCirclePlus, FaCheck, FaCircleMinus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
function AddLog({ show }) {
  const [projectLogs, setProjectLogs] = useState([{ logs: [{}] }]);
  const [dropdownVisible, setDropdownVisible] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [dropdownVisible1, setDropdownVisible1] = useState([]);
  const [inputValues1, setInputValues1] = useState([]);
  const [filteredOptions1, setFilteredOptions1] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Billable");
  const [submittedLogs, setSubmittedLogs] = useState([[]]);
  const [postlog, setPostlog] = useState({});
  const containerRef = useRef(null);
  const lastRowRef = useRef(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [options, setOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const updatedInputValues = [...inputValues];
    updatedInputValues[index] = value;
    setInputValues(updatedInputValues);
    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      const updatedDropdownVisible = [...dropdownVisible];

      for (let i = 0; i < dropdownVisible.length; i++) {
        if (i !== index) {
          updatedDropdownVisible[i] = false;
        }
      }
      updatedDropdownVisible[index] = true;
      setDropdownVisible(updatedDropdownVisible);
    } else {
      setFilteredOptions(options);
      const updatedDropdownVisible = [...dropdownVisible];
      updatedDropdownVisible[index] = true;
      setDropdownVisible(updatedDropdownVisible);
    }
  };

  const handleInputChange1 = (event, index1, index) => {
    const value = event.target.value;
    const updatedInputValues1 = [...inputValues1];
    if (!updatedInputValues1[index1]) {
      updatedInputValues1[index1] = [];
    }
    updatedInputValues1[index1][index] = value;
    setInputValues1(updatedInputValues1);

    if (value) {
      const filtered = jobOptions.filter((jobOption) =>
        jobOption.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions1(filtered);
      const updatedDropdownVisible1 = [...dropdownVisible1];
      if (!updatedDropdownVisible1[index1]) {
        updatedDropdownVisible1[index1] = [];
      }
      updatedDropdownVisible1[index1][index] = true;
      setDropdownVisible1(updatedDropdownVisible1);
    } else {
      setFilteredOptions1(jobOptions);
      const updatedDropdownVisible1 = [...dropdownVisible1];
      if (!updatedDropdownVisible1[index1]) {
        updatedDropdownVisible1[index1] = [];
      }
      updatedDropdownVisible1[index1][index] = true;
      setDropdownVisible1(updatedDropdownVisible1);
    }
  };

  const addNewLog = (index1, index) => {
    const newProjectLogs = [...projectLogs];
    newProjectLogs[index1].logs.push({});
    setProjectLogs(newProjectLogs);

    const newSubmittedLogs = [...submittedLogs];
    if (!newSubmittedLogs[index1]) {
      newSubmittedLogs[index1] = [];
    }
    newSubmittedLogs[index1].push(false);
    setSubmittedLogs(newSubmittedLogs);
    document.getElementById("delete" + index1 + index).style.visibility =
      "visible";
    document.getElementById("add" + index1 + index).style.visibility = "hidden";
  };

  const addNewProjectLog = () => {
    setProjectLogs([...projectLogs, { logs: [{}] }]);
    setSubmittedLogs([...submittedLogs, []]);
  };

  const deleteTask = (index1, index) => {
    // const newProjectLogs = [...projectLogs];
    // newProjectLogs[index1].logs.splice(index, 1);
    // setProjectLogs(newProjectLogs);

    // const newSubmittedLogs = [...submittedLogs];
    // newSubmittedLogs[index1].splice(index, 1);
    // setSubmittedLogs(newSubmittedLogs);
    document.getElementById("logdetails" + index1 + index).remove();
  };

  const handleCheckClick = (index1, index) => {
    const project = document.getElementById("project" + index1).value;
    const job = document.getElementById("job" + index1 + index).value;
    const description = document.getElementById(
      "description" + index1 + index
    ).value;
    const hours = document.getElementById("hour" + index1 + index).value;
    const type = document.getElementById("option" + index1 + index).value;
    const status = document.getElementById("status" + index1 + index).value;
    document.getElementById("job" + index1 + index).disabled = true;
    document.getElementById("description" + index1 + index).disabled = true;
    document.getElementById("hour" + index1 + index).disabled = true;
    document.getElementById("option" + index1 + index).disabled = true;
    document.getElementById("job" + index1 + index).disabled = true;
    document.getElementById("status" + index1 + index).disabled = true;

    const newRecord = {
      // project: project,
      // log: {
      empId: "emp-1",
      projectId: "proj-3",
      jobId: "job-2",
      projectName: project,
      jobName: job,
      taskDescription: description,
      billingStatus: type,
      WorkedOnDate: "2024-06-06",
      numberOfHoursWorked: hours,
      taskStatus: status,
    };
    // setPostlog([...postlog, newRecord]);
    setPostlog(newRecord);
    console.log(postlog);
    const newSubmittedLogs = [...submittedLogs];
    if (!newSubmittedLogs[index1]) {
      newSubmittedLogs[index1] = [];
    }
    newSubmittedLogs[index1][index] = true;
    setSubmittedLogs(newSubmittedLogs);
    setRefreshFlag(prevFlag => !prevFlag);
  };

  useEffect(() => {
    if (lastRowRef.current) {
      // lastRowRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [projectLogs]);

  const projectdropdown = (index1) => {
    if (!document.getElementById("project" + index1).disabled) {
      const updatedDropdownVisible = [...dropdownVisible];
      updatedDropdownVisible[index1] = !dropdownVisible[index1];
      setDropdownVisible(updatedDropdownVisible);
      if (!inputValues[index1]) {
        setFilteredOptions(options);
      }
    }
  };
  useEffect(() => {
    getProject();
    getJobs();
  }, []);
  const getProject = async () => {
    const arrayofProjects = new Set();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    await axios
      .get("http://localhost:8082/api/projects/getall", config)
      .then((res) => {
        console.log(res.data.data);
        res.data.data.forEach((obj) => {
          arrayofProjects.add(obj["projectName"]);
        });

        setOptions(Array.from(arrayofProjects));
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  };
  const getJobs = async () => {
    const arrayofJobs = new Set();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    await axios
      .get("http://localhost:8082/api/jobs/getall", config)
      .then((res) => {
        res.data.data.forEach((obj) => {
          arrayofJobs.add(obj["jobName"]);
        });

        setJobOptions(Array.from(arrayofJobs));
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  };

  const postTimelog = async (index1, index) => {

    console.log(index1, index);
    const project = document.getElementById("project" + index1).value;
    const job = document.getElementById("job" + index1 + index).value;
    const description = document.getElementById(
      "description" + index1 + index
    ).value;

    const hours = document.getElementById("hour" + index1 + index).value;
    const time = timeConverter(hours);
    const type = document.getElementById("option" + index1 + index).value;
    const status = document.getElementById("status" + index1 + index).value;
    const startTime = document.getElementById(
      "startTime" + index1 + index
    ).value;

    const endTime = document.getElementById("endTime" + index1 + index).value;
    const date = "2024-06-07";
    const concatStartDateTime = date + "T" + startTime + ":00.000";
    const concatEndDateTime = date + "T" + endTime + ":00.000";
    console.log(concatStartDateTime);
    console.log(concatEndDateTime);

    await axios
      .post("http://localhost:8080/api/timetracker/save", {
        empId: "EMP002",
        projectId: "PROJ003",
        jobId: "JOB007",
        projectName: project,
        jobName: job,
        taskDescription: description,
        billingStatus: type,
        logDate: "2024-06-06",
        startTime: concatStartDateTime,
        endTime: concatEndDateTime,
        numberOfHoursWorked: time,
        timeTrackerStatus: status,
      })

      .then((response) => {
        console.log(response);
      });
  };

  

  const timeConverter = (time) => {
    const [hours, minutes] = String(time).split(".");
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes || "0", 10);

    // Format hours and minutes with leading zeros
    const formattedHours = String(hoursInt).padStart(2, "0");
    const formattedMinutes = String(minutesInt).padStart(2, "0");

    // Return the formatted time
    return `${formattedHours}:${formattedMinutes}:00`;
  };

  const getEmployee = async () => {
    const arrayofEmployees = new Set();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    axios.get("http://localhost:8080/api/employee/all").then((res) => {
      console.log(res.data.data);
    });
  };
  // const [logDetails,setlogDetails] = useState({"empId":"","projectId":"","jobId":"","projectName":"","jobName":"","taskDescription":"","billingStatus":"","WorkedOnDate":"","numberOfHoursWorked":"","taskStatus":""})
  // const createLog= async ()=>{
  // const userLogData = {

  // }
  //}
  const handleNumberfHours = (e, index1, index, time) => {
    var startTime = "00:00";
    var endTime = "00:00";
    if (time === "startTime") {
      startTime = e.target.valueAsDate;
      endTime = document.getElementById("endTime" + index1 + index).valueAsDate;
    } else {
      startTime = document.getElementById(
        "startTime" + index1 + index
      ).valueAsDate;
      endTime = e.target.valueAsDate;
    }
    const timeDifference = endTime - startTime;
    const hoursWorked = timeDifference / (1000 * 60 * 60);
    document.getElementById("hour" + index1 + index).value = hoursWorked;
  };
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } flex-col w-full h-90 space-y-5 justify-between`}
    >
      <div
        className="inline-flex flex-col w-full h-[300px] rounded-lg p-3 justify-between py-3"
        style={{ backgroundColor: "#F0F9FF", transition: "width 0.5s ease" }}
      >
        <div
          ref={containerRef}
          className="flex-col w-full h-[230px] rounded-lg p-3 px-8 justify-between py-3 overflow-y-auto"
          style={{ maxHeight: "350px", scrollbarWidth: "none" }}
        >
          {projectLogs.map((projectLog, index1) => (
            <div
              className="flex flex-col w-full mb-3"
              key={index1}
              id={"projectMain" + index1}
            >
              <div className="flex flex-row space-x-6">
                <div className="relative w-[228px] mx-2 mb-4">
                  <input
                    type="text"
                    id={"project" + index1}
                    value={inputValues[index1] || ""}
                    onChange={(event) => handleInputChange(event, index1)}
                    onFocus={() => {
                      const updatedDropdownVisible = [...dropdownVisible];
                      updatedDropdownVisible[index1] = true;
                      setDropdownVisible(updatedDropdownVisible);
                    }}
                    onBlur={() =>
                      setTimeout(() => {
                        const updatedDropdownVisible = [...dropdownVisible];
                        updatedDropdownVisible[index1] = false;
                        setDropdownVisible(updatedDropdownVisible);
                      }, 100)
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm w-[242px]"
                    placeholder="Select Project"
                  />
                  <IoIosArrowDown
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-white rounded-full z-0 bg-blue-200"
                    onMouseDown={() => projectdropdown(index1)}
                  />
                  {dropdownVisible[index1] && (
                    <ul
                      className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md z-10 w-[240px]"
                      id={"projectdropdown" + index1}
                    >
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onMouseDown={() => {
                              const updatedInputValues = [...inputValues];
                              updatedInputValues[index1] = option;
                              setInputValues(updatedInputValues);
                              const updatedDropdownVisible = [
                                ...dropdownVisible,
                              ];
                              updatedDropdownVisible[index1] = false;
                              setDropdownVisible(updatedDropdownVisible);
                            }}
                          >
                            {option}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">
                          No options found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                {/* <div className='flex w-full'>
                  <acronym title="Add new log" className='ml-auto'>
                    <FaCirclePlus size={16} color="#53BBEB" className='mt-1 cursor-pointer' onClick={() => addNewLog(index1)} />
                  </acronym>
                </div> */}
                {projectLog.logs.map((log, index) => (
                  <div
                    className="flex flex-col"
                    id={"logdetails" + index1 + index}
                  >
                    <div className="flex w-full">
                      <acronym title="Add new log" className="ml-auto">
                        <FaCirclePlus
                          size={16}
                          color="#53BBEB"
                          className="ml-3 cursor-pointer"
                          onClick={() => addNewLog(index1, index)}
                          id={"add" + index1 + index}
                        />
                        <FaCircleMinus
                          color="black"
                          size={16}
                          className="ml-3 cursor-pointer"
                          onClick={() => deleteTask(index1, index)}
                          id={"delete" + index1 + index}
                          style={{ visibility: "hidden" }}
                        />
                      </acronym>
                    </div>
                    <div
                      className="flex flex-row"
                      key={index}
                      ref={
                        index === projectLog.logs.length - 1 ? lastRowRef : null
                      }
                    >
                      <div className="relative w-2/3 px-2">
                        <input
                          id={"job" + index1 + index}
                          type="text"
                          value={inputValues1[index1]?.[index] || ""}
                          onChange={(event) =>
                            handleInputChange1(event, index1, index)
                          }
                          onFocus={() => {
                            const updatedDropdownVisible1 = [
                              ...dropdownVisible1,
                            ];
                            if (!updatedDropdownVisible1[index1]) {
                              updatedDropdownVisible1[index1] = [];
                            }
                            updatedDropdownVisible1[index1][index] = true;
                            setDropdownVisible1(updatedDropdownVisible1);
                          }}
                          onBlur={() =>
                            setTimeout(() => {
                              const updatedDropdownVisible1 = [
                                ...dropdownVisible1,
                              ];
                              if (!updatedDropdownVisible1[index1]) {
                                updatedDropdownVisible1[index1] = [];
                              }
                              updatedDropdownVisible1[index1][index] = false;
                              setDropdownVisible1(updatedDropdownVisible1);
                            }, 100)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="Select jobs"
                        />
                        {dropdownVisible1[index1]?.[index] && (
                          <ul
                            className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10"
                            id={"jobdropdown" + index1 + index}
                          >
                            {filteredOptions1.length > 0 ? (
                              filteredOptions1.map((option, i) => (
                                <li
                                  key={i}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                  onMouseDown={() => {
                                    const updatedInputValues1 = [
                                      ...inputValues1,
                                    ];
                                    if (!updatedInputValues1[index1]) {
                                      updatedInputValues1[index1] = [];
                                    }
                                    updatedInputValues1[index1][index] = option;
                                    setInputValues1(updatedInputValues1);
                                    const updatedDropdownVisible1 = [
                                      ...dropdownVisible1,
                                    ];
                                    if (!updatedDropdownVisible1[index1]) {
                                      updatedDropdownVisible1[index1] = [];
                                    }
                                    updatedDropdownVisible1[index1][
                                      index
                                    ] = false;
                                    setDropdownVisible1(
                                      updatedDropdownVisible1
                                    );
                                  }}
                                >
                                  {option}
                                </li>
                              ))
                            ) : (
                              <li className="px-4 py-2 text-gray-500">
                                No options found
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                      <div className="relative w-2/3 px-2">
                        <input
                          id={"description" + index1 + index}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="What are you working on?"
                        />
                      </div>
                      <div className="relative w-2/3 px-2">
                        <input
                          id={"startTime" + index1 + index}
                          onChange={(event) =>
                            handleNumberfHours(
                              event,
                              index1,
                              index,
                              "startTime"
                            )
                          }
                          type="time"
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="Start time"
                        />
                      </div>
                      <div className="relative w-2/3 px-2">
                        <input
                          id={"endTime" + index1 + index}
                          onChange={(event) =>
                            handleNumberfHours(event, index1, index, "endTime")
                          }
                          type="time"
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="End time"
                        />
                      </div>
                      <div className="relative w-2/3 px-2">
                        <input
                          id={"hour" + index1 + index}
                          type="number"
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                          placeholder="hours"
                          disabled={true}
                        />
                      </div>
                      <div className="relative w-2/3 px-2">
                        <select
                          id={"option" + index1 + index}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                        >
                          <option value="Billable">Billable</option>
                          <option value="Non_Billable">Non-Billable</option>
                        </select>
                      </div>
                      <div className="relative w-2/3 px-2">
                        <select
                          id={"status" + index1 + index}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                        >
                          <option value="Completed">Completed</option>
                          <option value="InProgress">In-progress</option>
                          <option value="InReview">In-Review</option>
                        </select>
                      </div>
                      {submittedLogs[index1]?.[index] ? (
                        <>
                          {/* <FaCircleMinus color="black" size={50} className="ml-3 cursor-pointer" onClick={() => deleteTask(index1, index)} id={'delete' + index1 + index} /> */}
                          <MdModeEdit
                            size={50}
                            className="ml-3 cursor-pointer"
                            color="green"
                            id={"edit" + index1 + index}
                          />
                        </>
                      ) : (
                        <FaCheck
                          color="blue"
                          size={50}
                          id={"check" + index1 + index}
                          className="cursor-pointer"
                          onClick={() => postTimelog(index1, index)}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex flex-row cursor-pointer"
          onClick={addNewProjectLog}
        >
          <FaCirclePlus
            size={16}
            color="green"
            className="mt-1 cursor-pointer"
          />
          <h1 className=" px-3 text-gray-600"> Add New Project Log</h1>
        </div>
      </div>
    </div>
  );
}

export default AddLog;
