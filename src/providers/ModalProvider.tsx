import React, {useState} from 'react';
import {ModalContextInterface, ModalDataInterface} from 'elements/Modal/Modal';

interface Props {
    children: JSX.Element | Array<JSX.Element>
}

function ModalProvider(props: Props) {   
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState<ModalDataInterface>({header: 'Success', content: <div></div>});

    function toggleModal() {
        setModalVisible(!modalVisible);
    }

    function hideModal() {
        setModalVisible(false);
    }

    function showModal() {
        setModalVisible(true);
    }

    const state = {
        modalVisible: modalVisible,
        toggleModal: toggleModal,
        modalData: modalData,
        setModalData: setModalData,
        hideModal: hideModal,
        showModal: showModal
    }

    return (
        <ModalContext.Provider value={state}>
            {props.children}
        </ModalContext.Provider>
    )
}

export const ModalContext = React.createContext<ModalContextInterface>(null!);
export default ModalProvider;