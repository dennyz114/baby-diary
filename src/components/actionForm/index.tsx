import React, { useState } from 'react'
import { ACTION, AVAILABLE_ACTIONS } from '../../utils/ACTION'
import { ActionType } from '../../utils/interfaces'
import {
  dateAndTimeFormatToDateObject,
  destructureDateObject
} from '../../utils/dateUtils'
import SelectComponent from '../selectComponent'
import './ActionForm.scss'
//@ts-ignore
import InputMask from 'react-input-mask'

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
  onSave: (values: ActionType) =>  Promise<void>
  onCancel: () => void,
}

const AM_OR_PM_OPTIONS = [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]

const ActionForm = ({ action, existingAction, onSave, onCancel }: ActionFormProps) => {
  const { needsEndTime, displayName } = AVAILABLE_ACTIONS[action]
  const dateNow = new Date()
  const [currentDate, currentTime, currentAmOrPm] = destructureDateObject(dateNow)
  const [existingStartDate, existingStartTime, existingStartAmOrPm] = destructureDateObject(existingAction?.startTime)
  const [existingEndDate, existingEndTime, existingEndAmOrPm] = destructureDateObject(existingAction?.endTime)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [values, setValues] = useState<ActionFormValues>({
    startDate: existingStartDate || currentDate,
    startTime: existingStartTime || currentTime,
    startAmOrPm: existingStartAmOrPm || currentAmOrPm,
    endDate: existingEndDate ? existingEndDate : needsEndTime && existingAction ? currentDate : undefined,
    endTime: existingEndTime ? existingEndTime : needsEndTime && existingAction ? currentTime : undefined,
    endAmOrPm: existingEndAmOrPm ? existingEndAmOrPm : needsEndTime && existingAction ? currentAmOrPm : undefined,
    note: existingAction?.note
  } as ActionFormValues)

  const onSetTextValue = (event: {target : {value: string}}, key: string) => onSetValue(event.target.value, key)

  const onSetValue = (value: string, key: string) => setValues({ ...values, [key]: value })


  const onSaveAction = async () => {
    setError(null)
    if (!values.startDate || !values.startTime) {
      setError('Falta fecha y hora de inicio pe causita')
      return
    }
    const startTime = dateAndTimeFormatToDateObject(values.startDate, values.startTime, values.startAmOrPm)
    const endTime = dateAndTimeFormatToDateObject(values.endDate, values.endTime, values.endAmOrPm)
    // @ts-ignore
    if (startTime && isNaN(startTime)) {
      setError('Pon una fecha y hora de inicio válida')
      return
    }
    // @ts-ignore
    if (endTime && isNaN(endTime)) {
      setError('Pon una fecha y hora de fin válida')
      return
    }

    const actionToSave = {
      actionId: existingAction?.actionId || undefined,
      action,
      startTime,
      endTime: needsEndTime ? endTime : startTime,
      note: values.note,
      startDate: values.startDate,
      createDate: new Date()
    } as ActionType

    setIsSaving(true)
    await onSave(actionToSave)
    setIsSaving(false)
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
          <InputMask
            className={'text-input'}
            mask="99/99/9999"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'endDate')}
            value={values.endDate}
            placeholder={'DD/MM/YYYY'}
          />
        </div>
      </div>
    </>
  )

  return (
    <div className={'action-form'}>
      <h3 className={'action-form-title'}>{displayName}</h3>

      {error && <p className={'error-message'}>{error}</p>}

      <div className={'form-section'}>
        <p>Hora Inicio: </p>
        <div className={'form-inputs'}>
          <InputMask
            className={'time-input text-input'}
            mask="99:99"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'startTime')}
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
          <InputMask
            className={'text-input'}
            mask="99/99/9999"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'startDate')}
            value={values.startDate}
            placeholder={'DD/MM/YYYY'}
          />
        </div>
      </div>
      {needsEndTime && endTimeInputs}
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
        <button className={'button'} onClick={onSaveAction} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar'}</button>
        <button className={'button'} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

export default ActionForm
