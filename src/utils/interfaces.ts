import { ACTION } from './ACTION'

export interface ActionType {
  actionId?: string
  action: ACTION
  startTime: Date
  endTime?: Date
  note?: string
  createDate: Date
}
