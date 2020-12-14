const data = ''

function toBinary (num) { return num.toString(2).padStart(36, '0') }
function toDecimal (str) { return parseInt(str, 2) }

function parseMaskLine (line) {
  return line.split('= ').pop().split('')
}

function parseMemLine (line) {
  const [memPart, numStr] = line.split('] = ')
  const memAddr = memPart.split('[').pop()
  return [memAddr, parseInt(numStr)]
}

// mask is a list of strings
function applyStrangeBitmask (num, mask) {
  return toDecimal(toBinary(num)
    .split('')
    .map((n, i) => mask[i] === 'X' ? n : mask[i])
    .join(''))
}

function applyMemoryAddrBitmask (memAddr, mask) {
  let maskedAddrs = []
  const initialAddr = toBinary(parseInt(memAddr))
    .split('')
    .map((n, i) => mask[i] === '1' ? mask[i] : n)
  maskedAddrs.push(initialAddr)
  mask.forEach((bit, i) => {
    if (bit !== 'X') {
      return
    }
    const variations = []
    maskedAddrs.forEach(addr => {
      const newAddr = addr.slice()
      newAddr[i] = '0'
      variations.push(newAddr.slice())
      newAddr[i] = '1'
      variations.push(newAddr.slice())
    })
    maskedAddrs.push(...variations)
  })
  maskedAddrs = maskedAddrs.map(addr => toDecimal(addr.join('')))
  return new Set(maskedAddrs)
}

function processDockData (maskAndSave) {
  const memory = {}
  const lines = data.split('\n')
  let mask = ''
  lines.forEach(line => {
    if (line.startsWith('mask')) {
      mask = parseMaskLine(line)
      return
    }
    const [memAddr, num] = parseMemLine(line)
    maskAndSave(memAddr, num, mask, memory)
  })
  return Object
    .values(memory)
    .reduce((x, y) => x + y)
}

// Task 1
console.log(processDockData((memAddr, num, mask, memory) => {
  memory[memAddr] = applyStrangeBitmask(num, mask)
}))

// Task 2
console.log(processDockData((memAddr, num, mask, memory) => {
  const maskedMemNums = applyMemoryAddrBitmask(memAddr, mask)
  maskedMemNums.forEach(mmAddr => { memory[mmAddr] = num })
}))
