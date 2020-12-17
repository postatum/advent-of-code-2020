const data = `..#..##.
#.....##
##.#.#.#
..#...#.
.###....
######..
.###..#.
..#..##.`

const startingLayer = data.split('\n').map(r => r.split(''))
const cubesMatrix = [startingLayer]

const ACTIVE = '#'
const INACTIVE = '.'

function isActive (cube) { return cube === ACTIVE }

function deepCopy (lst) {
  return JSON.parse(JSON.stringify(lst))
}

function countActiveCubes (cubes) {
  return cubes.filter(isActive).length
}

function wrapInInactives (matrix) {
  const inactiveLayer = matrix[0].map(row => row.map(x => INACTIVE))
  // Add inactive layers
  const wrappedMatrix = [
    deepCopy(inactiveLayer),
    ...matrix,
    deepCopy(inactiveLayer)
  ]
  return wrappedMatrix.map(layer => {
    // Add inactive rows
    layer = layer.map(row => {
      // Add inactive positions
      return ['.', ...row, '.']
    })
    const inactiveRow = layer[0].map(item => INACTIVE)
    return [
      deepCopy(inactiveRow),
      ...layer,
      deepCopy(inactiveRow)
    ]
  })
}

function getAdjacentCubes (mtx, layerNum, rowNum, cubeNum) {
  const adjacentCubes = []
  // Current layer
  adjacentCubes.push(...getAdjacentCubesInLayer(
    mtx[layerNum], rowNum, cubeNum))

  const prevLayer = mtx[layerNum - 1]
  if (prevLayer !== undefined) {
    adjacentCubes.push(...getAdjacentCubesInLayer(
      prevLayer, rowNum, cubeNum, true))
  }

  const nextLayer = mtx[layerNum + 1]
  if (nextLayer !== undefined) {
    adjacentCubes.push(...getAdjacentCubesInLayer(
      nextLayer, rowNum, cubeNum, true))
  }
  return adjacentCubes
}

function getAdjacentCubesInLayer (layer, rowNum, cubeNum, includeCenter) {
  const prevRow = layer[rowNum - 1] || []
  const nextRow = layer[rowNum + 1] || []
  const adjacentCubes = [
    layer[rowNum][cubeNum - 1], // left
    layer[rowNum][cubeNum + 1], // right
    prevRow[cubeNum], // top
    nextRow[cubeNum], // down
    prevRow[cubeNum - 1], // top left
    prevRow[cubeNum + 1], // top right
    nextRow[cubeNum - 1], // bottom left
    nextRow[cubeNum + 1] // bottom right
  ]
  if (includeCenter) {
    adjacentCubes.push(layer[rowNum][cubeNum]) // center
  }
  return adjacentCubes
}

function mutateMatrix (matrix) {
  const matrixCopy = deepCopy(matrix)
  return matrix.map((layer, layerNum) => {
    return layer.map((row, rowNum) => {
      return row.map((cube, cubeNum) => {
        const adjacentCubes = getAdjacentCubes(matrixCopy, layerNum, rowNum, cubeNum)
        const activeAdjacentCount = countActiveCubes(adjacentCubes)

        if (activeAdjacentCount === 3) {
          return ACTIVE
        }
        if (isActive(cube) && activeAdjacentCount === 2) {
          return ACTIVE
        }
        return INACTIVE
      })
    })
  })
}

function task1 () {
  let cycles = 6
  let matrix = deepCopy(cubesMatrix)
  while (cycles > 0) {
    matrix = wrapInInactives(matrix)
    matrix = mutateMatrix(matrix)
    cycles -= 1
  }
  return countActiveCubes(matrix.flat().flat())
}

console.log(task1())
