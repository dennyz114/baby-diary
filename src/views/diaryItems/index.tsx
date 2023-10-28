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
import { orderBy } from 'lodash'
import SelectComponent from '../../components/selectComponent'
import { DATE_DASH_FORMAT, getDateDashFormatString, getDatesUntilNowSince } from '../../utils/dateUtils'
import { BABY_BIRTHDAY } from '../../utils/constants'
import ModalComponent from '../../components/modalComponent'

const buttonPositionStyle = { bottom: 100, margin: 5, right: 25, zIndex: 0 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR, zIndex: 0, fontSize: 50 }
const ACTION_OPTION_FILTER_ALL = {value: 'ALL', label: 'Todas'}

const datesSinceBirthDay = getDatesUntilNowSince(BABY_BIRTHDAY)
const datesOptions = datesSinceBirthDay.map((date, index) =>
  ({ value: getDateDashFormatString(date), label: index === 0 ? '----Hoy----' : getDateDashFormatString(date) })
)
const actionsOptions = [
  ACTION_OPTION_FILTER_ALL,
  ...Object.values(AVAILABLE_ACTIONS).map(action => ({
    value: action.id,
    label: action.displayName
  }))
]

const DiaryItems = () => {
  const today = moment().format(DATE_DASH_FORMAT)
  const [items, setItems] = useState<ActionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [actionToCreate, setActionToCreate] = useState<ACTION | null>(null)
  const [selectedFilterDay, setSelectedFilterDay] = useState<string>(today)
  const [selectedFilterAction, setSelectedFilterAction] = useState<string>(ACTION_OPTION_FILTER_ALL.value)
  const [actionToEdit, setActionToEdit] = useState<ActionType | null>(null)
  const [actionToDelete, setActionToDelete] = useState<string | null>(null)

  const getItems = async (selectedDate: string) => {
    setIsLoading(true)
    const {Items: actions}: {Items: ActionType[]} = await getActionsByDate(selectedDate)
    setIsLoading(false)
    setItems(orderBy(actions, 'startTime', 'desc'))
  }

  useEffect(() => {
    const clearState = () => {
      if (!document.hidden) {
        setSelectedFilterDay(today)
        void getItems(today)
      }
    }
    document.addEventListener("visibilitychange", clearState);

    return () => document.removeEventListener("visibilitychange", clearState);
  }, [])

  useEffect(() => {
    void getItems(selectedFilterDay)
  }, [selectedFilterDay])

  const onCancelAction = () => {
    setActionToCreate(null)
    setActionToEdit(null)
    setActionToDelete(null)
  }

  const onSaveAction = async (values: ActionType) => {
    await saveAction({ ...values, actionId: values.actionId || uuidv4() })
    onCancelAction()
    void getItems(selectedFilterDay)
  }

  const onDeleteAction = async () => {
    if (!actionToDelete) return
    setIsDeleting(true)
    await deleteAction(actionToDelete)
    setIsDeleting(false)
    setActionToDelete(null)
    void getItems(selectedFilterDay)
  }

  const onSelectFilterDay = (selectedDay: string) => {
    setSelectedFilterDay(selectedDay)
    setSelectedFilterAction(ACTION_OPTION_FILTER_ALL.value)
  }

  const action = actionToCreate || actionToEdit?.action

  const filteredItems = items.filter(item => {
    if (selectedFilterAction === ACTION_OPTION_FILTER_ALL.value) return true
    return item.action === selectedFilterAction
  })

  return (
    <>
      <div className={'action-filters'}>
        <SelectComponent
          value={{ value: selectedFilterDay, label: selectedFilterDay === today ? '----Hoy----' : selectedFilterDay }}
          options={datesOptions}
          onSetValue={onSelectFilterDay}
        />
        <SelectComponent
          value={actionsOptions.find(action => action.value === selectedFilterAction)}
          options={actionsOptions}
          onSetValue={setSelectedFilterAction}
        />
      </div>
      {isLoading ? (
        <h4>Cargando...</h4>
      ) : (
        filteredItems.length > 0 ? (
          <div className={'actions-list'}>
            {
              filteredItems.map(item => (
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
            <button className={'button'} onClick={onDeleteAction} disabled={isDeleting}>{isDeleting ? 'Eliminando...' : 'Eliminar'}</button>
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
