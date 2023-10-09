import React, { useEffect, useState } from 'react'
import { ActionType } from '../../utils/interfaces'
import moment from 'moment'
import ActionItem from '../../components/actionItem'

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { ACTION, AVAILABLE_ACTIONS } from '../../utils/ACTION'
import { PRIMARY_COLOR, TERTIARTY_COLOR } from '../../constants'

import './DiaryItems.scss'
import ActionForm from '../../components/actionForm'
import { getActionsByDate, saveAction, deleteAction } from '../../utils/apiUtils'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
// @ts-ignore
import { sortBy } from 'lodash'
import SelectComponent from '../../components/selectComponent'
import { DATE_FORMAT, getDateString, getDatesUntilNowSince } from '../../utils/dateUtils'
import { BABY_BIRTHDAY } from '../../utils/constants'
import ModalComponent from '../../components/modalComponent'

const buttonPositionStyle = { bottom: 100, margin: 5, right: 25, zIndex: 0 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR, zIndex: 0, fontSize: 50 }


const datesSinceBirthDay = getDatesUntilNowSince(BABY_BIRTHDAY)
const datesOptions = datesSinceBirthDay.map(date => ({ value: getDateString(date), label: getDateString(date) }))

const DiaryItems = () => {
  const [items, setItems] = useState<ActionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [actionToCreate, setActionToCreate] = useState<ACTION | null>(null)
  const [selectedDay, setSelectedDay] = useState<string>(moment().format(DATE_FORMAT))
  const [actionToEdit, setActionToEdit] = useState<ActionType | null>(null)
  const [actionToDelete, setActionToDelete] = useState<string | null>(null)

  const getItems = async () => {
    setIsLoading(true)
    const {Items: actions}: {Items: ActionType[]} = await getActionsByDate('01-10-2023')
    setIsLoading(false)
    setItems(sortBy(actions, ['startTime']))
  }

  useEffect(() => {
    void getItems()
  }, [])

  const onCancelAction = () => {
    setActionToCreate(null)
    setActionToEdit(null)
    setActionToDelete(null)
  }

  const onSaveAction = async (values: ActionType) => {
    await saveAction({ ...values, actionId: values.actionId || uuidv4() })
    onCancelAction()
    void getItems()
  }

  const onDeleteAction = async () => {
    if (!actionToDelete) return
    await deleteAction(actionToDelete)
    setActionToDelete(null)
    void getItems()
  }

  const action = actionToCreate || actionToEdit?.action

  return (
    <>
      <div className={'day-selection'}>
        <SelectComponent
          value={{ value: selectedDay, label: selectedDay }}
          options={datesOptions}
          onSetValue={setSelectedDay}
        />
      </div>
      {isLoading ? (
        <h4>Cargando...</h4>
      ) : (
        items.length > 0 ? (
          <div className={'actions-list'}>
            {
              items.map(item => (
                <ActionItem
                  key={item.actionId}
                  item={item}
                  onEdit={() => setActionToEdit(item)}
                  onDelete={() => setActionToDelete(item!.actionId!)}
                />
              ))
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

      <ModalComponent
        body={
          <div>
            <h3>¿Estas seguro que quieres borrar esta accion?</h3>
            <button className={'button'} onClick={onDeleteAction}>Eliminar</button>
            <button className={'button'} onClick={onCancelAction}>Cancelar</button>
          </div>
        }
        isOpen={!!actionToDelete}
      />

      <ModalComponent
        body={
          action ?
            <ActionForm
              action={action}
              onSave={onSaveAction}
              onCancel={onCancelAction}
              existingAction={actionToEdit}
            /> : null
        }
        isOpen={!!action}
      />
    </>
  )
}

export default DiaryItems
