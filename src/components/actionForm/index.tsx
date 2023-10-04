import React, { useState } from 'react'
import { ACTION, AVAILABLE_ACTIONS } from '../../utils/ACTION'
import { ActionType } from '../../utils/interfaces'
import {
  dateAndTimeFormatToDateObject,
  destructureDateObject
} from '../../utils/dateUtils'
import SelectComponent from '../selectComponent'
import './ActionForm.scss'

interface ActionFormValues {
  startDate: string
  startTime: string
  startAmOrPm: string
  endDate?: string
  endTime?: string
  endAmOrPm?: string
  note?: string
}

interface ActionFormProps {
  action: ACTION
  existingAction: ActionType | null
  onSave: (values: ActionType) => void
  onCancel: () => void,
}

const AM_OR_PM_OPTIONS = [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]

const ActionForm = ({ action, existingAction, onSave, onCancel }: ActionFormProps) => {
  const actionInformation = AVAILABLE_ACTIONS[action]
  const dateNow = new Date()
  const [currentDate, currentTime, currentAmOrPm] = destructureDateObject(dateNow)
  const [existingStartDate, existingStartTime, existingStartAmOrPm] = destructureDateObject(existingAction?.startTime)
  const [existingEndDate, existingEndTime, existingEndAmOrPm] = destructureDateObject(existingAction?.startTime)

  const [values, setValues] = useState<ActionFormValues>({
    startDate: existingStartDate || currentDate,
    startTime: existingStartTime || currentTime,
    startAmOrPm: existingStartAmOrPm || currentAmOrPm,
    endDate: existingEndDate,
    endTime: existingEndTime,
    endAmOrPm: existingEndAmOrPm,
    note: existingAction?.note
  } as ActionFormValues)

  const onSetTextValue = (event: {target : {value: string}}, key: string) => onSetValue(event.target.value, key)

  const onSetValue = (value: string, key: string) => setValues({ ...values, [key]: value })


  const onSaveAction = () => {
    if (!values.startDate || !values.startTime)
      return // todo: show error

    const actionToSave = {
      action,
      startTime: dateAndTimeFormatToDateObject(values.startDate, values.startTime, values.startAmOrPm),
      endTime: dateAndTimeFormatToDateObject(values.endDate, values.endTime, values.endAmOrPm),
      createDate: new Date(),
      note: values.note
    } as ActionType

    onSave(actionToSave)
  }

  const endTimeInputs = (
    <>
      <div className={'form-section'}>
        <p>Hora Fin: </p>
        <div className={'form-inputs'}>
          <input
            className={'time-input text-input'}
            type="text"
            onChange={e => onSetTextValue(e, 'endTime')}
            value={values.endTime}
          />
          <SelectComponent
            value={values.endAmOrPm ? { value: values.endAmOrPm, label: values.endAmOrPm } : undefined}
            //@ts-ignore
            onSetValue={selectedOption => selectedOption ? onSetValue(selectedOption.value!, 'endAmOrPm') : null}
            options={AM_OR_PM_OPTIONS}
          />
        </div>
      </div>
      <div className={'form-section'}>
        <p>Fecha Fin: </p>
        <div className={'form-inputs'}>
          <input
            className={'text-input'}
            type="text"
            onChange={e => onSetTextValue(e, 'endDate')}
            value={values.endDate}
          />
        </div>
      </div>
    </>
  )

  return (
    <div className={'action-form'}>
      <h3 className={'action-form-title'}>{actionInformation.displayName}</h3>

      <div className={'form-section'}>
        <p>Hora Inicio: </p>
        <div className={'form-inputs'}>
          <input
            className={'time-input text-input'}
            type="text"
            onChange={e => onSetTextValue(e, 'startTime')}
            value={values.startTime}
          />
          <SelectComponent
            value={values.startAmOrPm ? { value: values.startAmOrPm, label: values.startAmOrPm } : undefined}
            // @ts-ignore
            onSetValue={selectedOption => selectedOption ? onSetValue(selectedOption!.value, 'startAmOrPm') : null}
            options={AM_OR_PM_OPTIONS}
          />
        </div>
      </div>
      <div className={'form-section'}>
        <p>Fecha Inicio: </p>
        <div className={'form-inputs'}>
          <input
            className={'text-input'}
            type="text"
            onChange={e => onSetTextValue(e, 'startDate')}
            value={values.startDate}
          />
        </div>
      </div>
      {actionInformation.needsEndTime && endTimeInputs}
      <div className={'form-section'}>
        <p>Nota: </p>
        <div className={'form-inputs'}>
          <textarea
            className={'text-input'}
            rows={3}
            style={{ resize: 'none' }}
            onChange={e => onSetTextValue(e, 'note')}
            value={values.note}
          />
        </div>
      </div>
      <div className={'action-form-footer'}>
        <button className={'button'} onClick={onSaveAction}>Guardar</button>
        <button className={'button'} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

export default ActionForm
