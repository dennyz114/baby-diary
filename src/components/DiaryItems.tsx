import React, { useEffect, useState } from 'react'
import { getActions } from '../fakeData/fakeApi'
import { ActionType } from '../utils/interfaces'
import moment from 'moment'
import ActionItem from './ActionItem'

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { AVAILABLE_ACTIONS } from '../utils/ACTION'

const DiaryItems = () => {
  const [items, setItems] = useState<ActionType[]>([])

  const getItems = async () => {
    const actions = getActions()
    setItems(actions)
  }

  useEffect(() => {
    void getItems()
  }, [])

  return (
    <div>
      <h1>{moment(new Date()).format('DD/MM/YYYY')}</h1>
      {
        items.map((item, index) => <ActionItem key={index} item={item}/>)
      }

      <Fab
        icon={'+'}
      >
        {
          Object.values(AVAILABLE_ACTIONS).map((action) => (
            <Action
              key={action.displayName}
              text={action.displayName}
              onClick={() => console.log(action.displayName)}
            >
              {action.icon}
            </Action>
          ))
        }
      </Fab>
    </div>
  )
}

export default DiaryItems
