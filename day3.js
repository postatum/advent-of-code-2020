const data = ``

const rows = data.split('\n')
const steps1 = [
  [3, 1]
]
const steps2 = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

function countTrees ([stepsRight, stepsDown]) {
  let treesMet = 0
  let step = 0
  let positionRight = 0

  for (let i = 0; i < rows.length;) {
    let row = rows[i]
    let repeats = Math.floor(positionRight / row.length) + 1
    // This could be reworked with a % division
    row = row.repeat(repeats)
    if (row[positionRight] === '#') {
      treesMet += 1
    }
    i = i + stepsDown
    positionRight += stepsRight
  }
  return treesMet
}

console.log(countTrees(steps1[0]))
console.log(steps2.map(countTrees).reduce((x, y) => x * y))
