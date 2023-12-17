import React from 'react'
import ModalComponent from './index'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  isDeleting: boolean
  onDeleteAction: () => void
  onCancelAction: () => void
}

const DeleteConfirmationModal = ({isDeleting, isOpen, onDeleteAction, onCancelAction}: DeleteConfirmationModalProps) => {
  return (
    <ModalComponent
      body={
        <div>
          <h3>¿Estas seguro que quieres borrar este registro?</h3>
          <button className={'button'} onClick={onDeleteAction} disabled={isDeleting}>{isDeleting ? 'Eliminando...' : 'Eliminar'}</button>
          <button className={'button'} onClick={onCancelAction}>Cancelar</button>
        </div>
      }
      isOpen={isOpen}
    />
  )
}

export default DeleteConfirmationModal
