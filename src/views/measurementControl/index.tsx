import React, { useEffect, useState } from 'react'
import './MeasurementControl.scss'
import { MeasurementItemType } from '../../utils/interfaces'
import { getDateDashFormatString } from '../../utils/dateUtils'
import Table from '../../components/table'
// @ts-ignore
import {times} from 'lodash'
import { PRIMARY_COLOR, TERTIARTY_COLOR } from '../../styleConstants'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import ModalComponent from '../../components/modalComponent'
import DeleteConfirmationModal from '../../components/modalComponent/DeleteConfirmationModal'
import MeasurementForm from '../../components/forms/measurementForm'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { FabButton } from '../../components/fabButton'

// todo: extract to constants
const buttonPositionStyle = { bottom: 100, margin: 5, right: 25, zIndex: 0 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR, zIndex: 0, fontSize: 50 }

// todo: replace with real apis
const getMeasurementDataFakeApi = async (): Promise<{Items: MeasurementItemType[]}> => {

  const data = times(30, () => ({
    createDate: '2023-12-16T08:34:40.124Z',
    date: '2023-12-16T08:34:40.124Z',
    height: '700',
    weight: '12.200',
    headCircumference: '54',
  })) as unknown as MeasurementItemType[]

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ Items: data })
    }, 100)
  })
}

const deleteMeasurementItemFakeApi = async (itemId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

const saveItemFakeApi = async (item: MeasurementItemType): Promise<void> => {
  console.log('SAVE item!!!: ', item)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}
// todo: replace with real apis

const tableStructure = [
  {header: 'Fecha', render: (item: MeasurementItemType) => getDateDashFormatString(item.date)},
  {header: 'Peso (kg)', render: (item: MeasurementItemType) => parseFloat(item.weight)},
  {header: 'Talla (cm)', render: (item: MeasurementItemType) => parseFloat(item.height)},
  {header: 'Circ. Cabeza (cm)', render: (item: MeasurementItemType) => parseFloat(item.headCircumference)}
]

const MeasurementControl = () => {
  const [measurementItems, setMeasurementItems] = useState<MeasurementItemType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [itemToEdit, setItemToEdit] = useState<MeasurementItemType | null>(null)
  const [itemToDelete, setItemToDelete] = useState<MeasurementItemType | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [createItem, setCreateItem] = useState(false)

  const getMeasurementData = async () => {
    setIsLoading(true)
    const { Items: measurementData } : { Items: MeasurementItemType[]} = await getMeasurementDataFakeApi()
    setIsLoading(false)
    setMeasurementItems(measurementData)
  }

  useEffect(() => {
    void getMeasurementData()
  }, [])


  const onEdit = (item: MeasurementItemType) => setItemToEdit(item)

  const onDelete = (item: MeasurementItemType) => setItemToDelete(item)

  const onCancel = () => {
    setItemToEdit(null)
    setItemToDelete(null)
    setCreateItem(false)
  }

  const onSaveItem = async (values: MeasurementItemType) => {
    await saveItemFakeApi({ ...values, measurementItemId: values.measurementItemId || uuidv4() })
    onCancel()
    void getMeasurementData()
  }

  const onDeleteItem = async () => {
    setIsDeleting(true)
    await deleteMeasurementItemFakeApi(itemToDelete!.measurementItemId!)
    setIsDeleting(false)
  }


  return (
    <div className={'measurement-control'}>

      <h3>Control de talla y peso</h3>

      {isLoading && <h4>Cargando...</h4>}

      {!isLoading && measurementItems.length === 0 && <h4>No hay datos de talla y peso</h4>}

      {!isLoading && measurementItems.length > 0 &&
        <Table
          items={measurementItems}
          tableStructure={tableStructure}
          actions={[
            { onClick: (item: any) => onEdit(item), icon: <FaRegEdit size={20}/> },
            { onClick: (item: any) => onDelete(item), icon: <FaRegTrashAlt size={20}/> }
          ]}
        />
      }

      <FabButton
        icon={'+'}
        style={buttonPositionStyle}
        mainButtonStyles={buttonStyle}
        onClick={() => setCreateItem(true)}
      />

      <DeleteConfirmationModal
        isDeleting={isDeleting}
        isOpen={!!itemToDelete}
        onDeleteAction={onDeleteItem}
        onCancelAction={onCancel}
      />

      <ModalComponent
        body={
          <MeasurementForm
            existingItem={itemToEdit}
            onSave={onSaveItem}
            onCancel={onCancel}
          />
        }
        isOpen={createItem || !!itemToEdit}
      />
    </div>
  )
}

export default MeasurementControl
