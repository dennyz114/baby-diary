import moment from 'moment/moment'

export const DATE_FORMAT = 'DD/MM/YYYY'
export const TIME_FORMAT = 'hh:mm'
export const AM_OR_PM_FORMAT = 'A'

export function getDateString(date: Date) {
  return moment(date).format(DATE_FORMAT)
}

export function destructureDateObject(date?: Date) {
  return date ? moment(date).format(`${DATE_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT}`).split(' ') : [undefined, undefined, undefined]
}

export function dateAndTimeFormatToDateObject (date?: string, time?: string, amOrPm?: string): Date | undefined {
  if (!date || !time || !amOrPm)
    return undefined
  return moment(`${date} ${time} ${amOrPm}`, `${DATE_FORMAT} ${TIME_FORMAT} ${AM_OR_PM_FORMAT}`).toDate()
}

export function getDatesUntilNowSince(startDate: Date) {
  const date = new Date(startDate.getTime());
  const now = new Date();

  const dates = [];

  while (date <= now) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}