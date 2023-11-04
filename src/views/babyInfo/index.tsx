import React from 'react'
import {
  BABY_BIRTHDAY,
  BABY_BORN_HEIGHT,
  BABY_BORN_WEIGHT,
  BABY_MIDDLE_NAME,
  BABY_NAME
} from '../../utils/constants'
import './BabyInfo.scss'
import BabyImage from '../../images/Alice.jpeg'
import { getStringDateFullFormat, getTimeSinceBornUntilNow } from '../../utils/dateUtils'
import { FaWeightHanging } from 'react-icons/fa'
import { GiBodyHeight } from 'react-icons/gi'
import { MdDateRange } from 'react-icons/md'

const getAge = () => {
  const [years, months, days] = getTimeSinceBornUntilNow(new Date(BABY_BIRTHDAY))
  const yearsToShow = years > 0 ? `${years} año${years > 1 ? 's, ' : ', '}` : ''
  return `${yearsToShow} ${months} mes${months > 1 ? 'es' : ''} y ${days} dia${days > 1 ? 's' : ''}`
}

const BabyInfo = () => {
  return (
    <div className={'baby-profile-info'}>
      <h2 className={'baby-profile-name'}>Mis datos</h2>
      <div className={'baby-profile-image'}>
        <img src={BabyImage} alt="baby-image"/>
      </div>
      <div className={'baby-profile-data'}>
        <div className={'baby-name'}>
          <p>{BABY_NAME} {BABY_MIDDLE_NAME}</p>
        </div>
        <div className={'baby-born-data'}>
          <p>Datos de nacimiento:</p>
          <div className={'baby-info'}>
            <FaWeightHanging/> {BABY_BORN_WEIGHT}Kg.
          </div>
          <div className={'baby-info'}>
            <GiBodyHeight/> {BABY_BORN_HEIGHT}m.
          </div>
          <div className={'baby-info'}>
            <MdDateRange/> {getStringDateFullFormat(BABY_BIRTHDAY)}
          </div>
        </div>
        <div className={'baby-data'}>
          <p>Hoy tengo {getAge()}</p>
        </div>
      </div>
    </div>
  )
}

export default BabyInfo
