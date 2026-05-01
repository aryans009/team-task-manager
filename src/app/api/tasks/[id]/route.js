import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";

export async function PATCH(req, { params }) {
  const { id } = await params; 
  
  const { status } = await req.json(); 

  try {
    await connectMongoDB();
    
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: 'after' } 
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated", task: updatedTask }, { status: 200 });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json({ message: "Error updating task" }, { status: 500 });
  }
}