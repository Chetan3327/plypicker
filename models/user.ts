import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      trim: true,
      required: true 
    },
    email: { 
      type: String, 
      trim: true, 
      unique: true,
      required: true
    },
    password:{
      type:String
    },
    role: {
      type: String,
      enum: ["team-member", "admin"],
      default: "team-member"
    },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);