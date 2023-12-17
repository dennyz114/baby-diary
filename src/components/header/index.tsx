import React, { useState } from 'react'
import './Header.scss';
import { BABY_NAME } from '../../utils/babyConstants'
import { GiHamburgerMenu, GiBodyHeight } from 'react-icons/gi'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { SECONDARY_COLOR } from '../../styleConstants'
import { LuBaby } from 'react-icons/lu'
import { BsInfoCircle } from 'react-icons/bs'
import { FaUserDoctor } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { Link } from 'react-router-dom'

const linkItems = [
  {
    to: '/baby-info',
    icon: <LuBaby/>,
    text: `Info de ${BABY_NAME}`
  },
  {
    to: '/doctor-visits',
    icon: <FaUserDoctor/>,
    text: 'Visitas al doctor'
  },
  {
    to: '/measurement-control',
    icon: <GiBodyHeight/>,
    text: 'Peso y talla'
  },
  {
    to: '/general-notes',
    icon: <CgNotes/>,
    text: 'Notas generales'
  },
  {
    to: '/app-info',
    icon: <BsInfoCircle/>,
    text: 'Info de la app'
  }
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen(!isOpen)

  return (
    <>
      <div className={'header'}>
        <GiHamburgerMenu
          size={35}
          onClick={toggleDrawer}
          className={'hamburger-icon'}
        />
        <h1>Diario de {BABY_NAME}</h1>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        overlayColor={SECONDARY_COLOR}
        className={'drawer'}
      >
        {
          linkItems.map((item, index) => (
            <Link
              to={item.to}
              onClick={toggleDrawer}
              className={'drawer-item'}
              key={index}
            >
              {item.icon} {item.text}
            </Link>
          ))
        }
      </Drawer>
    </>
  )
}

export default Header;
