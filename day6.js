const data = `abc

a
b
c

ab
ac

a
a
a
a

b`

// Task1
const anyAnswers = data
  .split('\n\n')                    // ['a', 'ab\nb']
  .map(x => x.split('\n').join('')) // ['a', 'abb']
  .map(answer => (new Set(answer.split(''))).size)
  .reduce((x, y) => x + y, 0)
console.log(anyAnswers)

// Task2
const allAnswers = data
  .split('\n\n')           // ['a', 'ab\nb']
  .map(x => x.split('\n')) // [['a'], ['ab', 'b']]
  .map(answers => {
    const occurs = {}
    const letters = answers.join('').split('') // 'abb'
    letters.map(l => {
      if (occurs[l]) {
        occurs[l] += 1
      } else {
        occurs[l] = 1
      }
    })
    const entries = Object.entries(occurs)
    return entries
      .filter(([letter, occur]) => occur === answers.length)
      .map(([letter, occur]) => letter)
      .length
  })
  .reduce((x, y) => x + y, 0)
console.log(allAnswers)
