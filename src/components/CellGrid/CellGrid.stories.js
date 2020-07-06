import React from 'react'
import { action } from '@storybook/addon-actions'
import { createEmptyBoard, generateBoard, getSize } from 'utils/game/board'
import Cell from 'components/Cell'
import CellGrid from './CellGrid'
import '../../index.css'

export default {
  title: 'CellGrid',
  component: CellGrid,
}

const Board = ({ board }) => {
  const cells = board.flatMap((x) => x)
  return (
    <>
      {cells.map((cell) => (
        <Cell key={cell.coords.key} onClick={action('cell click')} {...cell} />
      ))}
    </>
  )
}

export const EmptyNotRevealed = () => {
  const board = createEmptyBoard()
  const [rows, cols] = getSize(board)
  return (
    <CellGrid rows={rows} cols={cols}>
      <Board board={board} />
    </CellGrid>
  )
}

export const RandomRevealed = () => {
  const board = generateBoard()
  board.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)))
  const [rows, cols] = getSize(board)
  return (
    <CellGrid rows={rows} cols={cols}>
      <Board board={board} />
    </CellGrid>
  )
}

export const RandomIntermediateRevealed = () => {
  const board = generateBoard(16, 16, 40)
  board.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)))
  const [rows, cols] = getSize(board)
  return (
    <CellGrid rows={rows} cols={cols}>
      <Board board={board} />
    </CellGrid>
  )
}

export const RandomExpertRevealed = () => {
  const board = generateBoard(16, 30, 99)
  board.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)))
  const [rows, cols] = getSize(board)
  return (
    <CellGrid rows={rows} cols={cols}>
      <Board board={board} />
    </CellGrid>
  )
}
