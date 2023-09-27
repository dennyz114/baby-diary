import { ActionType } from '../../utils/interfaces'
import { AVAILABLE_ACTIONS } from '../../utils/ACTION'
import moment from 'moment/moment'
import React from 'react'

import './ActionItem.scss'

const ActionItem = ({ item }: { item: ActionType }) => {
  const actionInformation = AVAILABLE_ACTIONS[item.action]
  return (
    <div className={'diary-item-container'}>
      <div className={'icon-section'}>
        {actionInformation.icon}
      </div>
      <div className={'body-section'}>
        <p>{actionInformation.displayName}</p>
        <p>{(actionInformation.needsEndTime ? 'Hora de inicio: ' : 'Hora: ') + moment(item.startTime).format('h:mm A')}</p>
        {
          actionInformation.needsEndTime &&
          <p>{item.endTime ? 'Hora de fin: ' + moment(item.endTime).format('h:mm A') : 'Accion imcompleta'}</p>
        }
      </div>
    </div>
  )
}

export default ActionItem
