const data = ''

class MovableObject {
  constructor (x, y, instructions) {
    this.x = x
    this.y = y
    this.instructions = instructions
    this.possibleDirections = ['N', 'E', 'S', 'W']
  }

  parseInstruction (instr) {
    const code = instr[0]
    const value = parseInt(instr.slice(1))
    return [code, value]
  }

  handleInstructionN (val) {
    this.y += val
  }

  handleInstructionS (val) {
    this.y -= val
  }

  handleInstructionE (val) {
    this.x += val
  }

  handleInstructionW (val) {
    this.x -= val
  }

  handleInstructionL (val) {
    this.handleTurn(val, false)
  }

  handleInstructionR (val) {
    this.handleTurn(val, true)
  }

  calculateManhattan () {
    return Math.abs(this.x) + Math.abs(this.y)
  }
}

class Ship extends MovableObject {
  sail () {
    this.instructions.forEach(instr => {
      const [code, value] = this.parseInstruction(instr)
      this[`handleInstruction${code}`](value)
    })
  }
}

class DirectedShip extends Ship {
  constructor (x, y, instructions, directionFacing) {
    super(x, y, instructions)
    this.directionFacing = directionFacing
  }

  handleInstructionF (val) {
    this[`handleInstruction${this.directionFacing}`](val)
  }

  handleTurn (val, isRight) {
    const directions = isRight
      ? this.possibleDirections
      : this.possibleDirections.slice().reverse()
    // All the turns are multiples of 90
    const sideTurns = val / 90
    const nextSideIndex = (
      (directions.indexOf(this.directionFacing) + sideTurns) %
      directions.length)
    this.directionFacing = directions[nextSideIndex]
  }
}

class Waypoint extends MovableObject {
  constructor (x, y, instructions, ship) {
    // These are relative to the ship
    super(x, y, instructions)
    this.ship = ship
  }

  handleTurn (val, isRight) {
    let sideTurns = val / 90
    const [xMul, yMul] = isRight ? [-1, 1] : [1, -1]
    while (sideTurns > 0) {
      [this.x, this.y] = [this.y * yMul, this.x * xMul]
      sideTurns -= 1
    }
  }
}

class WaypointedShip extends Ship {
  constructor (x, y, instructions) {
    super(x, y, instructions)
    this.waypoint = undefined
  }

  handleInstructionN (val) {
    this.waypoint.handleInstructionN(val)
  }

  handleInstructionS (val) {
    this.waypoint.handleInstructionS(val)
  }

  handleInstructionE (val) {
    this.waypoint.handleInstructionE(val)
  }

  handleInstructionW (val) {
    this.waypoint.handleInstructionW(val)
  }

  handleTurn (val, directions) {
    this.waypoint.handleTurn(val, directions)
  }

  handleInstructionF (val) {
    this.x += this.waypoint.x * val
    this.y += this.waypoint.y * val
  }
}

// Task 1
const ship = new DirectedShip(0, 0, data.split('\n'), 'E')
ship.sail()
console.log(ship.calculateManhattan())

// Task 2
const coolShip = new WaypointedShip(0, 0, data.split('\n'), 'E')
coolShip.waypoint = new Waypoint(10, 1, 'E', '', coolShip)
coolShip.sail()
console.log(coolShip.calculateManhattan())
