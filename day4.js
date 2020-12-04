const data = ``

function findValidPassports1 (inp) {
  const passports = inp.split('\n\n')
  return passports.filter(ps => {
    const keys = ps.split(':').length - 1
    return keys === 8 || (keys === 7 && !ps.includes('cid:'))
  })
}
console.log(findValidPassports1(data).length)

function validateByr (obj) {
  let byr = obj.byr
  if (byr.length === 4) {
    byr = Number(byr)
    return byr >= 1920 && byr <= 2002
  }
  return false
}

function validateIyr (obj) {
  let iyr = obj.iyr
  if (iyr.length === 4) {
    iyr = Number(iyr)
    return iyr >= 2010 && iyr <= 2020
  }
  return false
}

function validateEyr (obj) {
  let eyr = obj.eyr
  if (eyr.length === 4) {
    eyr = Number(eyr)
    return eyr >= 2020 && eyr <= 2030
  }
  return false
}

function validateHgt (obj) {
  let hgt = obj.hgt
  if (hgt.endsWith('cm')) {
    const num = Number(hgt.replace('cm', ''))
    return num >= 150 && num <= 193
  }
  if (hgt.endsWith('in')) {
    const num = Number(hgt.replace('in', ''))
    return num >= 59 && num <= 76
  }
  return false
}

function validateHcl (obj) {
  let hcl = obj.hcl
  if (hcl.startsWith('#') && hcl.length === 7) {
    hcl = hcl.substr(1)
    return hcl.split('').every(s => s.charCodeAt(0) < 123)
  }
  return false
}

function validateEcl (obj) {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(obj.ecl)
}

function validatePid (obj) {
  let pid = obj.pid
  return pid.length === 9 && Number(pid) !== NaN
}

const validators = [
  validateByr,
  validateIyr,
  validateEyr,
  validateHgt,
  validateHcl,
  validateEcl,
  validatePid
]

function findValidPassports2 (inp) {
  const passports = inp.split('\n\n')
  return passports.filter(ps => {
    const keys = ps.split(':').length - 1
    if (keys < 7 || (keys === 7 && ps.includes('cid:'))) {
      return false
    }
    psObj = Object.fromEntries(ps
      .split('\n').join(' ')
      .split(' ').map(c => c.split(':')))
    return validators.every(v => v(psObj))
  })
}
console.log(findValidPassports2(data).length)
