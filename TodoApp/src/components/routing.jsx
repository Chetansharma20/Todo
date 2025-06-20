import React from 'react'



import { Route, Routes } from 'react-router-dom'

import AddTask from './AddTask'
import DisplayTask from './DisplayTask'
import DrawerTodo from './TodoDrawer'
import TaskUpdate from './TaskUpdate'

const Routing = () => {
  return (
 <>
 <DrawerTodo/>
    <Routes>
       <Route path='/' element={<AddTask/>}/> 
       <Route path='/displaytask' element={<DisplayTask/>}/>
        <Route path='/updatetask' element={<TaskUpdate/>}/>
      
      
    </Routes>

 
 
 
 
 
 </>
  )
}

export default Routing