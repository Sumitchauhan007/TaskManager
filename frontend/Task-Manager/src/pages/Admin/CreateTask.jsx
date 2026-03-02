import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from 'react-icons/lu';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import SelectUsers from '../../components/Inputs/SelectUsers';
import TodoListInput from '../../components/Inputs/TodoListInput';
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput';
import DeleteAlert from '../../components/DeleteAlert';
import Modal from '../../components/Modal';
const CreateTask = () => {

  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {

    //reset form
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  //create Task

  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task Created Successfully");

      clearData();
    }
    catch (error) {
      console.log("Error creating task:", error);
    }
    finally {
      setLoading(false);
    }
  };

  //update Task here
  const updateTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text === item);

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todolist,
        }
      );
      toast.success("Task Updated Successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    //input validation
    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }

    if (taskData.todoChecklist?.length === 0) {
      setError("Add at least one todo task");
      return;
    }

    if (taskId) {
      updateTask();
    } else {
      createTask();
    }
  };


  //get task info by id
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.log("Error fetching task details:", error);
    }
  };

  //delete task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteAlert(false);
      toast.success("Task Deleted Successfully");
      navigate("/admin/tasks")
    } catch (error) {
      console.error("Error deleting task:", error.response?.message || error.message);

    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }

    return () => { };
  }, [taskId]);


  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className='text-xl md:text-xl font-bold text-white/90'>
                {taskId ? "Update Task" : "Create New Task"}
              </h2>

              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-300 bg-rose-500/15 rounded-xl px-3 py-1.5 border border-rose-500/25 hover:bg-rose-500/25 cursor-pointer transition-all'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base' /> Delete
                </button>
              )}
            </div>

            <div className='mt-4'>
              <label className='text-[11px] font-semibold text-white/50 uppercase tracking-wider'>
                Task Title
              </label>

              <input
                placeholder='Create App UI'
                className='form-input'
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label className='text-[11px] font-semibold text-white/50 uppercase tracking-wider'>
                Description
              </label>

              <textarea
                rows={4}
                placeholder='Task Description'
                className='form-input'
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Priority</label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                  Due Date
                </label>

                <input
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>

            </div>

            <div className="mt-3">
              <label className='text-[11px] font-semibold text-white/50 uppercase tracking-wider'>
                TODO Checklist
              </label>

              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider" >
                Add Attachments
              </label>

              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-400 mt-5 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className='flex justify-end mt-7'>
              <button
                className='btn-primary !w-auto px-8'
                onClick={handleSubmit}
                disabled={Loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >

        <DeleteAlert
          content="Are you sure you want to delete this task? This action cannot be undone."
          onDelete={() => deleteTask()} />

      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;