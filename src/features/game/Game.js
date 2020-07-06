import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GameWrapper from 'components/GameWrapper'
import CellGrid from 'components/CellGrid'
import Cell from 'components/Cell'
import GithubCorner from 'components/GithubCorner'
import Header from './Header'
import { selectGame, initialize, revealCell, flagCell } from './slice'

export default function Game() {
  const { board, initialized, cols, rows } = useSelector(selectGame)
  const dispatch = useDispatch()

  function handleCellClick(cell) {
    return function () {
      const { row, col } = cell.coords
      if (!initialized) dispatch(initialize({ row, col }))
      else dispatch(revealCell({ row, col }))
    }
  }

  function handleCellRightClick(cell) {
    return function () {
      const { row, col } = cell.coords
      if (!initialized) return
      dispatch(flagCell({ row, col }))
    }
  }

  return (
    <GameWrapper>
      <GithubCorner />
      <Header />
      <CellGrid rows={rows} cols={cols}>
        {board
          .flatMap((c) => c)
          .map((cell) => (
            <Cell
              key={cell.coords.key}
              onClick={handleCellClick(cell)}
              onRightClick={handleCellRightClick(cell)}
              {...cell}
            />
          ))}
      </CellGrid>
    </GameWrapper>
  )
}
