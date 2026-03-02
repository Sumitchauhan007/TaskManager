import React, { useState } from 'react'
import {HiMiniPlus,HiOutlineTrash} from "react-icons/hi2";


const TodoListInput = ({todoList,setTodoList}) => {
 const [option, setOption] = useState("");

 //function to handle adding an option
 const handleAddOption = () => {
  if (option.trim()) {
    setTodoList([...todoList, option.trim()]);
    setOption("");
  }
 };

 //function to handle  deletion an option 
 const handleDeleteOption = (index) => {
  const updatedArr = todoList.filter((_, idx) => idx !== index);
  setTodoList(updatedArr);
 };
  return (
    <div>
      {todoList.map((item, index) => (
        <div
     key={item}
     className='flex justify-between px-3 py-2.5 rounded-xl mb-2 mt-2'
     style={{
       background: 'rgba(255,255,255,0.05)',
       border: '1px solid rgba(255,255,255,0.08)',
     }}
    >
      <p className='text-xs text-white/75'>
        <span className='text-[10px] text-white/35 font-semibold mr-2'>
          {index < 9 ? `0${index + 1}`  : index + 1}
        </span>
        {item}
      </p>

      <button 
      className='cursor-pointer' 
      onClick={() => {
        handleDeleteOption(index);
      }}
      >
        <HiOutlineTrash className='text-base text-rose-400'/>
      </button>
    </div>
  ))}

  <div className="flex items-center gap-3 mt-4">
    <input
     type="text"
    placeholder='Enter Task'
    value={option}
    onChange={({ target }) => setOption(target.value)}
    className='w-full text-[13px] text-white/85 outline-none px-3 py-2 rounded-xl placeholder:text-white/30'
    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
    />

    <button className='card-btn text-nowrap' onClick={handleAddOption}>
      <HiMiniPlus className='text-lg'/>Add
    </button>
  </div>
  </div>
)
}

export default TodoListInput