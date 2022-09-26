//variables from html

// const buttonNumber = document.getElementsByClassName("button");
const buttonNumbers = document.querySelectorAll(".button-number");
const buttonOperators = document.querySelectorAll(".button-operator");
const buttonClear = document.querySelector("#button-clear");
const buttonSqrt = document.querySelector("#button-sqrt");
const buttonPct = document.querySelector("#button-pct");
const buttonEq = document.querySelector("#button-equal");
const buttonSign = document.querySelector("#button-sign");
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
    // Get precision  
    return Math.round(num1 * num2);
};

const getQuotient = (num1, num2) => {
    console.log (`getQuotient: Num1 is ${num1} and Num2 is ${num2}`);    
    if (num2 === 0) {
        return "Denominator of 0 will result to infinity";
    }  else {
        return num1 / num2;
    }
};

const calculateNumbers = (firstNumberStr, operator, secondNumberStr) => {
    console.log (`calculateNumbers: Num1 is ${firstNumberStr} and Num2 is ${secondNumberStr} with Operator of ${operator}`) ;
    // Parameters are number in String format so we need to convert first
    const num1 = Number(firstNumberStr);
    const num2 = Number(secondNumberStr);

    if (!num1) {
        alert ("First Parameters should be a number");
        return "error"
    } else if (!num2) {
        alert ("Third Parameter should be a number");
        return "error";
    };

    const validOperators = ["x", "+", "-", "÷", "%"];

    if (!validOperators.includes(operator)) {
        alert ("Invalid Operator: valid operators are x, +, -, ÷, %");
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
        case "÷":
            total = getQuotient (num1, num2);
            break;
        case "%":
            total = getPercentage (num1, num2);
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

const getSquareRoot = (sqrtNum) => {
    console.log (`getSquareRoot: Num1 is ${sqrtNum}`); 
    if (sqrtNum < 0) {
        alert ("Square Root cannot be applied to a negative number");
        return "error";
    };
    const sqrtResult = Math.sqrt(Number(sqrtNum));
    displayResult.innerHTML = sqrtResult;
    return sqrtResult;
};

const getPercentage = (num1, num2) => {
    console.log (`getPercentage: Num1 is ${num1} and Num2 is ${num2}`);    
    return num1 * num2 / 100;
};


// Append Numbers
 buttonNumbers.forEach((buttonNum) => {
    buttonNum.addEventListener("click", () => {
        const buttonNumValue = buttonNum.textContent;
        console.log("Button Num Value is " + buttonNumValue)
        
        switch(buttonNumValue)  {
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
                appendValueToDisplayText(buttonNumValue);
        }
    })  
})

// Operands
buttonOperators.forEach((buttonOper) => {
    buttonOper.addEventListener("click", () => {
        const buttonOperValue = buttonOper.textContent;

    // Move numbers to string array
    // calculate partial result
    // initialize num string

        assignAndCalculate(buttonOperValue);
        appendValueToDisplayText(buttonOperValue);
        initNumString();
        operator = buttonOperValue;
        console.log (buttonOperValue);
    })  
})

// Equal
buttonEq.addEventListener("click", () => {
    console.log ("Equals : Calculate");
    assignAndCalculate(buttonEq.textContent);
    initVariables();
}
)

// Positive / Negative
buttonSign.addEventListener("click", () => {
    console.log ("Switch Sign");
    numberSign = (numberSign == "+") ? "-" : "+";
}
)


// Square Root
buttonSqrt.addEventListener("click", () => {
    numberStr = getSquareRoot(numberSign+numberStr);
}
)

// Percentage
buttonPct.addEventListener("click", () => {
    const numValue2 = numberSign + numberStr;
    numberStr = getPercentage(firstNumberStr, numValue2);
}
)

// Clear Entry
buttonClear.addEventListener("click", () => {
    initNumString();
}
)

console.log (`NumberStr = ${numberStr}; FirstNum = ${firstNumberStr}; Operator = ${operator}; SecondNum = ${secondNumberStr} `);


