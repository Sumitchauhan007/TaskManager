import React from 'react'
import { LuChevronDown } from 'react-icons/lu'

const SelectDropdown = ({ 
  options,
  value,
  onChange,
  placeholder
}) => {
const [isOpen, setIsOpen] =useState(false);

const handleSelect = (option) => {
  onChange(option);
  setIsOpen(false);
};


  return  <div className="">
  {/* dropdown button */}
  <button 
   onClick={() => setIsOpen(!isOpen)}
   className=''
  >
    {value ? options.find((opt) => opt.value === value ;lllllllllllll)}
  </div>
    
  
}

export default SelectDropdown