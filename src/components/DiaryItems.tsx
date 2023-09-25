import React, { useEffect, useState } from 'react'

const DiaryItems = () => {
  const [items, setItems] = useState([])

  const getItems = async () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => setItems(json))
  }

  useEffect(() => {
    void getItems()
  }, [])

  return (
    <div>
      <h1>Todo</h1>
      {
        JSON.stringify(items)
      }
    </div>
  )
}

export default DiaryItems
