import React, { useEffect, useState } from 'react'
import { getActions } from '../fakeData/fakeApi'
import { ActionType } from '../utils/interfaces'
import moment from 'moment'
import ActionItem from './ActionItem'

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { AVAILABLE_ACTIONS } from '../utils/ACTION'
import { PRIMARY_COLOR, TERTIARTY_COLOR } from '../constants'

const buttonPositionStyle = { bottom: 100, margin: 5, right: 25 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR }

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

      <Fab icon={'+'} style={buttonPositionStyle} mainButtonStyles={buttonStyle}>
        {
          Object.values(AVAILABLE_ACTIONS).map((action) => (
            <Action
              key={action.displayName}
              text={action.displayName}
              onClick={() => console.log(action.displayName)}
              style={buttonStyle}
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
