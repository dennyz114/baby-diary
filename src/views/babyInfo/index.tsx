import React from 'react'
import {
  BABY_BIRTHDAY,
  BABY_BORN_HEIGHT,
  BABY_BORN_WEIGHT,
  BABY_LAST_NAME,
  BABY_MIDDLE_NAME,
  BABY_NAME
} from '../../utils/constants'
import './BabyInfo.scss'
import BabyImage from '../../images/Alice.jpeg'
import { getTimeSinceBornUntilNow } from '../../utils/dateUtils'

const BabyInfo = () => {
  const now = new Date()
  const [years, months, days, hours, minutes] = getTimeSinceBornUntilNow(new Date(BABY_BIRTHDAY))


  return (
    <div className={'baby-profile-info'}>
      <h2 className={'baby-profile-name'}>Mis datos</h2>
      <div className={'baby-profile-image'}>
        <img src={BabyImage} alt="baby-image"/>
      </div>
      <div className={'baby-profile-data'}>
        <div className={'baby-born-data'}>
          <p>{`Me llamo ${BABY_NAME} ${BABY_MIDDLE_NAME} ${BABY_LAST_NAME}`}</p>
        </div>
        <div className={'baby-born-data'}>
          <p>{`Nací pesando ${BABY_BORN_WEIGHT}Kg. y midiendo ${BABY_BORN_HEIGHT}m.`}</p>
        </div>
        <div className={'baby-born-data'}>
          <p>{`Hoy tengo ${months} mes ${days} dias ${hours} horas y ${minutes} minutos`}</p>
        </div>
      </div>
    </div>
  )
}

export default BabyInfo
