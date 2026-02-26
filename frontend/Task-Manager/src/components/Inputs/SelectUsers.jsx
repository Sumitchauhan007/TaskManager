import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({
  selectedUsers,
  setSelectedUsers
}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setAllUsers(response.data?.length > 0 ? response.data : []);
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

  const openModal = () => {
    setTempSelectedUsers([...selectedUsers]);
    getAllUsers();
    setIsModalOpen(true);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className='space-y-4 mt-2'>
      {selectedUserAvatars.length === 0 && (
        <button className='card-btn' onClick={openModal}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={openModal}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3}/>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No members found. Sign up a member account first.
            </p>
          ) : (
            allUsers.map((user) => (
              <div
                key={user._id}
                className='flex items-center gap-4 p-3 border-b border-gray-200'>
                <img
                  src={user.profileImageUrl || ""}
                  alt={user.name}
                  className='w-10 h-10 rounded-full bg-gray-200 object-cover'
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                {!user.profileImageUrl && (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0 -ml-14">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className='flex-1'>
                  <p className='font-medium text-gray-800'>
                    {user.name}
                  </p>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                </div>
                <input
                  type="checkbox"
                  checked={tempSelectedUsers.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                  className='w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none'
                />
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button className='card-btn' onClick={() => setIsModalOpen(false)}>
            CANCEL
          </button>
          <button className='card-btn-fill' onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Modal>
    </div>
  );
};
//selction of users for task assignment, with a modal to choose from all users and display selected users as avatars.
export default SelectUsers;   
