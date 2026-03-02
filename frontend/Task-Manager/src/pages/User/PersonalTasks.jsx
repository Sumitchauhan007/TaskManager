import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { PRIORITY_DATA, STATUS_DATA } from '../../utils/data';
import toast from 'react-hot-toast';
import moment from 'moment';
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuCalendar,
  LuFlag,
  LuCircleCheck,
  LuCircle,
  LuX,
  LuNotebookPen,
} from 'react-icons/lu';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import SelectDropdown from '../../components/Inputs/SelectDropdown';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import Progress from '../../components/Progress';

/* ─── Helpers ─── */
const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed':  return 'text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/25';
    case 'In Progress':return 'text-[#5200FF] bg-[#5200FF]/10 border border-[#5200FF]/25';
    default:           return 'text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/25';
  }
};

const getPriorityBadge = (priority) => {
  switch (priority) {
    case 'High':   return 'text-[#F900FF] bg-[#F900FF]/10 border border-[#F900FF]/20';
    case 'Medium': return 'text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20';
    default:       return 'text-[#CCFF00] bg-[#CCFF00]/10 border border-[#CCFF00]/20';
  }
};

const getLeftBorder = (status) => {
  switch (status) {
    case 'In Progress': return 'border-[#5200FF]';
    case 'Completed':   return 'border-[#CCFF00]';
    default:            return 'border-[#FF6B00]';
  }
};

/* ─── Empty Form State ─── */
const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
  todoChecklist: [],
};

/* ──────────────────────────────────────────────── */

