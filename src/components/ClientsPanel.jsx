import { useMemo, useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";

export default function ClientsPanel({ clients, selectedId, onSelect, onCreate, onDelete }) {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return clients;
    return clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  }, [clients, query]);

  return (
    <aside className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search clients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 space-y-3 border-b">
        <div className="text-xs font-medium text-gray-500">Add new client</div>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) {
                onCreate(name.trim());
                setName("");
              }
            }}
          />
          <button
            className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={() => {
              if (!name.trim()) return;
              onCreate(name.trim());
              setName("");
            }}
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No clients found.</div>
        ) : (
          <ul className="divide-y">
            {filtered.map((c) => (
              <li key={c.id} className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 ${selectedId === c.id ? "bg-indigo-50" : ""}`}>
                <button
                  className="flex-1 text-left"
                  onClick={() => onSelect(c.id)}
                >
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.tasks.length} tasks • {Math.round(c.progress)}% done</div>
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-red-600"
                  title="Delete client"
                  onClick={() => onDelete(c.id)}
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
