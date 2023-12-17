import React, { useState } from 'react'
//@ts-ignore
import InputMask from 'react-input-mask'
import { MeasurementItemType } from '../../utils/interfaces'
import { dateAndTimeFormatToDateObject, destructureDateObject } from '../../utils/dateUtils'

interface MeasurementFormValues {
  weight: string
  height: string
  headCircumference: string
  date: string
}

interface MeasurementFormProps {
  existingItem: MeasurementItemType | null
  onSave: (values: MeasurementItemType) =>  Promise<void>
  onCancel: () => void,
}

const MeasurementForm = ({ existingItem, onSave, onCancel}: MeasurementFormProps) => {
  const dateNow = new Date()
  const [currentDate] = destructureDateObject(dateNow)
  const [existingDate] = destructureDateObject(existingItem?.date)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [values, setValues] = useState<MeasurementFormValues>({
    weight: existingItem?.weight ? existingItem.weight + '' : '',
    height: existingItem?.height ? existingItem.height + '' : '',
    headCircumference: existingItem?.headCircumference ? existingItem.headCircumference + '' : '',
    date: existingDate || currentDate!,
  })

  const onSetTextValue = (event: {target : {value: string}}, key: string) => onSetValue(event.target.value, key)

  const onSetValue = (value: string, key: string) => setValues({ ...values, [key]: value })

  const onSaveAction = async () => {
    console.log('values!!!: ', values)
    setError(null)
    if (!values.weight || !values.height || !values.headCircumference || !values.date) {
      setError('Falta completar los datos ps causita')
      return
    }
    const dateTime = dateAndTimeFormatToDateObject(values.date, '00', 'am')
    // @ts-ignore
    if (dateTime && isNaN(dateTime)) {
      setError('Pon una fecha y hora de inicio válida')
      return
    }

    const itemToSave = {
      measurementItemId: existingItem?.measurementItemId || undefined,
      weight: values.weight,
      height: values.height,
      headCircumference: values.headCircumference,
      date: dateTime
    } as MeasurementItemType

    setIsSaving(true)
    await onSave(itemToSave)
    setIsSaving(false)
  }

  return (
    <div className={'form-wrapper'}>
      <h3 className={'form-title'}>Peso y talla</h3>

      {error && <p className={'error-message'}>{error}</p>}

      <div className={'form-section'}>
        <p>Peso (kg): </p>
        <div className={'form-inputs'}>
          <InputMask
            className={'text-input'}
            mask="99.999"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'weight')}
            value={values.weight}
          />
        </div>
      </div>

      <div className={'form-section'}>
        <p>Talla (cm): </p>
        <div className={'form-inputs'}>
          <InputMask
            className={'text-input'}
            mask="999"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'height')}
            value={values.height}
          />
        </div>
      </div>

      <div className={'form-section'}>
        <p>Circ. Cabeza (cm): </p>
        <div className={'form-inputs'}>
          <InputMask
            className={'text-input'}
            mask="99"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'headCircumference')}
            value={values.headCircumference}
          />
        </div>
      </div>

      <div className={'form-section'}>
        <p>Fecha: </p>
        <div className={'form-inputs'}>
          <InputMask
            className={'text-input'}
            mask="99-99-9999"
            onChange={(e: { target: { value: string } }) => onSetTextValue(e, 'date')}
            value={values.date}
            placeholder={'DD-MM-YYYY'}
          />
        </div>
      </div>

      <div className={'form-footer'}>
        <button className={'button'} onClick={onSaveAction} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar'}</button>
        <button className={'button'} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

export default MeasurementForm
