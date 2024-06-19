import React, { useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPencil } from "react-icons/fa6";
import AddLog from "./AddLog";
import ModifyLog from "./ModifyLog";
import MyAccordian from "./AccordianView"
function ViewLogs() {
  const [showAddLog, setShowAddLog] = useState(true);
    const toggleAddLog = () => {
    setShowAddLog(!showAddLog);
  };
  const [showModify, setShowModify] = useState(false);
  const toggleModify = () => {
    setShowModify(!showModify);
  };
  return (
    <div
      className="container mx-auto  relative space-y-4"
      style={{ maxHeight: "450px", overflowY: "auto", scrollbarWidth: "none" }}
    >
      <div
        className={`${
          showAddLog ? "hidden" : "absolute"
        } inset-x-0 top-1/1 transform -translate-y-1/2 flex justify-center z-0 cursor-pointer mt-12`}
        onClick={toggleAddLog}
      >
        <IoIosArrowDropupCircle size={30} color="#38BDF8" />
      </div>
      <div
        className={`${
          showAddLog ? "absolute" : "hidden"
        } inset-x-0 top-1/1 transform -translate-y-1/2 flex justify-center z-0 cursor-pointer mt-4  `}
        onClick={toggleAddLog}
      >
        <IoIosArrowDropdownCircle size={30} color="#38BDF8" />
      </div>
      <div
        className={`${
          showAddLog ? "hidden" : "absolute"
        } inset-x-0 top-1/1 transform -translate-y-1/2 flex justify-center z-10 cursor-pointer`}
        onClick={toggleAddLog}
      >
      </div>
      <AddLog show={showAddLog} setShow={setShowAddLog} />
      {showModify ? (
        <div
          className="inlineflex flex-col w-full h-[140px] rounded-lg p-3 px-8  py-3"
          style={{ backgroundColor: "#ffdbdb" }}
        >
          <div className="flex flex-row w-full h-[70px] rounded-lg p-3 px-8 justify-between py-3 space-x-12">
            <div className="relative w-2/3 ">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Select Project"
              />
            </div>
            <div className="relative w-2/3 ">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Select Jobs"
              />
            </div>
            <div className="relative w-2/3 ">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="What are you working on?"
              />
            </div>
            <div className="relative w-2/3 ">
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="hours?"
              />
            </div>
            <div className="relative w-2/3 px-2">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm">
                <option value="Billable">Billable</option>
                <option value="Non-Billable">Non-Billable</option>
              </select>
            </div>
          </div>
          <div className="flex felx-row w-full h-12 justify-center space-x-20">
            <div
              className="flex felx-row w-20 h-10 bg-white rounded-lg justify-center p-2 cursor-pointer"
              style={{ backgroundColor: "#9fff9f" }}
            >
              Modify
            </div>
            <div
              className="flex felx-row w-20 h-10 bg-green-900 rounded-lg justify-center p-2 cursor-pointer"
              onClick={toggleModify}
              style={{ backgroundColor: "#ff9c9c" }}
            >
              Cancel
            </div>
          </div>
        </div>
      ) : (
        <div className={`${showModify ? "hidden" : ""} overflow-x-auto`}>
          {/* <table className="min-w-full border border-gray-300">
            <thead>
              <tr
                className="bg-gray-200 text-white"
                style={{ backgroundColor: "#164e63" }}
              >
                <th className="px-6 py-3 border-b  text-left text-xs font-medium  uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium  uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium  uppercase tracking-wider">
                  Job
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium  uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium  uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              <tr key="1" className={{ "bg-white": "bg-gray-50" }}>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                 
                  26/5/2024
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                  DTS
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                  Testing
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                  worked on the UI design for sign in signout
                  <td className="px-0 py-1 border-b border-t border-gray-300 text-sm text-gray-700">
                    worked on the UI design time log
                  </td>
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                  8.9
                  <td className="px-0 py-1 border-b border-t border-gray-300 text-sm text-gray-700">
                    5
                  </td>
                </td>
                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                  Billable
                  <td className="px-0 py-1 border-b border-t border-gray-300 text-sm text-gray-700">
                    Non-Billable
                  </td>
                </td>

                <td
                  className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700 cursor-pointer"
                  onClick={() => toggleModify()}
                >
                  <acronym title="Modify">
                    <FaPencil color="green" />
                  </acronym>
                  <td className="px-0 py-1 border-b border-t border-gray-300 text-sm text-gray-700">
                    <acronym title="Modify">
                      <FaPencil color="green" />
                    </acronym>
                  </td>
                </td>
              </tr>
            </tbody>
          </table> */}
        </div>
      )}
      <>
      <MyAccordian/>
      </>
    </div>
  );
}

export default ViewLogs;
