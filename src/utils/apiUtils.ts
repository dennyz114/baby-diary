import { ActionType } from './interfaces'

const headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": "*",
}

const ACTION_PATH = 'actions'
const URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : "https://pbx1kuex3j.execute-api.us-east-1.amazonaws.com/"

export const getActionsByDate = async (date: string) => {
  return await doGet(`${URL}${ACTION_PATH}/${date}`)
}

export const saveAction = async (action: ActionType) => {
  return await doPost(`${URL}${ACTION_PATH}`, action)
}

export const deleteAction = async (actionId: string) => {
  return await doDelete(`${URL}${ACTION_PATH}/${actionId}`)
}



// REST Util methods
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
