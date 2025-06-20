import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateTaskStatusInDB = createAsyncThunk(
  'task/updateStatus',
  async ({ taskId, newStatus, newPosition }) => {
    const res = await axios.put('http://localhost:5000/api/updatetask', {
      TaskId: taskId,
      TaskStatus: newStatus,
      TaskPosition: newPosition
    });
    return res.data.data;
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: []
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateTaskStatusInDB.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex(task => task._id === updatedTask._id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    });
  }
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
