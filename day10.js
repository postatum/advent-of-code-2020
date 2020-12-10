const data = ''

function prepareData (raw) {
  const processed = raw
    .split('\n')
    .map(Number)
    .concat(0)
    .sort((x, y) => x - y)
  processed.push(Math.max(...processed) + 3)
  return processed
}

function task1 () {
  const dt = prepareData(data)
  const ones = []
  const threes = []
  for (let i = 0; i < dt.length - 1; i++) {
    const diff = dt[i + 1] - dt[i]
    diff === 1 ? ones.push(diff) : threes.push(diff)
  }
  console.log(ones.length * threes.length)
}

task1()
