function shuffleCups(cups, moves) {
  /* Metrics start */
  const start = new Date()
  const hrstart = process.hrtime()
  /* Metrics end */

  const pickUpSize = 3
  let current = cups[0]
  let pickUp = []
  let destination

  while (moves > 0) {
    // 1. Pick-up cups
    const currIndex = cups.indexOf(current)
    pickUp = cups.splice(currIndex + 1, pickUpSize)
    if (pickUp.length < pickUpSize) { // Wrap around
      pickUp.push(...cups.splice(0, pickUpSize - pickUp.length))
    }
    // 2. Select destination cup
    destination = cups.filter(c => c < current).sort().pop()
    if (destination === undefined) {
      destination = Math.max(...cups.filter(c => c !== current))
    }
    // 3. Place picked-up cups after destination
    const destIndex = cups.indexOf(destination)
    const cupsTail = cups.splice(destIndex + 1, Infinity)
    cups.push(...pickUp, ...cupsTail)
    // 4. Select new current cup
    current = cups[(cups.indexOf(current) + 1) % cups.length]
    moves -= 1
  }

  // Restructure cups
  const cupsTail = cups.splice(cups.indexOf(1), Infinity)

  /* Metrics start */
  const end = new Date() - start,
        hrend = process.hrtime(hrstart)
  console.info(`Execution time: ${hrend[1] / 1000000}ms`)
  /* Metrics end */

  return cupsTail.concat(cups)
}

const data = '389125467'

// // Task 1
const cups = data.split('').map(Number)
const newCups = shuffleCups(cups, 100)
console.log('Expected: 67384529')
console.log(`Got     : ${newCups.slice(1).join('')}`)

// Task 2
let milCups = data.split('').map(Number)
milCups = milCups.concat(
  [...Array(1000001).keys()].slice(Math.max(...milCups) + 1)
)
const moreCups = shuffleCups(milCups, 10000000)
const [x, y] = moreCups.slice(1, 3)
console.log('Expected: 149245887792')
console.log(`Got     : ${x * y}`)
console.log(x, y)
