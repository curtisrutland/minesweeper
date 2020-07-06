import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 600px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 4px;
  align-items: center;
  margin: 10px;
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  font-size: 0.85rem;
  text-align: center;
  padding: 4px;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-size: 0.8rem;
`

const Button = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: 0;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 4px;
  margin: 4px;
  font-family: 'Open Sans';
`

const Text = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin: 4px;
  font-family: 'Open Sans';
`

const Fill = styled.div`
  flex-grow: 1;
`

const Divider = styled.hr`
  width: 100%;
  color: #ccc;
  margin: 2px;
`

export default function Header({
  rows,
  cols,
  mines,
  flags,
  onNewGameClick = () => {},
}) {
  function handleClick(difficulty) {
    onNewGameClick(difficulty)
  }

  return (
    <Container>
      <StatsContainer>
        <div>Rows: {rows}</div>
        <div>Cols: {cols}</div>
        <div>Mines: {mines}</div>
        <div>Flags: {flags}</div>
      </StatsContainer>
      <Divider />
      <ButtonContainer>
        <Fill />
        <Text>New:</Text>
        <Button onClick={() => handleClick('beginner')}>Beginner</Button>
        <Button onClick={() => handleClick('intermediate')}>
          Intermediate
        </Button>
        <Button onClick={() => handleClick('expert')}>Expert</Button>
        <Fill />
      </ButtonContainer>
    </Container>
  )
}
