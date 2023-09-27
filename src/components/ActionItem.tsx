import { ActionType } from '../utils/interfaces'
import { actions } from '../utils/actions'
import moment from 'moment/moment'
import React from 'react'

const ActionItem = ({ item }: { item: ActionType }) => {
  const actionInformation = actions[item.action]
  return (
    <div>
      <p>{actionInformation.displayName}</p>
      <p>icono: {actionInformation.icon}</p>
      <p>{moment(item.startTime).format('DD/MM/YYYY h:mm A')}</p>
      <p>{moment(item.endTime).format('DD/MM/YYYY h:mm A')}</p>
    </div>
  )
}

export default ActionItem
