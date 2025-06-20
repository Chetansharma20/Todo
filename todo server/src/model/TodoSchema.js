import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    TaskTitle: {
      type: String,
      required: true,
      trim: true,
    },

    TaskDescription: {
      type: String,
      trim: true,
    },

    TaskStatus: {
      type: String,
      enum: ['todo', 'in-progress', 'completed'],
      default: 'todo',
    },

    TaskPosition: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);
