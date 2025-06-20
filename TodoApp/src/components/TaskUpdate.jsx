import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper } from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import DroppableColumn from './DroppableColumn';
import SortableTask from './SortableTask';

const TaskUpdate = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetchtask');
      setTasks(response.data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const statuses = ['todo', 'in-progress', 'completed'];

  const handleDragEnd = async ({ active, over }) => {
  if (!active || !over || active.id === over.id) return;

  const activeTask = tasks.find(t => t._id === active.id);
  const overTask = tasks.find(t => t._id === over.id);
  if (!activeTask || !overTask) return;

  const sourceStatus = activeTask.TaskStatus;
  const destinationStatus = overTask.TaskStatus;


  if (sourceStatus !== destinationStatus) {
    await axios.put('http://localhost:5000/api/updatetask', {
      TaskId: active.id,
      TaskStatus: destinationStatus,
      TaskPosition: 0,
    });
    fetchTasks();
    return;
  }

  if (sourceStatus === 'todo') {
    const todoTasks = tasks
      .filter(t => t.TaskStatus === 'todo')
      .sort((a, b) => a.TaskPosition - b.TaskPosition);

    const oldIndex = todoTasks.findIndex(t => t._id === active.id);
    const newIndex = todoTasks.findIndex(t => t._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(todoTasks, oldIndex, newIndex).map((task, i) => ({
      ...task,
      TaskPosition: i,
    }));

    await Promise.all(
      reordered.map(task =>
        axios.put('http://localhost:5000/api/updatetask', {
          TaskId: task._id,
          TaskPosition: task.TaskPosition,
        })
      )
    );

    fetchTasks();
  }
};


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
        {statuses.map((status) => {
          const columnTasks = tasks
            .filter(t => t.TaskStatus === status)
            .sort((a, b) => a.TaskPosition - b.TaskPosition);

          const items = columnTasks.map(t => t._id);

          return (
            <Paper key={status} sx={{ flex: 1, p: 2, minHeight: '500px' }}>
              <Typography variant="h6" align="center" gutterBottom>
                {status.toUpperCase()}
              </Typography>
              <DroppableColumn id={status}>
                {status === 'todo' ? (
                  <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {columnTasks.map(task => (
                      <SortableTask key={task._id} task={task} />
                    ))}
                  </SortableContext>
                ) : (
                  columnTasks.map(task => <SortableTask key={task._id} task={task} />)
                )}
              </DroppableColumn>
            </Paper>
          );
        })}
      </Box>
    </DndContext>
  );
};

export default TaskUpdate;
