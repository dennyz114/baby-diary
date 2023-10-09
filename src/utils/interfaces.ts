import { ACTION } from './ACTION'

export interface ActionType {
  actionId?: string
  action: ACTION
  startDate: string
  startTime: Date
  endTime?: Date
  note?: string
  createDate: Date
}
