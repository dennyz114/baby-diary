import { ACTION } from './ACTION'

export interface ActionType {
  action: ACTION
  startTime: Date
  endTime?: Date
  note?: string
}
