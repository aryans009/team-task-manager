import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"] 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"] 
    },
    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;