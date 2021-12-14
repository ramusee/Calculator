function calc(operation, a, b) {
  if (operation === undefined || a === undefined || b === undefined) return "Error";
  
      const operations = {
        '+': () => +a + +b,
        '-': () => a - b,
        '×': () => a * b,
        '÷': () => a / b,
      }
  
      if (!(operation in operations)) return "unknown operation";
      const result = operations[operation]();
      return isFinite(result) ? result : "Error";
  }
  
  
  const screen = document.querySelector(".screen");
  const buttons = {
    btnsNum: document.querySelectorAll(".button_num"),
    btnsOperation: document.querySelectorAll(".button_operation"),
    btnEqual: document.querySelector(".button_equal"),
    btnBackspace: document.querySelector(".button_backspace"),
    btnC: document.querySelector(".button_C")
  }
  
  let a = null;
  let b = null;
  let operation = null;
  let result = null;
  
  for (let button of buttons.btnsNum) {
    button.addEventListener('click', outputNum);
    function outputNum() {
      if (result !== null) {
        a = null;
        b = null;
        result = null;
        screen.innerHTML = null;
      } else if (a === null) {
        screen.innerHTML === "0" ? screen.innerHTML = button.innerHTML : screen.innerHTML += button.innerHTML;
      } else if (b === null) {
        b = screen.innerHTML = button.innerHTML;
      } else {
        screen.innerHTML === "0" ? screen.innerHTML = button.innerHTML : screen.innerHTML += button.innerHTML;
        b = screen.innerHTML;
      }
      if (screen.innerHTML.length >= 5) {
      screen.innerHTML = screen.innerHTML.slice(0, 6);
      }
    }
  }
  
  for (let operand of buttons.btnsOperation) {
    operand.addEventListener('click', outputOperand);
    function outputOperand(){
      if (result !== null) {
        b = null;
        result = null;
      } else if (a !== null && b !== null && operation !== null) {
          screen.innerHTML = calc(operation, a, b);
          a = screen.innerHTML;
          b = null;
          if (screen.innerHTML.length > 5) {
            screen.innerHTML = (+screen.innerHTML).toExponential(1);
          }
        }
       operation = operand.innerHTML;
        
      if (a === null) {
          a = screen.innerHTML;
    }
  }
}
  buttons.btnEqual.addEventListener('click', outputEqual);
  function outputEqual() {
    if (a !== null && b !== null && operation !== null) {
        result = screen.innerHTML = calc(operation, a, b);
        if (!Number.isInteger(result) && typeof result !== 'string') {
          screen.innerHTML = result.toFixed(2);
        }

        a = result;

        if (screen.innerHTML.length > 5) {
          screen.innerHTML = (+screen.innerHTML).toExponential(1);
        }
      }

      if (a !== null && b === null && operation !== null) {
        b = a;
        a = result = screen.innerHTML = calc(operation, a, b);
      }
  }

  buttons.btnC.addEventListener('click', reset);
    function reset() {
      screen.innerHTML = '0';
      a = null;
      b = null;
      result = null;
      operation = null;
    }

  buttons.btnBackspace.addEventListener('click', outputBackspace);
  function outputBackspace() {
      if (screen.innerHTML.length === 1) {
        screen.innerHTML = 0;
      } else screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
  
      if (a !== null) {
        b = screen.innerHTML;
      }
  
      if (result !== null) {
        result = null;
        a = null;
        b = null;
        operation = null;
      }
  }