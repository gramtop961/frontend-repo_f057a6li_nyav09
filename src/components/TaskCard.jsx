import { useRef, useState } from "react";
import { CheckCircle2, Circle, Edit, Image as ImageIcon, MessageSquare, Save, Trash2, Upload, X } from "lucide-react";

export default function TaskCard({ task, onToggle, onEdit, onDelete, onAddComment, onAddImages }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description || "");
  const [comment, setComment] = useState("");
  const fileRef = useRef(null);

  const saveEdits = () => {
    onEdit({ ...task, title: title.trim() || task.title, description: desc });
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <button
          className={`mt-0.5 rounded-full p-1 ${task.completed ? "text-green-600" : "text-gray-400"}`}
          onClick={() => onToggle(task.id)}
          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </button>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Detailed description for teammates..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <h4 className="font-medium text-gray-900">{task.title}</h4>
              {task.description && (
                <p className="mt-1 text-sm text-gray-600 whitespace-pre-wrap">{task.description}</p>
              )}
            </div>
          )}

          {/* Attachments */}
          {task.images && task.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {task.images.map((src, idx) => (
                <img key={idx} src={src} alt="attachment" className="h-24 w-full rounded-md object-cover" />)
              )}
            </div>
          )}

          {/* Comments */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <MessageSquare size={14} /> Comments ({task.comments.length})
            </div>
            <ul className="space-y-2">
              {task.comments.map((c, i) => (
                <li key={i} className="rounded-md bg-gray-50 p-2 text-sm text-gray-700">
                  {c}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && comment.trim()) {
                    onAddComment(task.id, comment.trim());
                    setComment("");
                  }
                }}
              />
              <button
                onClick={() => {
                  if (!comment.trim()) return;
                  onAddComment(task.id, comment.trim());
                  setComment("");
                }}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ml-2 flex flex-col items-center gap-2">
          {isEditing ? (
            <>
              <button className="rounded-md bg-green-600 p-2 text-white hover:bg-green-700" onClick={saveEdits} title="Save">
                <Save size={16} />
              </button>
              <button className="rounded-md bg-gray-200 p-2 text-gray-700 hover:bg-gray-300" onClick={() => setIsEditing(false)} title="Cancel">
                <X size={16} />
              </button>
            </>
          ) : (
            <button className="rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 border" onClick={() => setIsEditing(true)} title="Edit task">
              <Edit size={16} />
            </button>
          )}
          <button className="rounded-md bg-white p-2 text-gray-600 hover:bg-gray-100 border" onClick={() => fileRef.current?.click()} title="Upload images">
            <ImageIcon size={16} />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (!files.length) return;
              const urls = files.map((f) => URL.createObjectURL(f));
              onAddImages(task.id, urls);
              if (fileRef.current) fileRef.current.value = "";
            }}
          />
          <button className="rounded-md bg-white p-2 text-red-600 hover:bg-red-50 border border-red-200" onClick={() => onDelete(task.id)} title="Delete task">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
