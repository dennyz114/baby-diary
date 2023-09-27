export enum ACTIONS {
  DIAPER_CHANGE = 'DIAPER_CHANGE',
  LEFT_BREAST = 'LEFT_BREAST',
  RIGHT_BREAST = 'RIGHT_BREAST',
  MEDICINE = 'MEDICINE',
  SHOWER = 'SHOWER',
}

export const actions = {
  [ACTIONS.DIAPER_CHANGE]: {
    displayName: 'Cambio de pañal',
    icon: 'diaper',
  },
  [ACTIONS.LEFT_BREAST]: {
    displayName: 'Pecho izquierdo',
    icon: 'left-breast',
  },
  [ACTIONS.RIGHT_BREAST]: {
    displayName: 'Pecho derecho',
    icon: 'right-breast',
  },
  [ACTIONS.MEDICINE]: {
    displayName: 'Medicina',
    icon: 'medicine',
  },
  [ACTIONS.SHOWER]: {
    displayName: 'Ducha',
    icon: 'shower',
  }
}

