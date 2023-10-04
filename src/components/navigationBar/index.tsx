import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartLine, FaClipboardList } from 'react-icons/fa'
import './NaviagationBar.scss'

const NavigationBar = () => (
  <div className={'navigation-bar'}>
    <Link to="/" className={'navigation-item button'}>
      <div className={'navigation-icon'}>
        <FaClipboardList/>
      </div>
      Lista de actividade de hoy
    </Link>
    <Link to="/reports" className={'navigation-item button'}>
      <div className={'navigation-icon'}>
        <FaChartLine/>
      </div>
      Reportes
    </Link>
  </div>
)

export default NavigationBar
