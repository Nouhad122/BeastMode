import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from './schedule-slice';
const store = configureStore({
    reducer: {
        schedule: scheduleReducer
    }
})

export default store;