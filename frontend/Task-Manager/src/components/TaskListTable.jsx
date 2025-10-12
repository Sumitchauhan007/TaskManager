import React from 'react'
import moment from 'moment'

const TaskListTable = ({tableData}) => {
    const getStatusBadgeColor = {status} => {
        switch (status) {
            case 'Completed' : return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending' : return 'bg-purple-100 text-purple-500 border border-purple-200';
            case 'In Progress': return 'bg-cyan-100 text-cyan-500 border border-cyan-200';
            default: return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };

    const getPriorityBadgeColor = {priority} => {
        switch (priority) {
            case 'High' : return 'bg-red-100 text-red-500 border border-red-200';
            case 'Medium' : return 'bg-orange-100 text-orange-500 border border-orange-200';
            case 'Low': return 'bg-green-100 text-green-500 border border-green-200';
            default: return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };
  return (
    <><div className=''>
        <table className=''>
          <thead>
              <tr className=''>
                  <th className=''>Name</th>
                  <th className=''>Status</th>
                  <th className=''>Priority</th>
                  <th className=''>Created On</th>
              </tr>
          </thead>
      <tbody>
        {tableData.map((task) => (
            <tr key={task.id} className=''>
                <td className=''>{task.name}</td>
            </tr>
        ))}
      </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskListTable;