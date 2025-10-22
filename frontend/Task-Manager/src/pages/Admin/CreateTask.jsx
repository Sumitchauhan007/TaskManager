import React, { useActionState, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import  {PRIORITY_DATA} from "../../utils/data";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from "react-hot-toast";
import {useLoaction, useNavigate} from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from 'react-icons/lu';

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
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <h2 className=''>
              {taskId}
            </h2>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default CreateTask