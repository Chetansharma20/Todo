
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "./taskSlice"

 const MainStore = configureStore({
  reducer: {
    task: taskReducer
  }
});
export default MainStore;
