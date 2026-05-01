import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  
  // RBAC Validation: Only Admins can create projects
  if (!session || session.user.role !== "Admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { title, description, members } = await req.json();
    await connectMongoDB();
    const newProject = await Project.create({
      title,
      description,
      admin: session.user.id,
      members: members || [],
    });
    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectMongoDB();

  try {
    let projects;
    if (session.user.role === "Admin") {
      projects = await Project.find({ admin: session.user.id }).populate('members', 'name email');
    } else {
      projects = await Project.find({ members: session.user.id }).populate('admin', 'name');
    }
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 });
  }
}