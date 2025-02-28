import { createSlice } from "@reduxjs/toolkit";

// Load schedule from local storage or use default
const loadScheduleFromLocalStorage = () => {
    const storedSchedule = localStorage.getItem("userSchedule");
    return storedSchedule ? JSON.parse(storedSchedule) : {
        monday: [], tuesday: [], wednesday: [], thursday: [],
        friday: [], saturday: [], sunday: []
    };
};

const initialState = {
    schedule: loadScheduleFromLocalStorage()
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers:{
        addToSchedule: (state, action) =>{
            const { day, newExercise } = action.payload;
            const existingExercise = state.schedule[day].find(exercise => exercise.id === newExercise.id);
            if(!existingExercise){
              state.schedule[day].push(newExercise);
              localStorage.setItem("userSchedule", JSON.stringify(state.schedule));
            }
        },
        removeFromSchedule: (state, action) =>{
            const { day, exerciseId } = action.payload;
            state.schedule[day] = state.schedule[day].filter(exercise => exercise.id !== exerciseId);
            localStorage.setItem("userSchedule", JSON.stringify(state.schedule));
        },
        clearDaySchedule: (state, action) =>{
            const { day } = action.payload;
            state.schedule[day] = [];
            localStorage.setItem("userSchedule", JSON.stringify(state.schedule));
        }
    }
})

export const scheduleActions = scheduleSlice.actions;
export default scheduleSlice.reducer;
