import moment from 'moment/moment'

export const DATE_FORMAT = 'DD/MM/YYYY'
export const TIME_FORMAT = 'h:mm A'

export function dateObjectToDateFormat(date?: Date): string | undefined {
  return date ? moment(date).format(DATE_FORMAT) : undefined
}

export function dateObjectToTimeFormat(date?: Date): string | undefined {
  return date ? moment(date).format(TIME_FORMAT) : undefined
}

export function dateAndTimeFormatToDateObject (date?: string, time?: string): Date | undefined {
  if (!date || !time)
    return undefined
  return moment(`${date} ${time}`, `${DATE_FORMAT} ${TIME_FORMAT}`).toDate()
}
