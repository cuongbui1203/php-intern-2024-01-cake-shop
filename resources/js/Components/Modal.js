import React, { useContext, useState } from 'react';
import { Modal as AntdModal } from 'antd';
import { useTranslation } from 'react-i18next';

const ModalContext = React.createContext();

function Modal({
    title,
    width,
    onOk = () => {},
    onCancel = () => {},
    footer = null,
    children
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        onOk();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        onCancel();
        setIsModalOpen(false);
    };
    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                handleCancel,
                handleOk,
                footer,
                width,
                title
            }}
        >
            <div>{children}</div>
        </ModalContext.Provider>
    );
}
const Trigger = ({ children }) => {
    const { setIsModalOpen } = useContext(ModalContext);
    return (
        <>
            <div onClick={() => setIsModalOpen(true)} className="w-fit">
                {children}
            </div>
        </>
    );
};

const Content = ({ children }) => {
    const { isModalOpen, handleCancel, handleOk, footer, width, title } =
        useContext(ModalContext);
    const [t] = useTranslation();
    return (
        <AntdModal
            title={title}
            width={width}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                footer == null ? (
                    <>
                        <button
                            className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={handleOk}
                        >
                            {t('ok')}
                        </button>
                        <button
                            className="px-4 py-2 mx-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                            onClick={handleCancel}
                        >
                            {t('Cancel')}
                        </button>
                    </>
                ) : (
                    footer
                )
            }
        >
            {children}
        </AntdModal>
    );
};

Modal.Trigger = Trigger;
Modal.Content = Content;

export default Modal;
