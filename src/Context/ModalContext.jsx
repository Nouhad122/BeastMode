import React, { createContext, useState } from 'react'

const ModalContext = createContext({
    scheduleOpen: false,
    showSchedule: () =>{},
    hideSchedule: () =>{}
})

export const ModalContextProvider = ({children}) => {
    const [isOpenSchduleModal, setIsOpenedScheduleModal] = useState(false);

    const showScheduleModal = () =>{
        setIsOpenedScheduleModal(true);
    }

    const hideScheduleModal = () =>{
        setIsOpenedScheduleModal(true);
    }

    const ModalContextValue = ({
        scheduleOpen: isOpenSchduleModal,
        showSchedule: showScheduleModal,
        hideSchedule: hideScheduleModal
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
