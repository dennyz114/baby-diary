import moment from 'moment/moment'
import { TIME_ZONE } from './constants'

export const DATE_DASH_FORMAT = 'DD-MM-YYYY'
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
  const date = new Date(startDate.getTime());
  const nowUTC = new Date();
  const now = new Date(nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000);
  const dates = [];

  while (date <= now) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates.reverse();
}
