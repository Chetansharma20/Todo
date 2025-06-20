import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import axios from 'axios';
import {
  Box,
  Button,

} from '@mui/material';

const DisplayTask = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [allTasks, setAllTasks] = useState([]);

  const openAddDialog = (taskId) => {
    setSelectedTaskId(taskId);
    const task = allTasks.find((t) => t._id === taskId);
    setTaskStatus(task?.TaskStatus || '');
    setOpenDialog(true);
  };

  const closeAddDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/fetchtask');
        setAllTasks(result.data.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.post('http://localhost:5000/api/deletetask', {
        TaskId: taskId,
      });
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());

    try {
      const response = await axios.put('http://localhost:5000/api/updatetask', {
        ...reqData,
        TaskId: selectedTaskId,
      });
      setAllTasks(response.data.data);
      closeAddDialog();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const columns = [
    { field: 'TaskTitle', headerName: 'Title', flex: 1 },
    { field: 'TaskDescription', headerName: 'Description', flex: 2 },
    { field: 'TaskStatus', headerName: 'Status', width: 120 },
    { field: 'TaskPosition', headerName: 'Position', width: 100 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (params) => {
        const date = params.row?.createdAt;
        return date ? (
          <span style={{ fontWeight: 500, color: '#3f51b5' }}>
            {dayjs(date).format('DD/MM/YYYY hh:mm A')}
          </span>
        ) : (
          '--'
        );
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200,
      renderCell: (params) => {
        const date = params.row?.updatedAt;
        return date ? (
          <span style={{ fontWeight: 500, color: '#3f51b5' }}>
            {dayjs(date).format('DD/MM/YYYY hh:mm A')}
          </span>
        ) : (
          '--'
        );
      },
    },
    {
      field: 'Delete',
      headerName: 'Delete task',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="info"
          sx={{ borderRadius: '20px', textTransform: 'none' }}
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
    
  ];

  const rows = allTasks.map((task, index) => ({
    id: task._id || index,
    ...task,
  }));

  return (
    <>
      <Box sx={{ width: '90%', maxWidth: '1200px', mx: 'auto', mt: 4, height:400 }}>
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[5, 10]}
 
    
  />
</Box>


   
    </>
  );
};

export default DisplayTask;
