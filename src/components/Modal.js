import React from 'react'
import Modal from 'react-modal';
function AppModal({isOpen, label, children}) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');
  return (
    <>
      <Modal
        isOpen={isOpen}
        label="New Url"
        ariaHideApp={true}
        style={customStyles}
        contentLabel={label}
      >
      {children}
      </Modal>
      </>
  )
}

export default AppModal
