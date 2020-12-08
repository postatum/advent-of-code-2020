const data = ''

class TreeNode {
  constructor (name) {
    this.name = name
    this.parents = []
    this.children = []
  }

  addParent (parentNode) {
    if (this.hasParent(parentNode.name)) {
      return
    }
    this.parents.push(parentNode)
  }

  addChild (childNode, qtyInParent) {
    if (this.hasChild(childNode.name)) {
      return
    }
    this.children.push({
      name: childNode.name,
      node: childNode,
      qty: qtyInParent
    })
  }

  hasParent (name) {
    return this.parents.filter(p => p.name === name).length > 0
  }

  hasChild (name) {
    return this.children.filter(p => p.name === name).length > 0
  }

  isLeaf () {
    return this.children.length === 0
  }
}

function constructTree () {
  const nodesIndex = {}
  const cleanData = data
    .split(' bags.').join('')
    .split(' bag.').join('')
    .split(' bags').join('')
    .split(' bag').join('')
  const rules = cleanData.split('\n')
  rules.forEach(rule => {
    const [parentName, children] = rule.split(' contain ')
    const parentNode = nodesIndex[parentName] || new TreeNode(parentName)
    nodesIndex[parentName] = parentNode
    if (children.startsWith('no')) {
      return
    }
    children
      .split(',')
      .forEach(rule => {
        let [qty, ...childName] = rule.trim().split(' ')
        childName = childName.join(' ')
        const childNode = nodesIndex[childName] || new TreeNode(childName)
        childNode.addParent(parentNode)
        parentNode.addChild(childNode, Number(qty))
        nodesIndex[childName] = childNode
      })
  })
  return nodesIndex
}

function getAncestors (node, collected) {
  collected = collected || []
  const ancestors = node.parents
  collected.push(node.name)
  ancestors.forEach(anc => {
    if (!collected.includes(anc.name)) {
      ancestors.push(...getAncestors(anc, collected))
    }
  })
  return ancestors
}

function countInnerBags (bag) {
  return bag.children
    .map(c => c.qty + c.qty * countInnerBags(c.node))
    .reduce((x, y) => x + y, 0)
}

function runTasks () {
  // Task1
  const index = constructTree()
  const names = new Set()
  Object
    .entries(index)
    .filter(([name, node]) => node.hasChild('shiny gold'))
    .forEach(([name, node]) => {
      names.add(name)
      const ancestors = getAncestors(node)
      ancestors.forEach(a => names.add(a.name))
    })
  console.log(names.size)

  // Task2
  const bag = index['shiny gold']
  console.log(countInnerBags(bag))
}

runTasks()
