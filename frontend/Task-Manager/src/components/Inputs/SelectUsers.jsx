import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../layouts/Modal';

function SelectUsers({
  selectedUsers,
  setSelectedUsers
}) {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user.id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUser.length === 0) {
      setTempSelectedUsers([]);
    }

    return () => { };
  }, [selectedUsers]);

  return (
    <div className='space-y-4 mt-2'>
      {selectedUserAvatars.length === 0 && (
        <button
          className='card-btn' onClick={() => setIsModalOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user.id}
              className='flex items-center gap-4 p-3 border-b border-gray-200 '>
              <img src={user.profileImageUrl} alt={user.name}
                className='w-10 h-10 rounded-full' />
              <div className='flex-1'>
                <p className='font-medium '>
                  {user.name}
                </p>
                <p className='text-sm text-gray-500'>{user.email}</p>
              </div}
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user.id)}
                onChange={() => toggleUserSelection(user.id)}
                className=''
              />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;   
