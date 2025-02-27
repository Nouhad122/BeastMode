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
            const { day, newExercise } = action.payload;
            const existingExercise = state.schedule[day].find(exercise => exercise.id === newExercise.id);
            if(!existingExercise){
              state.schedule[day].push(newExercise);  
            }
            
        },
        removeFromSchedule: (state, action) =>{
            const { day, exerciseId } = action.payload;
            state.schedule[day] = state.schedule[day].filter(
                exercise => exercise.id !== exerciseId);
        },
        clearDaySchedule: (state, action) =>{
            const { day } = action.payload;
            state.schedule[day] = [];
        }
    }
})

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;