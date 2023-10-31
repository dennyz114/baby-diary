import React from 'react'
import './ReportCard.scss'

export interface KPIProps {
  info: string
  label: string
}

/*
* Consultas (xq la llevamos y q le recetaron) y controles (medida y peso)
* */

const ReportCard = ({ label, info }: KPIProps) => {
  return (
    <div className={'report-card-container'}>
      <span className={'report-label'}>{label}:</span>
      <span className={'report-info'}>{info}</span>
    </div>
  )
}

export default ReportCard
