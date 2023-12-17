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

export interface NoteItemType {
  noteId?: string
  noteData: string
  createDate: Date
}

export interface MeasurementItemType {
  measurementItemId: string
  height: string
  weight: string
  headCircumference: string
  date: Date
}
