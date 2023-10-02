import React, { ChangeEvent, useState } from 'react'
import { ACTION, AVAILABLE_ACTIONS } from '../../utils/ACTION'
import moment from 'moment'
import { ActionType } from '../../utils/interfaces'
import { dateAndTimeFormatToDateObject, dateObjectToDateFormat, dateObjectToTimeFormat } from '../../utils/dateUtils'

interface ActionFormValues {
  startDate: string
  startTime: string
  endDate?: string
  endTime?: string
  note?: string
}

interface ActionFormProps {
  action: ACTION
  existingAction: ActionType | null
  onSave: (values: ActionType) => void
  onCancel: () => void,
}

const ActionForm = ({ action, existingAction, onSave, onCancel }: ActionFormProps) => {
  const dateNow = new Date()
  const currentTime = moment(dateNow).format('h:mm A')
  const currentDate = moment(dateNow).format('DD/MM/YYYY')
  const actionInformation = AVAILABLE_ACTIONS[action]

  const existingStartDate = dateObjectToDateFormat(existingAction?.startTime)
  const existingStartTime = dateObjectToTimeFormat(existingAction?.startTime)
  const existingEndDate = dateObjectToDateFormat(existingAction?.endTime)
  const existingEndTime = dateObjectToTimeFormat(existingAction?.endTime)

  const [values, setValues] = useState<ActionFormValues>({
    startDate: existingStartDate || currentDate,
    startTime: existingStartTime || currentTime,
    endDate: existingEndDate,
    endTime: existingEndTime,
    note: existingAction?.note
  } as ActionFormValues)

  const onSetValue = (event: ChangeEvent<HTMLInputElement>, key: string) => setValues({ ...values, [key]: event.target.value })

  const onSaveAction = () => {
    if (!values.startDate || !values.startTime)
      return // todo: show error

    const actionToSave = {
      action,
      startTime: dateAndTimeFormatToDateObject(values.startDate, values.startTime),
      endTime: dateAndTimeFormatToDateObject(values.endDate, values.endTime),
      note: values.note
    } as ActionType

    onSave(actionToSave)
  }

  return (
    <div>
      <h3>{actionInformation.displayName}</h3>

      <div>
        <p>Hora Inicio: </p>
        <input
          type="text"
          onChange={e => onSetValue(e, 'startTime')}
          value={values.startTime}
        />
      </div>
      <div>
        <p>Fecha Inicio: </p>
        <input
          type="text"
          onChange={e => onSetValue(e, 'startDate')}
          value={values.startDate}
        />
      </div>
      {
        actionInformation.needsEndTime &&
        <>
          <div>
            <p>Hora Fin: </p>
            <input
              type="text"
              onChange={e => onSetValue(e, 'endTime')}
              value={values.endTime}
            />
          </div>
          <div>
            <p>Fecha Fin: </p>
            <input
              type="text"
              onChange={e => onSetValue(e, 'endDate')}
              value={values.endDate}
            />
          </div>
        </>
      }
      <button onClick={onSaveAction}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  )
}

export default ActionForm
