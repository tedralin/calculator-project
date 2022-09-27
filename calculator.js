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


var firstNumberStr = "";  //first operand for calculateNumbers
var secondNumberStr = ""; //second operand for calculateNumbers
var equationStr = "";
var numberStr = "";  //working current number string; used for display
// var numberCalc = ""; // current number will be used for calc (value after √ or %)
var numberSign = "+"; //check for positive/negative
var operator = ""
var isDotPresent = false;
var subTotal = "";

const initNumString = () => {
    numberStr = "";
    numberSign = "+";
};

const initVariables = () => {
    console.log ("Initializing variables")
    firstNumberStr = "";
    secondNumberStr = "";
    operator = "";
    equationStr = "";
    isDotPresent = false;
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
    return (num1 * num2);
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
        alert ("First Parameter should be a number");
        return "error"
    } else if (!num2) {
        alert ("Third Parameter should be a number");
        return "error";
    };

    const validOperators = ["x", "+", "-", "÷"];

    if (!validOperators.includes(operator)) {
        alert ("Invalid Operator: valid operators are x, +, -, ÷");
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

const formatSignedNumStr = () => {
    if (numberSign === "-") {
        return `(${numberSign}${numberStr})`;
    } else {
        return  numberStr;
    }
}

const assignNumStrfromSubTotal = () => {
    // use previous value from SubTotal
    if (subTotal < 0) {
        numberStr = Math.abs(subTotal);
        numberSign = "-";
    } else if (subTotal >=0 ) {
        numberStr = subTotal;
    }
    
    // numberCalc = numberStr;
}

const appendNumStrToDisplayText = (buttonVal) => {
    const strNumButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ""];
    const validSignStr = "±";

    // console.log (`AppenNumStr start: equation str = ${equationStr} for button ${buttonVal}; number Calc = ${numberCalc}`);
    
    if (strNumButtons.includes (buttonVal)) {numberStr += buttonVal;};
    const signedNumStr = formatSignedNumStr();
    displayText.innerHTML = equationStr + signedNumStr;
    // console.log (`AppendNumStr End: equation str = ${equationStr}; numerStr = ${numberStr}; number Calc = ${numberCalc}`);
    return;
}

const appendOperToDisplayText = (buttonVal) => {
    const strValidOperands = ["+", "-", "x", "÷"];

    // console.log (`AppendOperStr start: equation str = ${equationStr} for button ${buttonVal}; number Calc = ${numberCalc}`);
    if (!strValidOperands.includes (buttonVal)) {return;}
    const signedNumStr = formatSignedNumStr();
    equationStr += signedNumStr + buttonVal;
    displayText.innerHTML = equationStr;
    // console.log (`AppendOperStr End:equation str = ${equationStr} for button ${buttonVal}; number Calc = ${numberCalc}`);        
}

const appendSqrtToDisplayText = (buttonVal) => {
    const sqrt = "√";

    // console.log (`AppendSqrt start: equation str = ${equationStr} for button ${buttonVal}; number Calc = ${numberCalc}`);
    if (buttonVal != sqrt) {return;}
    displayText.innerHTML = equationStr + `${sqrt}(${numberStr})`;
    
    // console.log (`AppendSqrt End: equation str = ${equationStr}; New numberStr is = ${numberStr}; number Calc = ${numberCalc}`);
}

const appendPctToDisplayText = (buttonVal) => {
    const pct = "%";
    // console.log (`AppendPct start: equation str = ${equationStr} for button ${buttonVal}; number Calc = ${numberCalc}`);
    if (buttonVal != pct) {return;}
    displayText.innerHTML = equationStr + `${pct}(${numberStr})`;
    
    // console.log (`AppendPctt End: equation str = ${equationStr}; New numberStr is = ${numberStr}; number Calc = ${numberCalc}`);
}


const assignAndCalculate = (buttonValue) => {
    console.log (`Start: firstNumberStr is ${firstNumberStr} with operatorValue of ${buttonValue} `)
    if (firstNumberStr === "") {
        // firstNumberStr = numberSign + numberCalc;
        firstNumberStr = numberSign + numberStr;
        console.log (`Mid: firstNumberStr is ${firstNumberStr} with operatorValue of ${buttonValue} `)        
        if (buttonValue != "=") {
            return false;
        };
    } else  {
        // secondNumberStr = numberSign + numberCalc;
        secondNumberStr = numberSign + numberStr;
    };
    const totalStr = calculateNumbers(firstNumberStr, operator, secondNumberStr);
    displayResult.innerHTML = totalStr;
    if (buttonValue != "=") {
        firstNumberStr = totalStr
    }
    console.log (`End: firstNumberStr is ${firstNumberStr} with operatorValue of ${buttonValue} `)        
    return totalStr;
}

const getSquareRoot = (sqrtNum) => {
    console.log (`getSquareRoot: Num1 is ${sqrtNum}`); 
    if (sqrtNum < 0) {
        alert ("Square Root cannot be applied to a negative number");
        return false;
    };
    const sqrtResult = Math.sqrt(Number(sqrtNum));
    displayResult.innerHTML = sqrtResult;
    return sqrtResult;
};

const getPercentage = (num1, num2) => {
    console.log (`getPercentage: Num1 is ${num1} and Num2 is ${num2}`);    
    return num1 * num2 / 100;
};


// Numbers
 buttonNumbers.forEach((buttonNum) => {
    buttonNum.addEventListener("click", () => {
        const buttonNumValue = buttonNum.textContent;
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
                appendNumStrToDisplayText(buttonNumValue);
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
        // assignAndCalculate(buttonOperValue);

        if (numberStr === "" && subTotal !="" && firstNumberStr === "") {
            assignNumStrfromSubTotal();
        };
        assignAndCalculate(buttonOperValue);        
        appendOperToDisplayText(buttonOperValue);
        initNumString();
        operator = buttonOperValue;

    })  
})

// Equal
buttonEq.addEventListener("click", () => {
    console.log ("Equals : Calculate");
    // formatCalcNum();
    subTotal = assignAndCalculate(buttonEq.textContent);
    initVariables();
}
)

// Positive / Negative
buttonSign.addEventListener("click", () => {
    console.log ("Switch Sign");
    numberSign = (numberSign == "+") ? "-" : "+";
    appendNumStrToDisplayText(buttonSign.textContent)
}
)


// Square Root
buttonSqrt.addEventListener("click", () => {
    appendSqrtToDisplayText(buttonSqrt.textContent);
    const sqrtResult = getSquareRoot(numberSign+numberStr);
    if (sqrtResult) {
        numberStr = sqrtResult;
    };

}
)

// Percentage
buttonPct.addEventListener("click", () => {
    appendPctToDisplayText(buttonPct.textContent);
    const numValue2 = numberSign + numberStr;
    const pctResult  = getPercentage(firstNumberStr, numValue2);
    if (pctResult) {
        numberStr = pctResult;
    }
}
)

// Clear Entry
buttonClear.addEventListener("click", () => {
    initNumString();
    appendNumStrToDisplayText("");
}
)




