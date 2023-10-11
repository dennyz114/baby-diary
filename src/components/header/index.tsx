import React from 'react';
import './Header.scss';
import { BABY_NAME } from '../../utils/constants'

const Header = () => (
  <div className={'header'}>
    <h1>Diario de {BABY_NAME}! v. 0.1.5</h1>
  </div>
)

export default Header;
