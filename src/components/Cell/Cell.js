import React from 'react'
import styled from 'styled-components'
import FlagIcon from 'components/icons/Flag'
import BombIcon from 'components/icons/Bomb'

const textColors = [
  null,
  '#0C01FB',
  '#048004',
  '#FD0302',
  '#030181',
  '#800402',
  '#028080',
  '#000000',
  '#808080',
]

const BUTTON_SIZE = 26

const Container = styled.button`
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border: 0;
  outline: 0;
  background-color: ${(props) => (props.isRevealed ? '#ccc' : '#eee')};
  cursor: pointer;
  :hover {
    background-color: ${(props) => (props.isRevealed ? '#ccc' : '#ddd')};
  }
  :active {
    background-color: #ccc;
  }
`

const Number = styled.span`
  color: ${(props) => textColors[props.number]};
  font-weight: bold;
  font-family: 'Open Sans';
`

function Flag(props) {
  return (
    <Container {...props}>
      <FlagIcon size={BUTTON_SIZE - 4} />
    </Container>
  )
}

function Mine(props) {
  return (
    <Container isRevealed {...props}>
      <BombIcon size={BUTTON_SIZE - 4} />
    </Container>
  )
}

function Visible({ value, ...props }) {
  if (value === 0 || typeof value === 'undefined')
    return <Container isRevealed {...props} />
  return (
    <Container isRevealed {...props}>
      <Number number={value}>{value}</Number>
    </Container>
  )
}

export default function Cell({
  value,
  isMine = false,
  isFlagged = false,
  isRevealed = false,
  onClick = () => {},
  onRightClick = () => {},
}) {
  function handleClick(e) {
    onClick({ value, isMine, isFlagged, isRevealed })
  }

  function handleRightClick(e) {
    e.preventDefault()
    onRightClick({ value, isMine, isFlagged, isRevealed })
  }

  if (!isRevealed && isFlagged) {
    return <Flag onClick={handleClick} onContextMenu={handleRightClick} />
  } else if (isRevealed && isMine) {
    return <Mine onClick={handleClick} onContextMenu={handleRightClick} />
  } else if (isRevealed) {
    return (
      <Visible
        onClick={handleClick}
        value={value}
        onContextMenu={handleRightClick}
      />
    )
  } else {
    return <Container onClick={handleClick} onContextMenu={handleRightClick} />
  }
}
