import React, { useState } from "react";
import ViewLogs from "./ViewLogs";

function ModifyLog({}) {

  const [showModify,setShowModify]  = useState(false);

    const toggleModify = () => {
      setShowModify(!showModify);
  };
  return (
    <div className={`flex-col w-full h-50 px-5 space-y-5 justify-between`}>
      <div
        className="inlineflex flex-col w-full h-[140px] rounded-lg p-3 px-8  py-3"
        style={{ "backgroundColor": "#ffdbdb" }}
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
          <div className="relative w-2/3 px-2">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm">
              <option value="Billable">Completed</option>
              <option value="Non-Billable">In-progress</option>
              <option value="Non-Billable">In-Review</option>
            </select>
          </div>
        </div>
        <div className="flex felx-row w-full h-12 justify-center space-x-20">
          <div
            className="flex felx-row w-20 h-10 bg-white rounded-lg justify-center p-2 cursor-pointer"
            style={{ backgroundColor: "#9fff9f" }}>
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
    </div>
  );
}

export default ModifyLog;
