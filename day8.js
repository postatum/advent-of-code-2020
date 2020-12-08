const data = ''

class Program {
  constructor (inp) {
    this.reset(inp.split('\n'))
  }

  reset (operations) {
    this.operations = operations
    this.accumulator = 0
    this.operationIndex = 0
    this.operationsRan = []
    this.latestOperation = {}
  }

  aboutToLoop () {
    return this.operationsRan.includes(this.operationIndex)
  }

  endReached () {
    return this.operationIndex >= this.operations.length
  }

  rememberOperation () {
    this.operationsRan.push(this.operationIndex)
  }

  parseOperation (operationStr) {
    const [code, numExpr] = operationStr.split(' ')
    const expr = numExpr[0]
    const num = Number(numExpr.slice(1))
    return { code, expr, num }
  }

  accHandle () {
    this.latestOperation.expr === '-'
      ? this.accumulator -= this.latestOperation.num
      : this.accumulator += this.latestOperation.num
    this.operationIndex += 1
  }

  jmpHandle () {
    this.latestOperation.expr === '-'
      ? this.operationIndex -= this.latestOperation.num
      : this.operationIndex += this.latestOperation.num
  }

  nopHandle () {
    this.operationIndex += 1
  }

  run () {
    while (!this.aboutToLoop() && !this.endReached()) {
      this.rememberOperation()
      this.latestOperation = this.parseOperation(
        this.operations[this.operationIndex])
      this[`${this.latestOperation.code}Handle`]()
    }
  }

  findSwappableIndexes (operations) {
    const indexes = []
    operations.forEach((op, idx) => {
      if (op.startsWith('jmp') || op.startsWith('nop')) {
        indexes.push(idx)
      }
    })
    return indexes
  }

  swapOperation (operations, idx) {
    const op = operations[idx]
    operations[idx] = op.startsWith('jmp')
      ? op.replace('jmp', 'nop')
      : op.replace('nop', 'jmp')
  }

  correctRun () {
    const swappableIndexes = this.findSwappableIndexes(this.operations)
    const operationsBackup = this.operations.slice()
    while (!this.endReached()) {
      this.reset(operationsBackup.slice())
      this.swapOperation(this.operations, swappableIndexes.pop())
      this.run()
    }
  }
}

function task1 () {
  const machine = new Program(data)
  machine.run()
  console.log(machine.accumulator)
}

task1()

function task2 () {
  const machine = new Program(data)
  machine.correctRun()
  console.log(machine.accumulator)
}

task2()
