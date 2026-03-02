import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/UserContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import { addThousandSeparators } from '../../utils/helper';
import InfoCard from '../../components/Cards/InfoCard';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const COLORS = ["#FF6B00", "#5200FF", "#CCFF00"];

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  //chart data preparation

  const prepareChartData = (data) => {
    const tasksDistribution = data?.tasksDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const tasksDistributionData = [
      { status: "Pending", count: tasksDistribution?.Pending || 0 },
      { status: "In Progress", count: tasksDistribution?.InProgress || 0 },
      { status: "Completed", count: tasksDistribution?.Completed || 0 },
    ];

    setPieChartData(tasksDistributionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);

  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null)
      }
    } catch (error) {
      console.error("Error fetching users :", error);
    }
  };

  const onSeeMore = () => {
    navigate('/admin/tasks')
  }

  useEffect(() => {
    getDashboardData();

    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Greeting card */}
      <div className='card my-5'>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white/90">
              Good Morning,{" "}
              <span className="text-gradient">{user?.name}</span>
            </h2>
            <p className='text-xs md:text-[13px] text-white/40 mt-1.5 font-medium'>
              {moment().format("dddd, Do MMMM YYYY")}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/40 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Dashboard Overview
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-5'>
          <InfoCard
            label="Total Tasks"
            value={addThousandSeparators(
              dashboardData?.charts?.tasksDistribution?.All || 0
            )}
            color="bg-[#5200FF]"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandSeparators(
              dashboardData?.charts?.tasksDistribution?.Pending || 0
            )}
            color="bg-[#FF6B00]"
          />
          <InfoCard
            label="In Progress"
            value={addThousandSeparators(
              dashboardData?.charts?.tasksDistribution?.InProgress || 0
            )}
            color="bg-[#F900FF]"
          />
          <InfoCard
            label="Completed"
            value={addThousandSeparators(
              dashboardData?.charts?.tasksDistribution?.Completed || 0
            )}
            color="bg-[#CCFF00]"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2  gap-6 my-4 md:my-6'>

        <div>
          <div className='card'>
            <div className='flex items-center justify-between mb-2'>
              <h5 className='font-semibold text-white/80'>Task Distribution</h5>
            </div>

            <CustomPieChart
              data={pieChartData}
              colors={COLORS}
            />
          </div>
        </div>

        <div>
          <div className='card'>
            <div className='flex items-center justify-between mb-2'>
              <h5 className='font-semibold text-white/80'>Task Priority Levels</h5>
            </div>

            <CustomBarChart
              data={barChartData}
            />
          </div>
        </div>

        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between mb-2'>
              <h5 className='text-base font-semibold text-white/80'>Recent Tasks</h5>

              <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
              </button>
            </div>

            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;