import moment from 'moment/moment'

export const DATE_FORMAT = 'DD/MM/YYYY'
export const TIME_FORMAT = 'hh:mm'
export const AM_OR_PM_FORMAT = 'A'

export function destructureDateObject(date?: Date) {
  return date ? moment(date).format(`${DATE_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT}`).split(' ') : [undefined, undefined, undefined]
}

export function dateAndTimeFormatToDateObject (date?: string, time?: string, amOrPm?: string): Date | undefined {
  if (!date || !time || !amOrPm)
    return undefined
  return moment(`${date} ${time} ${amOrPm}`, `${DATE_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT}`).toDate()
}
