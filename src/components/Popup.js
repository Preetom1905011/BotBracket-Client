import React from 'react'
import { Check2Square } from 'react-bootstrap-icons'
import { XSquare } from 'react-bootstrap-icons'
import '../styles/card.css'

export default function Popup({handleDeleteTrue, handleDeleteFalse}) {
  return (
    <div className='popup-box'>
        <p>Remove?</p>
        <div>
          <Check2Square className='check-button' onClick={handleDeleteTrue}>Confirm</Check2Square>
          <XSquare className='cancel-button' onClick={handleDeleteFalse}>Cancel</XSquare>
        </div>
    </div>
  )
}