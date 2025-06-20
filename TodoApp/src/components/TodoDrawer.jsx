import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ListIcon from '@mui/icons-material/List'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AssignmentIcon from '@mui/icons-material/Assignment'

const DrawerTodo = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const handleDrawerOpen = () => setisDrawerOpen(true)
  const handleDrawerClose = () => setisDrawerOpen(false)

  return (
    <>
      
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(to right, #3f51b5, #5a55ae)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          px: 2,
          py: 1,
          boxShadow: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            sx={{ color: 'white' }}
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <ListIcon />
          </IconButton>
          <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
            ToDo App
          </Typography>
        </Box>
      </Box>

      <Drawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            backgroundColor: '#f5f5f5',
            width: 250,
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px',
            p: 1
          }
        }}
      >
        <List>
          <ListItem
            onClick={() => {
              navigate('/')
              handleDrawerClose()
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                backgroundColor: '#e8f5e9'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#4caf50' }}>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Task" />
          </ListItem>

          <ListItem
            onClick={() => {
              navigate('/displaytask')
              handleDrawerClose()
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                backgroundColor: '#e3f2fd'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#3f51b5' }}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="View Tasks" />
          </ListItem>
           <ListItem
            onClick={() => {
              navigate('/updatetask')
              handleDrawerClose()
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                backgroundColor: '#e3f2fd'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#3f51b5' }}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Update Task" />
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default DrawerTodo
