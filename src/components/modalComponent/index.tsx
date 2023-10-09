import React from 'react'
import { SECONDARY_COLOR } from '../../constants'
// @ts-ignore
import Modal from 'react-modal'

const modalStyle = {
  content: {
    borderRadius: 10,
    color: 'white',
    backgroundColor: SECONDARY_COLOR,
    height: 'fit-content',
  },
};

interface ModalComponentProps {
  body: any
  isOpen: boolean
}

const ModalComponent = ({ isOpen, body }: ModalComponentProps) => (
  <Modal
    isOpen={isOpen}
    style={modalStyle}
    ariaHideApp={false}
  >
    {body}
  </Modal>
)

export default ModalComponent
