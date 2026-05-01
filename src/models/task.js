import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, "Task title is required"] 
    },
    description: { 
      type: String 
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Overdue"],
      default: "Pending",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User", 
    },
    dueDate: { 
      type: Date, 
      required: [true, "Due date is required"] 
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;