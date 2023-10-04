import React, { useEffect, useState } from 'react'
import { ActionType } from '../../utils/interfaces'
import moment from 'moment'
import ActionItem from '../../components/actionItem'
// @ts-ignore
import Modal from 'react-modal'

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { ACTION, AVAILABLE_ACTIONS } from '../../utils/ACTION'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARTY_COLOR } from '../../constants'

import './DiaryItems.scss'
import ActionForm from '../../components/actionForm'
import { createAction, getActionsByDate } from '../../utils/apiUtils'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
// @ts-ignore
import { sortBy } from 'lodash'
import SelectComponent from '../../components/selectComponent'
import { DATE_FORMAT } from '../../utils/dateUtils'

const buttonPositionStyle = { bottom: 100, margin: 5, right: 25, zIndex: 0 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR, zIndex: 0 }
const modalStyle = {
  content: {
    borderRadius: 10,
    backgroundColor: SECONDARY_COLOR,
    height: 'fit-content',
  },
};

const DiaryItems = () => {
  const [items, setItems] = useState<ActionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [actionToCreate, setActionToCreate] = useState<ACTION | null>(null)
  const [selectedDay, setSelectedDay] = useState<string>(moment().format(DATE_FORMAT))

  const getItems = async () => {
    setIsLoading(true)
    const {Items: actions}: {Items: ActionType[]} = await getActionsByDate('01-10-2023')
    setIsLoading(false)
    setItems(sortBy(actions, ['startTime']))
  }

  useEffect(() => {
    void getItems()
  }, [])

  const onClearAction = () => setActionToCreate(null)

  const onSaveAction = async (values: ActionType) => {
    await createAction({ actionId: uuidv4(), ...values })
    onClearAction()
    void getItems()
  }

  return (
    <>
      <div className={'day-selection'}>
        <SelectComponent
          value={{ value: selectedDay, label: selectedDay }}
          options={[{ value: moment().format(DATE_FORMAT), label: moment().format(DATE_FORMAT) }]}
          onSetValue={setSelectedDay}
        />
      </div>
      {isLoading ? (
        <h4>Cargando...</h4>
      ) : (
        items.length > 0 ? (
          <div className={'actions-list'}>
            {
              items.map(item => <ActionItem key={item.actionId} item={item}/>)
            }
          </div>
        ) : (
          <h4>No hay acciones aun</h4>
        )
      )}

      <Fab icon={'+'} style={buttonPositionStyle} mainButtonStyles={buttonStyle} >
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
        ariaHideApp={false}
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
