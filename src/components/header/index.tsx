import React, { useState } from 'react'
import './Header.scss';
import { BABY_NAME } from '../../utils/constants'
import { GiHamburgerMenu } from 'react-icons/gi'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { SECONDARY_COLOR } from '../../styleConstants'
import { LuBaby } from 'react-icons/lu'
import { BsInfoCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'

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
        <h1>Diario de {BABY_NAME}!</h1>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        overlayColor={SECONDARY_COLOR}
        className={'drawer'}
      >
        <Link to="/baby-info" onClick={toggleDrawer} className={'drawer-item'}>
          <LuBaby/> Info del bebe
        </Link>
        <Link to="/app-info" onClick={toggleDrawer} className={'drawer-item'}>
          <BsInfoCircle/> Info de la app
        </Link>
      </Drawer>
    </>
  )
}

export default Header;
