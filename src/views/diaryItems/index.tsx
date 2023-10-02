import React, { useEffect, useState } from 'react'
import { ActionType } from '../../utils/interfaces'
import moment from 'moment'
import ActionItem from '../../components/actionItem'
// @ts-ignore
import Modal from 'react-modal'

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { ACTION, AVAILABLE_ACTIONS } from '../../utils/ACTION'
import { PRIMARY_COLOR, TERTIARTY_COLOR } from '../../constants'

import './DiaryItems.scss'
import ActionForm from '../../components/actionForm'
import { getActionsByDate } from '../../utils/apiUtils'

const buttonPositionStyle = { bottom: 100, margin: 5, right: 25 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR }
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const DiaryItems = () => {
  const [items, setItems] = useState<ActionType[]>([])
  const [actionToCreate, setActionToCreate] = useState<ACTION | null>(null)

  const getItems = async () => {
    const actions = await getActionsByDate('01-10-2023')
    setItems(actions)
  }

  useEffect(() => {
    void getItems()
  }, [])

  const onClearAction = () => setActionToCreate(null)

  const onSaveAction = (values: any) => {
    console.log('values!!!: ', values)
    onClearAction()
    void getItems()
  }

  return (
    <>
      <h3>{moment(new Date()).format('DD/MM/YYYY')}</h3>
      {
        items.length > 0 ? (
          <div className={'actions-list'}>
            {
              items.map((item, index) => <ActionItem key={index} item={item}/>)
            }
          </div>
        ) : (
          <h4>No hay acciones aun</h4>
        )
      }

      <Fab icon={'+'} style={buttonPositionStyle} mainButtonStyles={buttonStyle}>
        {
          Object.values(AVAILABLE_ACTIONS).map((action) => (
            <Action
              key={action.displayName}
              text={action.displayName}
              onClick={() => setActionToCreate(action.id)}
              style={buttonStyle}
            >
              {action.icon}
            </Action>
          ))
        }
      </Fab>

      <Modal
        isOpen={!!actionToCreate}
        style={modalStyle}
        contentLabel="Agregar accion"
      >
        {
          actionToCreate &&
          <ActionForm
            action={actionToCreate}
            onSave={onSaveAction}
            onCancel={onClearAction}
            existingAction={null}
          />
        }
      </Modal>
    </>
  )
}

export default DiaryItems
