import React from 'react'
import { action } from '@storybook/addon-actions'
import { generateBoard, getSize } from 'utils/game/board'
import Cell from 'components/Cell'
import CellGrid from 'components/CellGrid'
import Header from 'components/Header'
import GameWrapper from './GameWrapper'
import '../../index.css'

export default {
  title: 'GameWrapper',
  component: GameWrapper,
}

export const Example = () => {
  const board = generateBoard()
  const [rows, cols] = getSize(board)
  board.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)))
  const cells = board.flatMap((b) => b)
  return (
    <GameWrapper>
      <Header
        cols={cols}
        rows={rows}
        mines={10}
        flags={0}
        onNewGameClick={action('new game clicked')}
      />
      <CellGrid rows={rows} cols={cols}>
        {cells.map((cell) => (
          <Cell
            key={cell.coords.key}
            onClick={action('cell click')}
            {...cell}
          />
        ))}
      </CellGrid>
    </GameWrapper>
  )
}
