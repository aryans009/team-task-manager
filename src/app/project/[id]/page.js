"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectBoard() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  
  const projectId = params.id;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && projectId) {
      fetchTasks();
    }
  }, [status, projectId]);

  const fetchTasks = async () => {
    const res = await fetch(`/api/tasks?projectId=${projectId}`);
    const data = await res.json();
    if (res.ok) setTasks(data.tasks);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    console.log("Sending payload:", { ...newTask, projectId }); // Debugging line

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTask, projectId }),
      });

      const data = await res.json();

      if (res.ok) {
        setNewTask({ title: "", description: "", dueDate: "" });
        fetchTasks();
      } else {
        console.error("Server rejected task creation:", data);
        alert(`Server Error: ${data.message}`); 
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert("A network error occurred. Check your terminal.");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      fetchTasks();
    }
  };

  if (status === "loading") return <p className="p-8">Loading Board...</p>;

  const pendingTasks = tasks.filter((t) => t.status === "Pending");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Task Board</h1>
        <Link href="/dashboard" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          &larr; Back to Dashboard
        </Link>
      </div>

      {session?.user?.role === "Admin" && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Assign New Task</h2>
          <form onSubmit={handleCreateTask} className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Task Title"
              className="border p-2 rounded flex-1 min-w-[200px] text-black"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Brief Description"
              className="border p-2 rounded flex-1 min-w-[250px] text-black"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 rounded text-black"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Add Task
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
        
        <div className="bg-gray-100 p-4 rounded-lg min-h-[500px]">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 text-gray-700">Pending ({pendingTasks.length})</h3>
          {pendingTasks.map((task) => (
            <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} />
          ))}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg min-h-[500px]">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 text-yellow-700">In Progress ({inProgressTasks.length})</h3>
          {inProgressTasks.map((task) => (
            <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} />
          ))}
        </div>

        <div className="bg-green-50 p-4 rounded-lg min-h-[500px]">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 text-green-700">Completed ({completedTasks.length})</h3>
          {completedTasks.map((task) => (
            <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} />
          ))}
        </div>

      </div>
    </div>
  );
}

function TaskCard({ task, onStatusChange }) {
  const dueDate = new Date(task.dueDate).toLocaleDateString();

  return (
    <div className="bg-white p-4 rounded shadow mb-4 border border-gray-200">
      <h4 className="font-bold text-lg mb-1">{task.title}</h4>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">
          Due: {dueDate}
        </span>
        
        <select 
          className="text-sm border p-1 rounded bg-gray-50 cursor-pointer"
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}