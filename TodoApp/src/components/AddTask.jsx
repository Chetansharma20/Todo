import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'

import axios from 'axios'
import React, { useState } from 'react'

const AddTask = () => {
//   const [taskStatus, setTaskStatus] = useState('todo')
const SubmitTaskData = async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let reqData = Object.fromEntries(formData.entries());

  // You can set default TaskPosition here
  // reqData.TaskPosition = 0;

  console.log('REQ', reqData);

  try {
    let result = await axios.post(
      'http://localhost:5000/api/addtask',
      reqData,
     
    );

    console.log(result.data.data);
    alert('Task added successfully');
    e.target.reset(); // Clear form
  } catch (error) {
    const message = error?.response?.data?.message || 'Something went wrong';
    console.log(message);
    alert(message);
  }
};


  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          borderRadius: 3,
          boxShadow: 4
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: '#3f51b5' }}
        >
          Add New Task
        </Typography>

        <Box
          component="form"
          onSubmit={SubmitTaskData}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2
          }}
        >
          <TextField
            label="Task Title"
            name="TaskTitle"
            type="text"
            required
          />

          <TextField
            label="Task Description"
            name="TaskDescription"
            type="text"
            multiline
            rows={2}
          />

          <TextField
            label="position"
            name="TaskPosition"
            type="number"
         />
         <FormControl>
  <FormLabel>Task Status</FormLabel>
  <RadioGroup
    row
    name="TaskStatus"
    // value={taskStatus}
    // onChange={(e) => setTaskStatus(e.target.value)}
  >
    <FormControlLabel value="todo" control={<Radio size="small" />} label="To Do" />
    <FormControlLabel value="in-progress" control={<Radio size="small" />} label="In Progress" />
    {/* <FormControlLabel value="completed" control={<Radio size="small" />} label="Completed" /> */}
  </RadioGroup>
</FormControl>


          <Button type="submit" variant="contained" color="primary">
            Add Task
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AddTask
