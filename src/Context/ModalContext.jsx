import React, { createContext, useState } from 'react'

const ModalContext = createContext({
    scheduleIsOpen: false,
    selectedExercise: null,
    insuranceIsOpen: false,
    scheduledId: null,
    showSchedule: () =>{},
    hideSchedule: () =>{},
    showInsurance: () =>{},
    hideInsurance: () =>{}
})

export const ModalContextProvider = ({children}) => {
    const [isOpenSchduleModal, setIsOpenedScheduleModal] = useState(false);
    const [isOpenInsuranceModal, setIsOpenedInsuranceModal] = useState(false);
    const [scheduledExerciseId, setScheduledExerciseId] = useState(null);
    const [exercise, setExercise] = useState(null);

    const showScheduleModal = (exercise) =>{
        setIsOpenedScheduleModal(true);
        setExercise(exercise);
    }

    const hideScheduleModal = () =>{
        setIsOpenedScheduleModal(false);
        setExercise(null);
    }

    const showInsuranceModal = (scheduledExerciseId = undefined) =>{
        setIsOpenedInsuranceModal(true);
        if(scheduledExerciseId){
          setScheduledExerciseId(scheduledExerciseId);  
        }
    }

    const hideInsuranceModal = () =>{
        setIsOpenedInsuranceModal(false);
        setScheduledExerciseId(null);
    }

    const ModalContextValue = ({
        scheduleIsOpen: isOpenSchduleModal,
        selectedExercise: exercise,
        scheduledId: scheduledExerciseId,
        insuranceIsOpen: isOpenInsuranceModal,
        showSchedule: showScheduleModal,
        hideSchedule: hideScheduleModal,
        showInsurance: showInsuranceModal,
        hideInsurance: hideInsuranceModal
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
