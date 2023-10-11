import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true
  }
});

const tableName = 'DiaryActions'

const headers = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
}

const getSuccessObject = (data = {}) => {
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(data)
  }
}

export const handler = async (event) => {

  try {
    switch (event.routeKey) {
      case "OPTIONS /actions":
        console.log('OPTIONS /actions')
        return getSuccessObject()
      case "GET /actions/{date}":
        const { date } = event.pathParameters;
        console.log('GET /actions', date)
        const { Items } = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        return getSuccessObject({ Items, date })
      case "POST /actions":
        const { actionId, action, startTime, endTime, note, startDate, createDate } = JSON.parse(event.body)
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: { actionId, action, startTime, endTime, note, startDate, createDate },
          })
        )
        return getSuccessObject()
      case "DELETE /actions/{id}":
        const { id } = event.pathParameters
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: { actionId: id },
          })
        );
        return getSuccessObject()
      default:
        return {
          statusCode: 400,
          headers: headers,
          body: "Bad request",
        }
    }
  } catch (err) {
    console.log('Error!!!: ', err)
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify(err),
    }
  }
}
