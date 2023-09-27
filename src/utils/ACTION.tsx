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
  displayName: string
  icon: JSX.Element
  needsEndTime?: boolean
}

export const AVAILABLE_ACTIONS: {[id: string]: Action} = {
  [ACTION.DIAPER_CHANGE]: {
    displayName: 'Cambio de pañal',
    icon: <FaBaby/>
  },
  [ACTION.LEFT_BREAST]: {
    displayName: 'Pecho izquierdo',
    icon: <FaArrowCircleLeft/>,
    needsEndTime: true
  },
  [ACTION.RIGHT_BREAST]: {
    displayName: 'Pecho derecho',
    icon: <FaArrowCircleRight/>,
    needsEndTime: true
  },
  [ACTION.MEDICINE]: {
    displayName: 'Medicina',
    icon: <TbMedicineSyrup/>
  },
  [ACTION.SHOWER]: {
    displayName: 'Ducha',
    icon: <FaShower/>
  },
  [ACTION.BOTTLE]: {
    displayName: 'Biberon',
    icon: <GiBabyBottle/>
  }
}

