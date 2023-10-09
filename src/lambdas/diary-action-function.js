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

const header = {
  "content-type": "application/json"
}

const getSuccessObject = (data = {}) => {
  return {
    statusCode: 200,
    headers: header,
    body: JSON.stringify(data)
  }
}

export const handler = async (event) => {

  try {
    switch (event.routeKey) {
      case "GET /actions/{date}":
        const { date } = event.pathParameters;
        const { Items } = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        return getSuccessObject({ Items, date })
      case "POST /actions":
        const { actionId, action, startTime, endTime, note, createDate } = JSON.parse(event.body)
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: { actionId, action, startTime, endTime, note, createDate },
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
          headers: header,
          body: "Bad request",
        }
    }
  } catch (err) {
    console.log('Error!!!: ', err)
    return {
      statusCode: 500,
      headers: header,
      body: JSON.stringify(err),
    }
  }
}
