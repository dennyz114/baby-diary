import moment from 'moment/moment'
import { TIME_ZONE } from './constants'
// @ts-ignore
import localizationEs from 'moment/locale/es'
// @ts-ignore
import { capitalize } from 'lodash'

export const DATE_DASH_FORMAT = 'DD-MM-YYYY'
export const DATE_REPORT_FORMAT = 'ddd DD MMM'
export const TIME_FORMAT = 'hh:mm'
export const AM_OR_PM_FORMAT = 'A'
export const TIME_ZONE_FORMAT = 'z'

export function getDateDashFormatString(date: Date) {
  return moment(date).format(DATE_DASH_FORMAT)
}

export function getStringDateFullFormat(date: Date) {
  return moment(date).format(`${DATE_DASH_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT}`)
}

export function destructureDateObject(date?: Date) {
  return date ? moment(date).format(`${DATE_DASH_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT}`).split(' ') : [undefined, undefined, undefined]
}

export function dateAndTimeFormatToDateObject (date?: string, time?: string, amOrPm?: string): Date | undefined {
  if (!date || !time || !amOrPm)
    return undefined
  return moment(`${date} ${time} ${amOrPm} ${TIME_ZONE}`, `${DATE_DASH_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT} ${TIME_ZONE_FORMAT}`).toDate()
}

export function getDatesUntilNowSince(startDate: Date) {
  const date = new Date(startDate.getTime())
  date.setHours(0, 0, 0, 0)
  const now = new Date()
  const dates = []

  while (date <= now) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates.reverse()
}

export function getReadableDate(date: string) {
  const dateObject = new Date(date)
  const getReadableDay = (dateObject: Date) => {
    const today = new Date()
    if (dateObject.getFullYear() === today.getFullYear() && dateObject.getMonth() === today.getMonth() && dateObject.getDate() === today.getDate())
      return 'Hoy'
    if (dateObject.getFullYear() === today.getFullYear() && dateObject.getMonth() === today.getMonth() && dateObject.getDate() === today.getDate() - 1)
      return 'Ayer'
    // @ts-ignore
    const momentDate = moment(dateObject).locale('es', localizationEs)
    return capitalize(momentDate.format(DATE_REPORT_FORMAT))
  }

  return `${getReadableDay(dateObject)} - ${moment(dateObject).format('hh:mm A')}`
}
