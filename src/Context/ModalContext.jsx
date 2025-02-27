import React, { createContext, useState } from 'react'

const ModalContext = createContext({
    scheduleIsOpen: false,
    selectedExercise: null,
    showSchedule: () =>{},
    hideSchedule: () =>{}
})

export const ModalContextProvider = ({children}) => {
    const [isOpenSchduleModal, setIsOpenedScheduleModal] = useState(false);
    const [exercise, setExercise] = useState(null);

    const showScheduleModal = (exercise) =>{
        setIsOpenedScheduleModal(true);
        setExercise(exercise);
    }

    const hideScheduleModal = () =>{
        setIsOpenedScheduleModal(false);
        setExercise(null);
    }

    const ModalContextValue = ({
        scheduleIsOpen: isOpenSchduleModal,
        selectedExercise: exercise,
        showSchedule: showScheduleModal,
        hideSchedule: hideScheduleModal,
    })
    return (
        <div>
        <ModalContext.Provider value={ModalContextValue}>
            {children}
        </ModalContext.Provider>
        </div>
    )
}

export default ModalContext
