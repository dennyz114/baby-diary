import { ActionType } from './interfaces'

const headers = {
  'Content-Type': 'application/json',
}

const ACTION_PATH = 'actions'

export const getActionsByDate = async (date: string) => {
  return await doGet(`${ACTION_PATH}/${date}`)
}

export const createAction = async (action: ActionType) => {
  const response = await doPost(ACTION_PATH, action)
  console.log('post response!!!: ', response)
  return response
}


// REST methods

const doGet = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers,
  })
  return response.json()
}

const doPost = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  return response.json()
}

const doPut = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })
  return response.json()
}

const doDelete = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  })
  return response.json()
}
