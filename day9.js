const data = ''

const numbers = data.split('\n').map(Number)
const preambleLength = 25

function isSumOfTwo (num, elements) {
  elements = elements.filter(el => el < num)
  return elements.some(el => elements.includes(num - el))
}

function findFirstInvalidNumber (nums) {
  for (let i = preambleLength; i < nums.length; i++) {
    const num = nums[i]
    const prevNumsWindow = nums.slice(i - preambleLength, i)
    if (!isSumOfTwo(num, prevNumsWindow)) {
      return num
    }
  }
}

// Ork make bruteforce!
function findContiguousSet (num, nums) {
  let windowSize = 2
  while (true) {
    for (let i = 0; i + windowSize <= nums.length; i++) {
      const wndw = nums.slice(i, i + windowSize)
      if (wndw.reduce((x, y) => x + y) === num) {
        return wndw
      }
    }
    windowSize++
  }
}

// Task 1
const invalidNum = findFirstInvalidNumber(numbers)
console.log('Invalid number:', invalidNum)

// Task 2
const contNums = findContiguousSet(invalidNum, numbers)
const weakness = Math.min(...contNums) + Math.max(...contNums)
console.log('Weakness:', weakness)
