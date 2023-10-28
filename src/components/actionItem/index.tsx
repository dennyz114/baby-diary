import { ActionType } from '../../utils/interfaces'
import { AVAILABLE_ACTIONS } from '../../utils/ACTION'
import moment from 'moment/moment'
import React from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

import './ActionItem.scss'
import { getStringDateFullFormat } from '../../utils/dateUtils'
import BlinkingDot from '../blinkingDot'

interface ActionItemProps {
  item: ActionType
  onEdit: () => void
  onDelete: () => void
}

const ActionItem = ({ item, onEdit, onDelete }: ActionItemProps) => {
  const actionInformation = AVAILABLE_ACTIONS[item.action]

  const endTimeComponent = () => {
    if (!actionInformation.needsEndTime)
      return null
    if (!item.endTime)
      return [' → ', <BlinkingDot/>]

    const duration = moment.duration(moment(item.endTime).diff(moment(item.startTime)))
    const minutes = duration.asMinutes()
    return [' → ' + moment(item.endTime).format('h:mm A'), <div className={'time-badge'}>{minutes} min</div>]
  }

  return (
    <div className={'diary-item-container'}>
      <div className={'icon-section'}>
        {actionInformation.icon}
      </div>
      <div className={'body-section'}>
        <p className={'action-title'}>{actionInformation.displayName}</p>
        <p className={'action-time'}>
          {'Hora: ' + moment(item.startTime).format('h:mm A')}
          {endTimeComponent()}
        </p>
        {item.note && <p className={'action-note'}>Nota: {item.note}</p>}
        {item.createDate && <p className={'create-date'}>Registrado a las: {getStringDateFullFormat(item.createDate)}</p>}
      </div>
      <div className={'body-actions'}>
        <FaRegEdit size={20} onClick={onEdit}/>
        <FaRegTrashAlt size={20} onClick={onDelete}/>
      </div>
    </div>
  )
}

export default ActionItem
