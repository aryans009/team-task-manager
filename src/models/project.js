import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, "Project title is required"] 
    },
    description: { 
      type: String 
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;