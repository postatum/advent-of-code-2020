const data = ''

// Task1
const anyAnswers = data
  .split('\n\n') // ['a', 'ab\nb']
  .map(x => x.split('\n').join('')) // ['a', 'abb']
  .map(answer => (new Set(answer.split(''))).size)
  .reduce((x, y) => x + y, 0)
console.log(anyAnswers)

// Task2
function listsIntersection ([fst, ...rest]) {
  return fst.filter(x => rest.every(r => r.includes(x)))
}

const allAnswers = data
  .split('\n\n') // ['a', 'ab\nb']
  .map(x => x.split('\n').map(y => y.split(''))) // [['a'], ['ab', 'b']]
  .map(answers => listsIntersection(answers).length)
  .reduce((x, y) => x + y, 0)
console.log(allAnswers)
