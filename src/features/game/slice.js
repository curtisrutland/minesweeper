import { createSlice } from '@reduxjs/toolkit'
import {
  createEmptyBoard,
  generateBoard,
  revealBoardCell,
  revealAllCells,
  checkWin,
} from 'utils/game/board'

const initialRows = 9
const initialCols = 9
const initialMines = 10
const emptyBoard = createEmptyBoard(initialRows, initialCols, initialMines)

export const initialState = {
  board: emptyBoard,
  rows: initialRows,
  cols: initialCols,
  mines: initialMines,
  initialized: false,
  flags: 0,
  gameOver: false,
  lost: false,
}

export const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newGame(state, action) {
      const {
        rows = initialRows,
        cols = initialCols,
        mines = initialMines,
      } = action.payload
      state.initialized = false
      state.board = createEmptyBoard(rows, cols)
      state.mines = mines
      state.rows = rows
      state.cols = cols
    },
    initialize(state, action) {
      const { rows, cols, mines, initialized } = state
      if (initialized) return
      const { row, col } = action.payload
      state.initialized = true
      state.board = generateBoard(rows, cols, mines, [row, col])
      revealBoardCell(state.board, row, col)
    },
    revealCell(state, action) {
      const { row, col } = action.payload
      const cell = state.board[row][col]
      if (cell.isFlagged) {
        state.flags--
      }
      if (revealBoardCell(state.board, row, col)) {
        revealAllCells(state.board)
        state.gameOver = true
        state.lost = true
      } else if (checkWin(state.board)) {
        state.gameOver = true
        state.lost = false
      }
    },
    flagCell(state, action) {
      const { row, col } = action.payload
      const cell = state.board[row][col]
      if (cell.isRevealed) return
      state.flags += cell.isFlagged ? -1 : 1
      cell.isFlagged = !cell.isFlagged
    },
  },
})

export const { initialize, newGame, revealCell, flagCell } = slice.actions

export function selectGame(state) {
  const { rows, cols, initialized, board } = state.game
  return { rows, cols, initialized, board }
}

export function selectHeader(state) {
  const { rows, cols, mines, flags } = state.game
  return { rows, cols, mines, flags }
}

export default slice.reducer
