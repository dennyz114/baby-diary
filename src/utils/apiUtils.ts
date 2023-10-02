const headers = {
  'Content-Type': 'application/json',
}

export const getActionsByDate = async (date: string) => {
  const response = await doGet(`actions/${date}`)
  console.log('response!!!: ', response)
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
