"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (res.ok) setProjects(data.projects);
  };

  const createProject = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    if (res.ok) {
      setNewProject({ title: "", description: "" });
      fetchProjects(); 
    }
  };

  if (status === "loading") return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}</h1>
      </div>

      {session?.user?.role === "Admin" && (
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">Create New Project</h2>
          <form onSubmit={createProject} className="flex gap-4">
            <input
              type="text"
              placeholder="Project Title"
              className="border p-2 rounded flex-1 text-black"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 rounded flex-1 text-black"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Create</button>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 ? <p>No projects found.</p> : null}
        {projects.map((project) => (
          <Link href={`/project/${project._id}`} key={project._id}>
            <div className="border p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer h-full">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}