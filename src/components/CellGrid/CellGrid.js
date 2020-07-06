import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  grid-gap: 1px;
  width: fit-content;
  background-color: #bbb;
  border: #bbb solid 1px;
  margin: 10px;
`

export default Grid