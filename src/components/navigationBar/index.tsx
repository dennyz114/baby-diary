import React from 'react'
import { Link } from 'react-router-dom'
import './NaviagationBar.scss'

const NavigationBar = () => (
  <div className={'test'}>
    <ul>
      <li>
        <Link to="/">Lista de actividade de hoy</Link>
      </li>
      <li>
        <Link to="/reports">Reportes</Link>
      </li>
    </ul>
  </div>
)

export default NavigationBar
