import React from 'react'
import { Fab, Action } from 'react-tiny-fab';
import { PRIMARY_COLOR, TERTIARTY_COLOR } from '../../styleConstants'

const buttonPositionStyle = { bottom: 100, margin: 5, right: 25, zIndex: 0 }
const buttonStyle = { backgroundColor: PRIMARY_COLOR, color: TERTIARTY_COLOR, zIndex: 0, fontSize: 50 }

// @ts-ignore
const FabButton = (props) => {
  return (
    <Fab style={buttonPositionStyle} mainButtonStyles={buttonStyle} {...props}/>
  )
}

export { FabButton, Action, buttonStyle }
