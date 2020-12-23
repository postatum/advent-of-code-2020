function getIndex (arr, el) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === el) {
      return i
    }
  }
  return -1
}

function takeWhile (arr, fn) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i]
    if (!fn(el)) {
      return res
    }
    res.push(el)
  }
  return res
}

function shuffleCups(cups, moves) {
  /* Metrics start */
  const start = new Date()
  /* Metrics end */

  const pickUpSize = 3
  let current = cups[0]
  let pickUp = []
  let destination

  const sortedCups = cups
    .slice()
    .sort((x, y) => x - y)
  const lastSortedCups = sortedCups.slice(-5)


  while (moves > 0) {
    destination = undefined

    // 1. Pick-up cups
    const currIndex = getIndex(cups, current)
    pickUp = cups.splice(currIndex + 1, pickUpSize)
    if (pickUp.length < pickUpSize) { // Wrap around
      pickUp.push(...cups.splice(0, pickUpSize - pickUp.length))
    }

    // 2. Select destination cup
    const sliced = sortedCups
      .slice(0, getIndex(sortedCups, current))
    destination = takeWhile(sliced, c => c < current)
      .filter(c => !pickUp.includes(c))
      .sort((x, y) => x - y)
      .pop()
    if (destination === undefined) {
      destination = Math.max(
        ...lastSortedCups
            .filter(c => c !== current && !pickUp.includes(c))
      )
    }

    // 3. Place picked-up cups after destination
    const destIndex = getIndex(cups, destination)
    const cupsTail = cups.splice(destIndex + 1, Infinity)
    cups.push(...pickUp, ...cupsTail)

    // 4. Select new current cup
    current = cups[(getIndex(cups, current) + 1) % cups.length]
    moves -= 1
  }

  // Restructure cups
  const cupsTail = cups.splice(getIndex(cups, 1), Infinity)

  /* Metrics start */
  console.info(`Execution time: ${(new Date() - start) / 1000} sec`)
  /* Metrics end */

  return cupsTail.concat(cups)
}

const data = '389125467'

// Task 1
const cups = data.split('').map(Number)
const newCups = shuffleCups(cups, 100)
console.log('Expected: 67384529')
console.log(`Got     : ${newCups.slice(1).join('')}`)

// Task 2
// let milCups = data.split('').map(Number)
// milCups = milCups.concat(
//   [...Array(1000001).keys()].slice(Math.max(...milCups) + 1)
// )
// // const moreCups = shuffleCups(milCups, 10000000)
// const moreCups = shuffleCups(milCups, 500)
// const [x, y] = moreCups.slice(1, 3)
// console.log('Expected: 149245887792')
// console.log(`Got     : ${x * y}`)
// // console.log(x, y)
