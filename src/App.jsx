import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import ClientsPanel from "./components/ClientsPanel";
import ClientDashboard from "./components/ClientDashboard";

// Predefined editable tasks assigned to each new client
const PREDEFINED_TASKS = [
  "Create website",
  "Check mobile view",
  "Create Razorpay account",
  "Integrate payment gateway",
  "Set up domain & DNS",
  "Deploy to production",
  "Create Google Analytics",
  "SEO basic setup",
  "Content upload",
  "QA & bug fixes",
  "Handover & documentation",
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [clients, setClients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const selectedClient = useMemo(() => clients.find((c) => c.id === selectedId) || null, [clients, selectedId]);

  const recalcProgress = (client) => {
    const total = client.tasks.length || 0;
    const done = client.tasks.filter((t) => t.completed).length;
    return total === 0 ? 0 : (done / total) * 100;
  };

  const addClient = (name) => {
    const tasks = PREDEFINED_TASKS.map((title) => ({
      id: uid(),
      title,
      completed: false,
      description: "",
      comments: [],
      images: [],
    }));
    const client = { id: uid(), name, tasks, progress: 0 };
    client.progress = recalcProgress(client);
    setClients((prev) => [client, ...prev]);
    setSelectedId(client.id);
  };

  const deleteClient = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const addTask = (title) => {
    setClients((prev) => prev.map((c) => {
      if (c.id !== selectedId) return c;
      const newTask = { id: uid(), title, completed: false, description: "", comments: [], images: [] };
      const updated = { ...c, tasks: [newTask, ...c.tasks] };
      return { ...updated, progress: recalcProgress(updated) };
    }));
  };

  const toggleTask = (taskId) => {
    setClients((prev) => prev.map((c) => {
      if (c.id !== selectedId) return c;
      const tasks = c.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      const updated = { ...c, tasks };
      return { ...updated, progress: recalcProgress(updated) };
    }));
  };

  const editTask = (updatedTask) => {
    setClients((prev) => prev.map((c) => {
      if (c.id !== selectedId) return c;
      const tasks = c.tasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t));
      const updated = { ...c, tasks };
      return { ...updated, progress: recalcProgress(updated) };
    }));
  };

  const deleteTask = (taskId) => {
    setClients((prev) => prev.map((c) => {
      if (c.id !== selectedId) return c;
      const tasks = c.tasks.filter((t) => t.id !== taskId);
      const updated = { ...c, tasks };
      return { ...updated, progress: recalcProgress(updated) };
    }));
  };

  const addComment = (taskId, text) => {
    setClients((prev) => prev.map((c) => {
      if (c.id !== selectedId) return c;
      const tasks = c.tasks.map((t) => (t.id === taskId ? { ...t, comments: [...t.comments, text] } : t));
      return { ...c, tasks };
    }));
  };

  const addImages = (taskId, urls) => {
    setClients((prev) => prev.map((c) => {
      if (c.id !== selectedId) return c;
      const tasks = c.tasks.map((t) => (t.id === taskId ? { ...t, images: [...t.images, ...urls] } : t));
      return { ...c, tasks };
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 xl:col-span-3 rounded-xl border bg-white shadow-sm h-[75vh] overflow-hidden">
            <ClientsPanel
              clients={clients}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onCreate={addClient}
              onDelete={deleteClient}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9 rounded-xl border bg-white shadow-sm h-[75vh] overflow-hidden">
            <ClientDashboard
              client={selectedClient}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onAddComment={addComment}
              onAddImages={addImages}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
