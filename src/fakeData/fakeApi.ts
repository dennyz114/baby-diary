import { ActionType } from '../utils/interfaces'
import { ACTIONS } from '../utils/actions'

const actions: ActionType[] = [
  {
    action: ACTIONS.DIAPER_CHANGE,
    startTime: new Date('2023-09-24T19:07:00'),
    endTime: new Date('2023-09-24T19:07:00'),
  },
  {
    action: ACTIONS.LEFT_BREAST,
    startTime: new Date('2023-09-24T19:09:00'),
    endTime: new Date('2023-09-24T19:13:00'),
  }
]

export const getActions = () => actions
