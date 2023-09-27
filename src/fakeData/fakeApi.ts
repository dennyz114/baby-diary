import { ActionType } from '../utils/interfaces'
import { ACTION } from '../utils/ACTION'

const actions: ActionType[] = [
  {
    action: ACTION.RIGHT_BREAST,
    startTime: new Date('2023-09-26T00:25:00'),
    endTime: new Date('2023-09-26T00:39:00'),
  },
  {
    action: ACTION.MEDICINE,
    startTime: new Date('2023-09-26T00:47:00'),
    endTime: new Date('2023-09-26T00:47:00'),
  },
  {
    action: ACTION.BOTTLE,
    startTime: new Date('2023-09-26T01:02:00'),
    endTime: new Date('2023-09-26T01:02:00'),
  },
  {
    action: ACTION.DIAPER_CHANGE,
    startTime: new Date('2023-09-26T01:14:00'),
    endTime: new Date('2023-09-26T01:14:00'),
  },
  {
    action: ACTION.RIGHT_BREAST,
    startTime: new Date('2023-09-26T04:54:00'),
    endTime: new Date('2023-09-26T05:02:00'),
  },
  {
    action: ACTION.MEDICINE,
    startTime: new Date('2023-09-26T05:10:00'),
    endTime: new Date('2023-09-26T05:10:00'),
  },
  {
    action: ACTION.LEFT_BREAST,
    startTime: new Date('2023-09-26T05:15:00'),
    endTime: new Date('2023-09-26T05:30:00'),
  },
  {
    action: ACTION.DIAPER_CHANGE,
    startTime: new Date('2023-09-26T05:35:00'),
    endTime: new Date('2023-09-26T05:35:00'),
  },
  {
    action: ACTION.BOTTLE,
    startTime: new Date('2023-09-26T05:46:00'),
    endTime: new Date('2023-09-26T05:46:00'),
  },
  {
    action: ACTION.MEDICINE,
    startTime: new Date('2023-09-26T08:45:00'),
    endTime: new Date('2023-09-26T08:45:00'),
  },
  {
    action: ACTION.SHOWER,
    startTime: new Date('2023-09-26T16:00:00'),
    endTime: new Date('2023-09-26T16:00:00'),
  }
]

export const getActions = () => actions
