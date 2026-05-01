import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
    }

    await connectMongoDB();
    const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
    
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
  }

  try {
    const { title, description, dueDate, projectId } = await req.json();
    await connectMongoDB();
    
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      project: projectId,
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
  }
}