import React from 'react'
import { action } from '@storybook/addon-actions'
import Cell from './Cell'
import CellGrid from 'components/CellGrid'
import { range } from 'utils/numbers'

export default {
  title: 'Cell',
  component: Cell,
}

const RowWrapper = ({ cols, children }) => (
  <CellGrid rows={1} cols={cols}>
    {children}
  </CellGrid>
)

const StandardCells = ({ revealed }) => (
  <div>
    <RowWrapper cols={8}>
      {range(8).map((i) => (
        <Cell
          value={i + 1}
          isRevealed={revealed}
          isMine={false}
          isFlagged={false}
          onClick={action('cell click')}
          onRightClick={action('cell right click')}
          key={i}
        />
      ))}
    </RowWrapper>
    <RowWrapper cols={2}>
      <Cell
        value={null}
        isRevealed={revealed}
        isMine={true}
        isFlagged={false}
        onClick={action('mine click')}
        onRightClick={action('mine right click')}
      />
      <Cell
        value={null}
        isRevealed={revealed}
        isMine={false}
        isFlagged={true}
        onClick={action('flag click')}
        onRightClick={action('flag right click')}
      />
    </RowWrapper>
  </div>
)

export const NotRevealed = () => {
  return <StandardCells revealed={false} />
}

export const Revealed = () => {
  return <StandardCells revealed />
}