const PersonalTasks = () => {
  const [tasks, setTasks]             = useState([]);
  const [tabs, setTabs]               = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading]         = useState(false);

  // modals
  const [showForm, setShowForm]           = useState(false);
  const [editingTask, setEditingTask]     = useState(null);           // task being edited
  const [deleteTarget, setDeleteTarget]   = useState(null);           // id of task to delete
  const [expandedTask, setExpandedTask]   = useState(null);           // id expanded for checklist

  // form state
  const [form, setForm]     = useState(EMPTY_FORM);
  const [todoInput, setTodoInput] = useState('');
  const [formError, setFormError] = useState('');

  /* ─── Fetch ─── */
  const fetchTasks = async (status) => {
    try {
      const res = await axiosInstance.get(API_PATHS.PERSONAL_TASKS.GET_ALL, {
        params: { status: status === 'All' ? '' : status },
      });
      const data = res.data;

      const withCounts = (data.tasks || []).map((t) => ({
        ...t,
        completedTodoCount: t.todoChecklist?.filter((x) => x.completed).length || 0,
      }));
      setTasks(withCounts);

      const s = data.statusSummary || {};
      setTabs([
        { label: 'All',         count: s.all || 0 },
        { label: 'Pending',     count: s.pendingTasks || 0 },
        { label: 'In Progress', count: s.inProgressTasks || 0 },
        { label: 'Completed',   count: s.completedTasks || 0 },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(filterStatus); }, [filterStatus]);

  /* ─── Form helpers ─── */
  const openCreate = () => {
    setEditingTask(null);
    setForm(EMPTY_FORM);
    setTodoInput('');
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingTask(task._id);
    setForm({
      title:         task.title || '',
      description:   task.description || '',
      priority:      task.priority || 'Medium',
      status:        task.status || 'Pending',
      dueDate:       task.dueDate ? moment(task.dueDate).format('YYYY-MM-DD') : '',
      todoChecklist: task.todoChecklist?.map((t) => t.text) || [],
    });
    setTodoInput('');
    setFormError('');
    setShowForm(true);
  };

  const addTodo = () => {
    const text = todoInput.trim();
    if (!text) return;
    setForm((prev) => ({ ...prev, todoChecklist: [...prev.todoChecklist, text] }));
    setTodoInput('');
  };

  const removeTodo = (idx) =>
    setForm((prev) => ({ ...prev, todoChecklist: prev.todoChecklist.filter((_, i) => i !== idx) }));

  /* ─── Submit ─── */
  const handleSubmit = async () => {
    setFormError('');
    if (!form.title.trim()) { setFormError('Title is required.'); return; }
    if (!form.dueDate)       { setFormError('Due date is required.'); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        dueDate: new Date(form.dueDate).toISOString(),
        todoChecklist: form.todoChecklist,
      };

      if (editingTask) {
        await axiosInstance.put(API_PATHS.PERSONAL_TASKS.UPDATE(editingTask), payload);
        toast.success('Task updated');
      } else {
        await axiosInstance.post(API_PATHS.PERSONAL_TASKS.CREATE, payload);
        toast.success('Personal task created');
      }

      setShowForm(false);
      fetchTasks(filterStatus);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  /* ─── Delete ─── */
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(API_PATHS.PERSONAL_TASKS.DELETE(deleteTarget));
      toast.success('Task deleted');
      setDeleteTarget(null);
      fetchTasks(filterStatus);
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  /* ─── Checklist toggle ─── */
  const toggleTodo = async (task, idx) => {
    const updated = task.todoChecklist.map((t, i) =>
      i === idx ? { ...t, completed: !t.completed } : t
    );
    try {
      const res = await axiosInstance.put(API_PATHS.PERSONAL_TASKS.UPDATE_TODO(task._id), {
        todoChecklist: updated,
      });
      // optimistic update
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id
            ? {
                ...res.data.task,
                completedTodoCount: (res.data.task.todoChecklist || []).filter((x) => x.completed).length,
              }
            : t
        )
      );
    } catch (err) {
      toast.error('Failed to update checklist');
    }
  };

  /* ─── UI ─── */
  return (
    <DashboardLayout activeMenu="Personal Tasks">
      <div className="my-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(82,0,255,0.18)', border: '1px solid rgba(82,0,255,0.35)' }}
            >
              <LuNotebookPen style={{ color: '#5200FF' }} className="text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>Personal Tasks</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>Tasks you create for yourself — private &amp; personal</p>
            </div>
          </div>
        </div>

        {/* Status tabs */}
        {tabs?.[0]?.count > 0 && (
          <TaskStatusTabs tabs={tabs} activeTab={filterStatus} setActiveTab={setFilterStatus} />
        )}

        {/* Task grid */}
        {tasks.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
            >
              <LuNotebookPen style={{ color: 'var(--text-3)' }} className="text-2xl" />
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>No personal tasks yet</p>
            <p className="text-xs" style={{ color: 'var(--text-3)' }}>Create your first task to stay on top of personal goals</p>
            <button className="card-btn-fill mt-2" onClick={openCreate}>
              <LuPlus /> Add Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {tasks.map((task) => (
              <PersonalTaskCard
                key={task._id}
                task={task}
                isExpanded={expandedTask === task._id}
                onToggleExpand={() =>
                  setExpandedTask((prev) => (prev === task._id ? null : task._id))
                }
                onEdit={() => openEdit(task)}
                onDelete={() => setDeleteTarget(task._id)}
                onToggleTodo={(idx) => toggleTodo(task, idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={editingTask ? 'Edit Personal Task' : 'New Personal Task'}
      >
        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>
              Title <span style={{ color: '#F900FF' }}>*</span>
            </label>
            <input
              className="form-input"
              placeholder="What do you need to do?"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>
              Description
            </label>
            <textarea
              className="form-input resize-none"
              rows={3}
              placeholder="Add some notes..."
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              style={{ minHeight: 72 }}
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-2)' }}>Priority</label>
              <SelectDropdown
                options={PRIORITY_DATA}
                value={form.priority}
                onChange={(v) => setForm((p) => ({ ...p, priority: v }))}
              />
            </div>
            {editingTask && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-2)' }}>Status</label>
                <SelectDropdown
                  options={STATUS_DATA}
                  value={form.status}
                  onChange={(v) => setForm((p) => ({ ...p, status: v }))}
                />
              </div>
            )}
          </div>

          {/* Due date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>
              Due Date <span style={{ color: '#F900FF' }}>*</span>
            </label>
            <input
              type="date"
              className="form-input"
              value={form.dueDate}
              onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Checklist */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>
              Checklist
            </label>
            {form.todoChecklist.length > 0 && (
              <ul className="mb-2 flex flex-col gap-1.5">
                {form.todoChecklist.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                  >
                    <span className="flex-1 truncate">{item}</span>
                    <button onClick={() => removeTodo(idx)} style={{ color: 'var(--text-3)' }} className="hover:text-rose-400 transition-colors">
                      <LuX className="text-sm" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2">
              <input
                className="form-input flex-1"
                placeholder="Add a checklist item..."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTodo(); } }}
                style={{ marginTop: 0 }}
              />
              <button
                type="button"
                onClick={addTodo}
                className="px-3 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-all"
                style={{
                  background: 'rgba(82,0,255,0.14)',
                  border: '1px solid rgba(82,0,255,0.30)',
                  color: '#5200FF',
                  marginTop: 0,
                }}
              >
                <LuPlus />
              </button>
            </div>
          </div>

          {formError && (
            <p className="text-xs text-rose-400 font-medium -mt-1">{formError}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            type="button"
            className="card-btn"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="card-btn-fill"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving…' : editingTask ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </Modal>

      {/* ── Delete Modal ── */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Personal Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this personal task? This action cannot be undone."
          onDelete={handleDelete}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default PersonalTasks;

/* ─── Individual task card ─── */
const PersonalTaskCard = ({ task, isExpanded, onToggleExpand, onEdit, onDelete, onToggleTodo }) => {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {/* Status stripe */}
      <div
        className="h-1"
        style={{
          background:
            task.status === 'Completed'
              ? 'linear-gradient(90deg, #88cc00, #CCFF00)'
              : task.status === 'In Progress'
              ? 'linear-gradient(90deg, #3500cc, #5200FF)'
              : 'linear-gradient(90deg, #cc5500, #FF6B00)',
        }}
      />

      <div className="p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`badge ${getStatusBadge(task.status)}`}>{task.status}</span>
          <span className={`badge ${getPriorityBadge(task.priority)}`}>{task.priority} Priority</span>
        </div>

        {/* Title + actions */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'var(--text-1)' }}>
            {task.title}
          </p>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={onEdit}
              title="Edit"
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--text-3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#5200FF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              <LuPencil className="text-sm" />
            </button>
            <button
              onClick={onDelete}
              title="Delete"
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'var(--text-3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              <LuTrash2 className="text-sm" />
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-3)' }}>
            {task.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5">
            <LuCalendar className="text-xs flex-shrink-0" style={{ color: 'var(--text-3)' }} />
            <span className="text-[11px]" style={{ color: 'var(--text-2)' }}>
              {task.dueDate ? moment(task.dueDate).format('Do MMM YYYY') : '—'}
            </span>
          </div>
          {task.todoChecklist?.length > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              <LuCircleCheck className="text-xs" style={{ color: '#CCFF00' }} />
              <span className="text-[11px]" style={{ color: 'var(--text-2)' }}>
                {task.completedTodoCount}/{task.todoChecklist.length}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {task.todoChecklist?.length > 0 && (
          <div className="mt-3">
            <Progress progress={task.progress || 0} status={task.status} />
          </div>
        )}

        {/* Checklist toggle */}
        {task.todoChecklist?.length > 0 && (
          <div className="mt-3">
            <button
              className="text-[11px] font-medium transition-colors"
              style={{ color: isExpanded ? '#5200FF' : 'var(--text-3)' }}
              onClick={onToggleExpand}
            >
              {isExpanded ? '▲ Hide checklist' : '▼ Show checklist'}
            </button>

            {isExpanded && (
              <ul className="mt-2 flex flex-col gap-1.5">
                {task.todoChecklist.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 cursor-pointer group"
                    onClick={() => onToggleTodo(idx)}
                  >
                    <div className="flex-shrink-0">
                      {item.completed ? (
                        <LuCircleCheck className="text-base" style={{ color: '#CCFF00' }} />
                      ) : (
                        <LuCircle className="text-base" style={{ color: 'var(--text-3)' }} />
                      )}
                    </div>
                    <span
                      className="text-xs leading-snug transition-colors"
                      style={{
                        color: item.completed ? 'var(--text-3)' : 'var(--text-1)',
                        textDecoration: item.completed ? 'line-through' : 'none',
                      }}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
