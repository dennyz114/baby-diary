import React, { useEffect, useState } from 'react'
import ReportCard, { KPIProps } from '../../components/reportCard'
// @ts-ignore
import {reduce} from 'lodash'
import './Reports.scss'
import { getReadableDate } from '../../utils/dateUtils'

const fixReportDataToDisplay = (reportsData: {}): KPIProps[] => {
  return reduce(reportsData, (result: [], value: string, key: string) => {
    if (key === 'lastBath')
      return [...result, {label: 'Ultima ducha', info: getReadableDate(value)}]
    if (key === 'lastMedicine')
      return [...result, {label: 'Ultima medicina', info: getReadableDate(value)}]
    if (key === 'lastDiaperChange')
      return [...result, {label: 'Ultimo pañal', info: getReadableDate(value)}]
    if (key === 'numberOfMinutesInLeftBreast')
      return [...result, {label: 'Minutos en pecho izquiero', info: value}]
    return result
  }, [])
}

const Reports = () => {
  const [reportData, setReportData] = useState<KPIProps[]>([])

  useEffect(() => {
    // todo: create and call new api
    const reportsData = {} /*{
      lastBath: '2023-10-29T09:30:00.000Z',
      lastMedicine: '2023-10-30T15:15:00.000Z',
      lastDiaperChange: '2023-10-28T15:30:00.000Z',
      numberOfMinutesInLeftBreast: 40,
    }*/
    const fixedReportData = fixReportDataToDisplay(reportsData)
    setReportData(fixedReportData)
  }, [])

  return (
    <div className={'reports-wrapper'}>
      {reportData.length === 0
        ? <h2>No hay datos para mostrar</h2>
        : reportData.map(report => <ReportCard key={report.label} label={report.label} info={report.info}/>)
      }
    </div>
  )
}

export default Reports
