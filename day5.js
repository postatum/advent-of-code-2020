const data = ``

function calculateId ([rowCode, seatCode]) {
  return calculate(rowCode, 0, 127, 'B') * 8 + calculate(seatCode, 0, 7, 'R')
}

function calculate (code, min, max, incLetter) {
  if (code.length === 0) {
    return max
  }
  const [fst, ...rest] = code
  const mid = (min + max) / 2
  const [newMin, newMax] = fst === incLetter
    ? [Math.round(mid), max]
    : [min, Math.floor(mid)]
  return calculate(rest, newMin, newMax, incLetter)
}

function tasks () {
  const bpasses =  data.split('\n')
  const ids = bpasses
    .map(c => c.split(''))
    .map(c => [c.slice(0, 7), c.slice(7)])
    .map(calculateId)

  // // Task 1
  console.log(Math.max(...ids))

  // Task 2
  const sortedIds = ids.sort((x, y) => x - y)
  const nearestMin = sortedIds.reduce(
    (acc, x) => x - acc >= 2 ? acc : x,
    initialValue=sortedIds[0]
  )
  console.log(nearestMin + 1)
}

tasks()
