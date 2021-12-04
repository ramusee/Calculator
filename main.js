function calc(a, b, operation) {
    let operations = {
      sum: a + b,
      sub: a - b,
      multi: a * b,
      div: a / b,
      exp: a ** b,
      rem: a % b,
    }
  
    const isNotValid = typeof a !== 'number' || typeof b !== 'number'
    const isNotDividedByZero = ('div' || 'rem') && b === 0
  
    if (isNotValid) {
      return 'Error'
    } else if (isNotDividedByZero) {
      return 'Error, enter a natural number'
    } else if (operation in operations) {
      return operations[operation]
    }
  }
  
  console.log(calc(10, 3, 'multi'))