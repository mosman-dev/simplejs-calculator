
const calculator = {
    dispValue: '0',
    firstOp: null,
    waitSecondOp: false,
    op: null
};

function inputDigit(digit) {
    const { dispValue, waitSecondOp } = calculator;

    if (waitSecondOp) {
        calculator.dispValue = digit;
        calculator.waitSecondOp = false;
    } else {
        calculator.dispValue = dispValue === '0' ? digit : dispValue + digit;
    }
}

function inputDec(dot) {
    if (calculator.waitSecondOp) return;

    if (!calculator.dispValue.includes(dot)) {
        calculator.dispValue += dot;
    }
}

function handleOp(nextOp) {
    const { firstOp, dispValue, op } = calculator;
    const inputValue = parseFloat(dispValue);

    if (op && calculator.waitSecondOp) {
        calculator.op = nextOp;
        return;
    }

    if (firstOp == null) {
        calculator.firstOp = inputValue;
    } else if (op) {
        const currValue = firstOp || 0;
        const result = performCalc[op](currValue, inputValue);

        calculator.dispValue = String(result);
        calculator.firstOp = result;
    }

    calculator.waitSecondOp = true;
    calculator.op = nextOp;
}

const performCalc = {
    '/': (firstOp, secondOp) => firstOp / secondOp,
    '*': (firstOp, secondOp) => firstOp * secondOp,
    '+': (firstOp, secondOp) => firstOp + secondOp,
    '-': (firstOp, secondOp) => firstOp - secondOp,
    '=': (firstOp, secondOp) => secondOp
};

function resetCalc() {
    calculator.dispValue = '0';
    calculator.firstOp = null;
    calculator.waitSecondOp = false;
    calculator.operator = null;
}

function updateDisp() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.dispValue;
}

updateDisp();

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (e) => {
    const { target } = e;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOp(target.value);
        updateDisp();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDec(target.value);
        updateDisp();
        return
    }

    if (target.classList.contains('all-clear')) {
        resetCalc();
        updateDisp();
        return;
    }

    inputDigit(target.value);
    updateDisp();
});