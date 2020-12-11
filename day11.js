const data = ''

const seatsMatrix = data
  .split('\n')
  .map(r => r.split(''))

function isOccupied (seat) { return seat === '#' }
function isEmpty (seat) { return seat === 'L' }

function countOccupiedSeats (seats) {
  return seats.filter(isOccupied).length
}

function getAdjacentSeats (mtx, rowNum, seatNum) {
  const prevRow = mtx[rowNum - 1] || []
  const nextRow = mtx[rowNum + 1] || []
  const adjacentSeats = [
    mtx[rowNum][seatNum - 1], // left
    mtx[rowNum][seatNum + 1], // right
    prevRow[seatNum], // top
    nextRow[seatNum], // down
    prevRow[seatNum - 1], // top left
    prevRow[seatNum + 1], // top right
    nextRow[seatNum - 1], // bottom left
    nextRow[seatNum + 1] // bottom right
  ]
  return adjacentSeats
    .filter(s => s !== undefined)
}

function mutateMatrix (matrix) {
  return matrix.map((row, rowNum) => {
    return row.map((seat, seatNum) => {
      const adjacentSeats = getAdjacentSeats(matrix, rowNum, seatNum)
      const occupiedAdjacentCount = countOccupiedSeats(adjacentSeats)
      if (isEmpty(seat) && occupiedAdjacentCount === 0) {
        return '#'
      }
      if (isOccupied(seat) && occupiedAdjacentCount >= 4) {
        return 'L'
      }
      return seat
    })
  })
}

function task1 () {
  let previous = seatsMatrix.slice()
  let current = mutateMatrix(previous)
  while (current.toString() !== previous.toString()) {
    [previous, current] = [current, mutateMatrix(current)]
  }
  return countOccupiedSeats(
    current.toString().split(',')
  )
}

console.log(task1())
