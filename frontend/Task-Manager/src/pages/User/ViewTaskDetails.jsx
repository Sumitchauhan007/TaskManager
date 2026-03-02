import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AvatarGroup from '../../components/AvatarGroup';
import moment from "moment";
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-300 bg-cyan-500/15 border border-cyan-500/25";
      case "Completed":
        return "text-green-300 bg-green-500/15 border border-green-500/25";
      default:
        return "text-violet-300 bg-violet-500/15 border border-violet-500/25";
    }
  };
  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );

      if (response.data) {
        const taskInfo = response.data;
        setTask(taskInfo);
      }
    }
    catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // handle todo check
  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;
      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          { todoChecklist }
        );
        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          // Optionally revert the toggle if the API call fails.
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  // Handle attachment link cLick
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "http://" + link; //default to https
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }

    return () => { };
  }, [id]);
  return (
    <DashboardLayout activeMenu="MyTasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-xl font-bold text-white/90">
                  {task?.title}
                </h2>

                <div
                  className={`text-[13px] md:text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className='col-span-6 md:col-span-4'>
                  <InfoBox label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />

                </div>
                <div className='col-span-6 md:col-span-4'>
                  <label className='text-[11px] font-semibold text-white/50 uppercase tracking-wider'>
                    Assigned To
                  </label>

                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className='text-[11px] font-semibold text-white/50 uppercase tracking-wider'>
                  Todo Checklist
                </label>

                {task?.todoChecklist?.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    Attachments
                  </label>

                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <>
      <label className='text-[11px] font-semibold text-white/50 uppercase tracking-wider'>{label}</label>

      <p className='text-[13px] md:text-[13px] font-medium text-white/80 mt-0.5'>
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className='flex items-center gap-3 py-2' style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={onChange}
        className='w-4 h-4 accent-blue-500 bg-white/10 border-white/20 rounded cursor-pointer'
      />

      <p className={`text-[13px] transition-all ${ isChecked ? 'line-through text-white/30' : 'text-white/75' }`}>{text}</p>
    </div>
  );
}

const Attachment = ({ link, index, onClick }) => {
  return <div
    className="flex justify-between px-3 py-2.5 rounded-xl mb-2 mt-2 cursor-pointer transition-colors hover:bg-white/[0.05]"
    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    onClick={onClick}
  >
    <div className="flex-1 flex items-center gap-3">
      <span className="text-[10px] text-white/30 font-bold">
        {index < 9 ? `0${index + 1}` : index + 1}
      </span>

      <p className="text-xs text-white/65">{link}</p>
    </div>

    <LuSquareArrowOutUpRight className="text-white/30" />
  </div>

};