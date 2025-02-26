import React, { createContext, useState } from 'react'

const ModalContext = createContext({
    scheduleIsOpen: false,
    showSchedule: () =>{},
    hideSchedule: () =>{}
})

export const ModalContextProvider = ({children}) => {
    const [isOpenSchduleModal, setIsOpenedScheduleModal] = useState(false);

    const showScheduleModal = () =>{
        setIsOpenedScheduleModal(true);
    }

    const hideScheduleModal = () =>{
        setIsOpenedScheduleModal(false);
    }

    const ModalContextValue = ({
        scheduleIsOpen: isOpenSchduleModal,
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
