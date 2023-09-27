import React from 'react'
import { Link } from 'react-router-dom'
import { FaChartLine, FaClipboardList } from 'react-icons/fa'
import './NaviagationBar.scss'

const NavigationBar = () => (
  <div className={'test'}>
    <ul>
      <li>
        <FaClipboardList/>
        <Link to="/">Lista de actividade de hoy</Link>
      </li>
      <li>
        <FaChartLine/>
        <Link to="/reports">Reportes</Link>
      </li>
    </ul>
  </div>
)

export default NavigationBar
