let mainDisplay = document.getElementById("mainDisplay");
let lastInputIsOperator = false;
let lastInputIsDot = false;


function clearDisplay() {
    mainDisplay.value = ""
    lastInputIsOperator = false;
    lastInputIsDot = false;
    console.log("Display Cleared")
}

function putOnDisplay(value) {
    const currentDisplay = mainDisplay.value;
    if (isOperator(value)) {
        console.log("Operator button is pressed")
        if (lastInputIsOperator) {
            console.log("Last pressed button is operator, ignore value")
            mainDisplay.value = currentDisplay.slice(0, -1) + value;
        } else {
            console.log("Last pressed button is not operator, calculate if available, add value, set lastInputIsOperator true")
            if (currentDisplay !== "") {
                calculate()
            }
            mainDisplay.value += value;
            lastInputIsOperator = true;
        }
    } else {
        console.log("Number or dot button is pressed")
        if (isDot(value)) {
            console.log("Dot button pressed")
            if (lastInputIsDot) {
                console.log("Last pressed button is dot, ignore value")
                mainDisplay.value = currentDisplay.slice(0, -1);
            } else {
                console.log("Last pressed button is not dot, set lastInputIsDot true")
                lastInputIsDot = true;
            }
        }
        console.log("Add value, set lastInputIsOperator false")
        mainDisplay.value += value;
        lastInputIsOperator = false;
    }
    // return value;
}

function calculate() {
    try {
        console.log("Calculate value on display, max decimals is 4")
        const result = eval(mainDisplay.value);
        mainDisplay.value = parseFloat(result.toFixed(4));
    } catch (e) {
        console.log("Display error")
        mainDisplay.value = "Error";
    }
}

function isOperator(character) {
    return ['+', '-', '*', '/'].includes(character);
}

function isDot(character) {
    return ['.'].includes(character);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("Enter key is pressed, calculate")
        event.preventDefault();
        calculate();
    }
});