import React, { JSX } from 'react'
import { FaBaby, FaArrowCircleLeft, FaArrowCircleRight, FaShower } from 'react-icons/fa'
import { TbMedicineSyrup } from 'react-icons/tb'
import { GiBabyBottle } from 'react-icons/gi'

export enum ACTION {
  DIAPER_CHANGE = 'DIAPER_CHANGE',
  LEFT_BREAST = 'LEFT_BREAST',
  RIGHT_BREAST = 'RIGHT_BREAST',
  MEDICINE = 'MEDICINE',
  SHOWER = 'SHOWER',
  BOTTLE = 'BOTTLE',
}

interface Action {
  id: ACTION
  displayName: string
  icon: JSX.Element
  needsEndTime?: boolean
}

export const AVAILABLE_ACTIONS: {[id: string]: Action} = {
  [ACTION.DIAPER_CHANGE]: {
    id: ACTION.DIAPER_CHANGE,
    displayName: 'Cambio de pañal',
    icon: <FaBaby size={35}/>
  },
  [ACTION.LEFT_BREAST]: {
    id: ACTION.LEFT_BREAST,
    displayName: 'Pecho izquierdo',
    icon: <FaArrowCircleLeft size={35}/>,
    needsEndTime: true
  },
  [ACTION.RIGHT_BREAST]: {
    id: ACTION.RIGHT_BREAST,
    displayName: 'Pecho derecho',
    icon: <FaArrowCircleRight size={35}/>,
    needsEndTime: true
  },
  [ACTION.MEDICINE]: {
    id: ACTION.MEDICINE,
    displayName: 'Medicina',
    icon: <TbMedicineSyrup size={35}/>
  },
  [ACTION.SHOWER]: {
    id: ACTION.SHOWER,
    displayName: 'Ducha',
    icon: <FaShower size={35}/>
  },
  [ACTION.BOTTLE]: {
    id: ACTION.BOTTLE,
    displayName: 'Biberon',
    icon: <GiBabyBottle size={35}/>
  }
}

