import React, { useState } from 'react'
import {HiMiniPlus,HiOutlineTrash} from "react-icons/hi2";


const TodoListInput = ({todoList,setTodoList}) => {
 const [option,setOption] = useStat("");

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
    <div 
    key={item}
    className=''
    >
      <p className=''>
        <span className=''>
          {index < 9 ? `0${index + 1}`  : index + 1}
        </span>
        {item}
      </p>

      <button></button>

    </div>
  )
}

export default TodoListInput