import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

export default function ClientDashboard({ client, onAddTask, onToggleTask, onEditTask, onDeleteTask, onAddComment, onAddImages }) {
  const [newTask, setNewTask] = useState("");

  const progress = useMemo(() => {
    if (!client || client.tasks.length === 0) return 0;
    const done = client.tasks.filter((t) => t.completed).length;
    return (done / client.tasks.length) * 100;
  }, [client]);

  if (!client) {
    return (
      <div className="h-full grid place-items-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Select or create a client</h3>
          <p className="mt-1 text-sm text-gray-500">Manage tasks, progress, comments and attachments here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
            <p className="text-sm text-gray-500">{client.tasks.length} total tasks</p>
          </div>
          <div className="w-64">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add new task title..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTask.trim()) {
                onAddTask(newTask.trim());
                setNewTask("");
              }
            }}
          />
          <button
            className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={() => {
              if (!newTask.trim()) return;
              onAddTask(newTask.trim());
              setNewTask("");
            }}
          >
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex-1 space-y-3 overflow-auto p-6">
        {client.tasks.length === 0 ? (
          <div className="text-sm text-gray-500">No tasks yet. Create one above.</div>
        ) : (
          client.tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onAddComment={onAddComment}
              onAddImages={onAddImages}
            />
          ))
        )}
      </div>
    </div>
  );
}
