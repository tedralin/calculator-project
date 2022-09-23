//variables from html

// const buttonTexts = document.getElementsByClassName("button");
const buttonTexts = document.querySelectorAll(".button");
const displayText = document.getElementsByClassName("display-box__entry")[0];
const displayResult = document.getElementsByClassName("display-box__result")[0];
console.log (`display box result has ${displayResult}`)


var firstNumberStr = "";  //first operand for calculateNumbers
var secondNumberStr = ""; //second operand for calculateNumbers
var numberStr = "";  //working current number string
var numberSign = "+"; //check for positive/negative
var equationStr = "";
var operator = ""
var isDotPresent = false;

const initNumString = () => {
    numberStr = "";
    numberSign = "+";
};

const initVariables = () => {
    console.log ("Initializing variables")
    firstNumberStr = "";
    secondNumberStr = "";
    operator = "";
    isDotPresent = false;
    equationStr = "";
    initNumString();
} ;

const getSum = (num1, num2) => {
    console.log (`getSum: Num1 is ${num1} and Num2 is ${num2}`);
    return num1 + num2;
};

const getDifference = (num1, num2) => {
    console.log (`getDiff: Num1 is ${num1} and Num2 is ${num2}`);
    return num1 - num2;
};

const getProduct = (num1, num2) => {
    console.log (`getProduct: Num1 is ${num1} and Num2 is ${num2}`);    
    return num1 * num2;
};

const getPercentage = (num1, num2) => {
    console.log (`getPercentage: Num1 is ${num1} and Num2 is ${num2}`);    
    return num1 * num2 / 100;
};


const getQuotient = (num1, num2) => {
    console.log (`getQuotient: Num1 is ${num1} and Num2 is ${num2}`);    
    if (num2 === 0) {
        return "Denominator of 0 will result to infinity";
    }  else {
        return num1 / num2;
    }
};

const getSquareRoot = (num1) => {
    console.log (`getSquareRoot: Num1 is ${num1}`);    
    return Math.sqrt(num1);
};


const calculateNumbers = (firstNumberStr, operator, secondNumberStr) => {
    console.log (`calculateNumbers: Num1 is ${firstNumberStr} and Num2 is ${secondNumberStr} with Operator of ${operator}`) ;
    // Parameters are number in String format so we need to convert first
    const num1 = Number(firstNumberStr);
    const num2 = Number(secondNumberStr);

    if (!num1 || !num2) {
        alert ("First and Third Parameters should be numbers");
        return "error";
    };

    // -- squareroot is alt+251
    const validOperators = ["x", "+", "-", "/", "√", "%"];

    if (!validOperators.includes(operator)) {
        alert ("Invalid Operator: valid operators are x, +, -, /, √, %");
        return "error";
    };

    var total = 0;
    switch (operator) {
        case "+":
            total = getSum (num1, num2);
            break;
        case "-":
            total = getDifference (num1, num2);
            break;
        case "x":
            total = getProduct (num1, num2);
            break;
        case "/":
            total = getQuotient (num1, num2);
            break;
        case "%":
            total = getPercentage (num1, num2);
            break;
        case "√":
            total = getSquareRoot (num1);
            break;
    }
    console.log (`Total is ${total}`);
    return total;
};

const appendValueToDisplayText = (addTextValue) => {
    numberStr += addTextValue;
    equationStr += addTextValue;
    displayText.innerHTML = equationStr;
}

const assignAndCalculate = (buttonValue) => {
    console.log (`firstNumberStr is ${firstNumberStr} with operatorValue of ${buttonValue} `)
    if (firstNumberStr === "") {
        firstNumberStr = numberSign + numberStr;
        if (buttonValue != "=") {
            return;
        };
    } else  {
        secondNumberStr = numberSign + numberStr;
    };
    const totalStr = calculateNumbers(firstNumberStr, operator, secondNumberStr);
    displayResult.innerHTML = totalStr;
    if (buttonValue != "=") {
        firstNumberStr = totalStr
    }
    return ;
}

buttonTexts.forEach((button) => {
    
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;
        switch(buttonValue)  {
            case ".":
                if (isDotPresent) {break;}
                else {isDotPresent = true;}

            case "0":
                if (numberStr.length === 0 || numberStr.charAt(0) === "0")
                    {break;}
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                appendValueToDisplayText(buttonValue);
                break;
            case "+":
            case "-":
            case "x":
            case "/":                        
            case "%":   
                assignAndCalculate(buttonValue);
                appendValueToDisplayText(buttonValue);
                initNumString();
                operator = buttonValue;
                break;
            case "√":            
                appendValueToDisplayText(buttonValue);
                firstNumberStr = numberSign + numberStr;            
                console.log ("SQR: I only need one number so I need to calculate first");
                break;
            case "±":
                // switch signs if clicked
                numberSign = (numberSign == "+") ? "-" : "+";
                break;
            case "CE":            
                initNumString();
                break;    
            case "=":           
                console.log ("Equals : Calculate");
                assignAndCalculate(buttonValue);
                initVariables();
        }
    
        console.log (buttonValue);
    })  
})
console.log (`NumberStr = ${numberStr}; FirstNum = ${firstNumberStr}; Operator = ${operator}; SecondNum = ${secondNumberStr} `);

