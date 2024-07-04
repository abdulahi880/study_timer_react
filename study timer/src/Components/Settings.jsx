import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from "react-icons/fi";

const Settings = ({ updateTimerSettings }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    pomodoro: '',
    shortBreak: '',
    longBreak: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTimerSettings(formValues);
    navigate('/');
  };

  return (
    <>
      <div className="absolute h-full w-full mx-auto left-0 top-0 bg-black bg-opacity-50"></div>
      <div className="max-w-xl w-full absolute left-0 right-0 mx-auto z-50 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end">
          <FiX onClick={() => navigate('/')} className="cursor-pointer text-gray-500 hover:text-gray-700" />
        </div>
        <h2 className="text-center font-bold text-2xl text-gray-700 mb-4">Settings</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <label htmlFor="pomodoro" className="text-gray-600">Study Timer</label>
            <input
              id="pomodoro"
              name="pomodoro"
              type="number"
              className="border rounded p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter minutes"
              value={formValues.pomodoro}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <label htmlFor="shortBreak" className="text-gray-600">Short Break</label>
            <input
              id="shortBreak"
              name="shortBreak"
              type="number"
              className="border rounded p-2 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter minutes"
              value={formValues.shortBreak}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <label htmlFor="longBreak" className="text-gray-600">Long Break</label>
            <input
              id="longBreak"
              name="longBreak"
              type="number"
              className="border rounded p-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter minutes"
              value={formValues.longBreak}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-red-300 text-white rounded-lg py-2 hover:bg-red-400 transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
