import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HeaderComponent from 'components/Header'
import { selectHeader, newGame } from './slice'

export default function Header() {
  const data = useSelector(selectHeader)
  const dispatch = useDispatch()

  function ng(rows, cols, mines) {
    return newGame({ rows, cols, mines })
  }

  function handleNewGame(difficulty) {
    switch (difficulty) {
      case 'intermediate':
        dispatch(ng(16, 16, 40))
        break
      case 'expert':
        dispatch(ng(16, 30, 99))
        break
      default:
        dispatch(ng(9, 9, 10))
    }
  }
  return <HeaderComponent {...data} onNewGameClick={handleNewGame} />
}
