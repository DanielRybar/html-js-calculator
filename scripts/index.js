let numberButtons;
let operationButtons;
let equalsButton;
let deleteButton;
let clearAllButton;
let previousOperationElement;
let currentOperationElement;
let calculator;

const init = () => {
    numberButtons = document.getElementsByClassName("number");
    operationButtons = document.getElementsByClassName("operation");
    equalsButton = document.getElementById("equals");
    deleteButton = document.getElementById("delete");
    clearAllButton = document.getElementById("clearAll");
    previousOperationElement = document.getElementsByClassName("previous-operand")[0];
    currentOperationElement = document.getElementsByClassName("current-operand")[0];

    calculator = new calculations(previousOperationElement, currentOperationElement);
    calculate();
    keyControl();
}

const calculate = () => {
    for(let btn of numberButtons) {
        //console.log(btn);
        btn.addEventListener("click", () => {
            calculator.appendNumber(btn.innerText);
            calculator.updateDisplay();
        });
    }
    for(let btn of operationButtons) {
        //console.log(btn);
        btn.addEventListener("click", () => {
            calculator.chooseOperation(btn.innerText);
            calculator.updateDisplay();
        });
    }

    equalsButton.addEventListener("click", () => {
        calculator.compute();
        calculator.updateDisplay();
    });
    clearAllButton.addEventListener("click", () => {
        calculator.clear();
        calculator.updateDisplay();
    });
    deleteButton.addEventListener("click", () => {
        calculator.delete();
        calculator.updateDisplay();
    });
}

const keyControl = () => {
    document.addEventListener("keydown", (e) => {
        // regularni vyrazy pro validaci
        let patternForNumbers = /[0-9]/g;
        let patternForOperators = /[+\-*\/]/g;
        if(e.key.match(patternForNumbers)) {
            e.preventDefault();
            calculator.appendNumber(e.key);
            calculator.updateDisplay();
        }
        else if(e.key === ".") {
            e.preventDefault();
            calculator.appendNumber(e.key);
            calculator.updateDisplay();
        }
        else if(e.key.match(patternForOperators)) {
            e.preventDefault();
            calculator.chooseOperation(e.key);
            calculator.updateDisplay();
        }
        else if(e.key === "Enter" || e.key === "=") {
            e.preventDefault();
            calculator.compute()
            calculator.updateDisplay()
        }
        else if(e.key === "Backspace") {
            e.preventDefault();
            calculator.delete()
            calculator.updateDisplay()
        }
        else if(e.key == "Delete") {
            e.preventDefault();
            calculator.clear()
            calculator.updateDisplay()
        }
    });
}

window.addEventListener("DOMContentLoaded", init);