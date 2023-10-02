import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = 'DiaryActions'

export const handler = async (event) => {

  console.log('event', event, event.routeKey)
  const header = {
    "content-type": "application/json"
  }

  try {
    switch (event.routeKey) {
      case "GET /actions/{date}":
        const { date } = event.pathParameters;
        const {Items} = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        return {
          statusCode: 200,
          headers: header,
          body: JSON.stringify({ Items, date }),
        }
      default:
        return {
          statusCode: 400,
          headers: header,
          body: "Bad request",
        }
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: header,
      body: JSON.stringify(err),
    }
  }
}
