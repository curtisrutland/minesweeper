import { randomInt, range } from 'utils/numbers'

export function generateBoard(
  rows = 9,
  cols = 9,
  mines = 10,
  safeCoords = undefined,
) {
  const board = createEmptyBoard(rows, cols)
  const mineCoords = generateMineCoords(mines, rows, cols, safeCoords)
  mineCoords.forEach(([row, col]) => {
    board[row][col].isMine = true
    board[row][col].value = null
    getSurroundingCoords(board, row, col).forEach(([r, c]) => {
      const cell = board[r][c]
      if (!cell.mine) cell.value++
    })
  })
  return board
}

export function print(board) {
  board.forEach((row) => {
    const rowText = row
      .map(({ isMine, value }) => {
        if (isMine) return '[*]'
        if (value === 0) return '[ ]'
        return `[${value}]`
      })
      .join('')
    console.log(rowText)
  })
}

function getSurroundingCoords(board, row, col) {
  const rowMax = board.length
  const colMax = board[0].length
  const results = []
  for (let r = row - 1; r <= row + 1; r++) {
    if (r < 0 || r >= rowMax) continue
    for (let c = col - 1; c <= col + 1; c++) {
      if (c < 0 || c >= colMax) continue
      if (r === row && c === col) continue
      results.push([r, c])
    }
  }
  return results
}

export function createEmptyBoard(rows = 9, cols = 9) {
  return range(rows).map((r) => range(cols).map((c) => createCell(r, c)))
}

function generateMineCoords(mineCount, rows, cols, [safeR, safeC] = [-1, -1]) {
  const results = []
  const set = new Set()
  while (results.length < mineCount) {
    const x = randomInt(rows)
    const y = randomInt(cols)
    if (x === safeR && y === safeC) continue
    const t = `${x},${y}`
    if (set.has(t)) continue
    set.add(t)
    results.push([x, y])
  }
  return results
}

function createCell(row, col) {
  return {
    isMine: false,
    value: 0,
    isFlagged: false,
    isRevealed: false,
    coords: {
      row,
      col,
      key: `${row},${col}`,
    },
  }
}

export function getSize(board) {
  return [board.length, board[0].length]
}

export function revealBoardCell(board, row, col) {
  const cell = board[row][col]
  cell.isRevealed = true
  if (cell.isMine) return true
  if (cell.value === 0 && !cell.isFlagged && !cell.isMine) {
    getSurroundingCoords(board, row, col)
      .map(([rx, cx]) => board[rx][cx])
      .filter((c) => !c.isFlagged && !c.isMine && !c.isRevealed)
      .forEach((c) => {
        revealBoardCell(board, c.coords.row, c.coords.col)
      })
  }
  return false
}

export function revealAllCells(board) {
  board.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)))
}

export function checkWin(board) {
  return board
    .flatMap((cell) => cell)
    .every((cell) => !cell.isMine && cell.isRevealed)
}
