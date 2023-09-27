import React, { useEffect, useState } from 'react'
import { getActions } from '../fakeData/fakeApi'
import { ActionType } from '../utils/interfaces'
import moment from 'moment'
import ActionItem from './ActionItem'

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
    </div>
  )
}

export default DiaryItems
