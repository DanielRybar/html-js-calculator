class calculations {
    constructor(previousOperationElement, currentOperationElement) {
        this._previousOperationElement = previousOperationElement;
        this._currentOperationElement = currentOperationElement;
        this.clear();
    }

    clear = () => {
        this._currentOperation = "";
        this._previousOperation = "";
        this._operation = undefined;
    }
    delete = () => {
        this._currentOperation = this._currentOperation.toString().slice(0, -1);
    }
    appendNumber = (num) => {
        if(num === "." && this._currentOperation.includes(".")) return false;
        this._currentOperation = this._currentOperation.toString() + num.toString();
    }
    chooseOperation = (oper) => {
        if(this._currentOperation === "") return false;
        if(this._previousOperation !== "") this.compute(); 
        this._operation = oper;
        this._previousOperation = this._currentOperation;
        this._currentOperation = "";
    }
    compute = () => {
        let computation;
        let previous = parseFloat(this._previousOperation);
        let current = parseFloat(this._currentOperation);
        if(isNaN(previous) || isNaN(current)) return false;
        switch(this._operation) {
            case "+": computation = previous + current; break;
            case "-": computation = previous - current; break;
            case "*": computation = previous * current; break;
            case "÷": !!current ? computation = previous / current : computation = Infinity; break;
            default: return false;
        }
        this._currentOperation = computation;
        this._operation = undefined;
        this._previousOperation = "";
    }
    getDisplayNumber = (num) => {
        let stringNumber = num.toString();
        let integerDigits = parseFloat(stringNumber.split(".")[0]);
        let decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = "";
        }
        else {
            integerDisplay = integerDigits.toLocaleString('cs', { maximumFractionDigits: 0 })
        }
        if(decimalDigits != null) {
            return integerDigits + "." + decimalDigits;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplay = () => {
        this._currentOperationElement.innerText = this.getDisplayNumber(this._currentOperation);
        if(this._operation != null) {
            this._previousOperationElement.innerText = this.getDisplayNumber(this._previousOperation) + " " + this._operation;
        }
        else {
            this._previousOperationElement.innerText = "";
        }
    }
}