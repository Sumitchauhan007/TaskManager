import React, { useActionState, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import  {PRIORITY_DATA} from "../../utils/data";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from "react-hot-toast";
import {useLoaction, useNavigate} from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from 'react-icons/lu';
import SelectDropdown from '../../components/Inputs/SelectDropdown';

const CreateTask = () => {
   
  const location = useLoaction();
  const {tskId} = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({ 
    title:" ",
    description: "",
    priority:"Low",
    dueDate: null,
    assignmentTo: [],
    todoChecklist: [],
    attachements:[],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useSatate("");
  const [Loading,setLoding] = usestate(false);

  const [openDeleteAlert, setOpenDeleteAlert]  = useSatate(false);

  const handleValueChange = (key,value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value}));
  };

  const clearData = () => {

    //reset form
    setTaskData({
      title: "",
      priority:"",
      description:"Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist:[],
      attachments:[],
    });
  };

  //create Task

  const createTask = async () => {};

  //update Task
  const updateTask = async () => {};

  const handleSubmit = async () => {};
 

  //get task info by id
  const getTaskDetailsByID = async () => {};

  //delete task
  const deleteTask = async () => {};


  return (
    <DashboardLayout activeMenu="Create Task">
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
        <div className="form-card col-span-3">
          <div className="flex items-center justify-between">
            <h2 className='text-xl md:text-xl font-medium'>
              {taskId ? "Update Task" : "Create New Task"}
              </h2>

              {taskId && (
                <button
                 className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                 onClick={() => setOpenDeleteAlert(true)}
                 >
                  <LuTrash2 className='text-base' /> Delete
                 </button>
              )}
              </div>

            <div className='mt-4'>
              <label className='text-xs font-medium text-slate-600'>
                Task Title
              </label>

              <input
               placeholder='Create App UI'
               className='form-input'
               value={taskData.title}
               onChange={({ target}) =>
              handleValueChange("title", target.value)
              }
              />
              </div>
              <div className="mt-3">
                <label className='text-xs font-medium text-slate-600'>
                  Description
                  </label>

                  <textarea
                   rows={4}
                   placeholder='Task Description'
                   className='form-input'
                   value={taskData.description}
                   onChange={({ target}) =>
                    handleValueChange("description", target.value)
                   }
                  />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">Priority</label>

                  <SelectDropdown 
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask