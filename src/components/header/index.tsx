import React from 'react';
import './Header.scss';
import { BABY_NAME } from '../../utils/constants'
import { GiHamburgerMenu } from 'react-icons/gi'

const Header = () => (
  <div className={'header'}>
    <GiHamburgerMenu size={35} onClick={() => console.log('open drawer')} className={'hamburger-icon'}/>
    <h1>Diario de {BABY_NAME}!</h1>
  </div>
)

export default Header;
