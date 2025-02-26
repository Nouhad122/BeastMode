import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    schedule: {
        monday: [],
        tuesday: [],
        wednsday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    }
    
}

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers:{
        addToSchedule: (state, action) =>{
            
        },
        removeToSchedule: (state, action) =>{},
        clearDaySchedule: (state, action) =>{}
    }
})

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;