import React from 'react'
import AvatarGroup from '../AvatarGroup';
import Progress from '../Progress';
import moment from 'moment';
import { LuPaperclip } from 'react-icons/lu';

const TaskCard = ({
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachmentCount,
    completedTodoCount,
    todoChecklist,
    onClick
}) => {

    const getstatusTagColor = () => {
        switch (status) {
            case "In Progress":
                return "text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/25";

            case "Completed":
                return "text-[#CCFF00] bg-[#CCFF00]/15 border border-[#CCFF00]/30";

            default:
                return "text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/25";
        }
    };

    const getPriorityTagColor = () => {
        switch (priority) {
            case "Low":
                return "text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/20";

            case "Medium":
                return "text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20";

            default:
                return "text-[#F900FF] bg-[#F900FF]/10 border border-[#F900FF]/20";
        }
    };

    return (
        <div
            className="rounded-2xl py-4 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{
                background: "var(--surface)",
                backdropFilter: "blur(20px) saturate(1.8)",
                WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                border: "1px solid var(--border)",
                boxShadow: "var(--card-shadow)",
                transition: "background 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
            }}
            onClick={onClick}
        >
            <div className='flex items-end gap-2 px-4'>
                <div className={`badge ${getstatusTagColor()}`}>
                    {status}
                </div>
                <div className={`badge ${getPriorityTagColor()}`}>
                    {priority} Priority
                </div>
            </div>

            <div
                className={`px-4 mt-1 border-l-2 ml-4 ${
                    status === "In Progress"
                        ? "border-[#CCFF00]"
                        : status === "Completed"
                            ? "border-[#5200FF]"
                            : "border-[#FF6B00]"
                }`}
            >
                <p className='text-sm font-semibold text-white/90 mt-3 line-clamp-2'>
                    {title}
                </p>

                <p className='text-xs text-white/45 mt-1.5 line-clamp-2 leading-[18px]'>
                    {description}
                </p>

                <p className='text-[12px] text-white/60 font-medium mt-2 mb-2 leading-[18px]'>
                    Tasks Done:{" "}
                    <span className='font-bold text-white/80'>
                        {completedTodoCount} / {todoChecklist.length || 0}
                    </span>
                </p>

                <Progress progress={progress} status={status} />
            </div>

            <div className="px-4">
                <div className="flex items-center justify-between my-3">
                    <div>
                        <label className='text-[10px] text-white/35 uppercase tracking-wider'>Start Date</label>
                        <p className='text-[12px] font-medium text-white/70 mt-0.5'>
                            {moment(createdAt).format("Do MMM YYYY")}
                        </p>
                    </div>

                    <div>
                        <label className='text-[10px] text-white/35 uppercase tracking-wider'>Due Date</label>
                        <p className='text-[12px] font-medium text-white/70 mt-0.5'>
                            {moment(dueDate).format("Do MMM YYYY")}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between mt-3 px-4'>
                <AvatarGroup avatars={assignedTo || []} />

                {attachmentCount > 0 && (
                    <div
                      className='flex items-center gap-2 px-2.5 py-1.5 rounded-lg'
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                    >
                        <LuPaperclip className="text-[#F900FF] text-xs" />{" "}
                        <span className='text-xs text-white/70'>{attachmentCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;