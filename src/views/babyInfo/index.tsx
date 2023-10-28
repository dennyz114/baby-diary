import React from 'react'
import { BABY_BORN_HEIGHT, BABY_BORN_WEIGHT } from '../../utils/constants'
import './BabyInfo.scss'
import BabyImage from '../../images/Alice.jpeg'

const BabyInfo = () => {
  return (
    <div className={'baby-profile-info'}>
      <h1 className={'baby-profile-name'}>Mis datos</h1>
      <div className={'baby-profile-image'}>
        <img src={BabyImage} alt="baby-image"/>
      </div>
      <div className={'baby-profile-data'}>
        <p>En el nacimiento</p>
        <div className={'baby-born-data'}>
          <p>Pesé: {BABY_BORN_WEIGHT} kg.</p>
          <p>Medí: {BABY_BORN_HEIGHT} m.</p>
        </div>
      </div>
    </div>
  )
}

export default BabyInfo
