



if (!num1 || !num2) {
    alert ("First and Third Parameters should be numbers");
};

// -- squareroot is alt+251
const validOperators = ["*", "+", "-", "/", "√", "%"];

if (validOperators.includes (operator)) {
    // continue;
} else {
    alert ("Invalid Operator: valid operators are *, +, -, /, √, %");
};


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
    return num1 * num2;50
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

const calculateNumbers = (num1, operator, num2) => {
    console.log (`calculateNumbers: Num1 is ${num1} and Num2 is ${num2} with Operator of ${operator}`) ;
    var total = 0;
    switch (operator) {
        case "+":
            total = getSum (num1, num2);
            break;
        case "-":
            total = getDifference (num1, num2);
            break;
        case "*":
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
    return total;
}

const mainTotal = calculateNumbers (num1, operator, num2);
alert (`${num1} ${operator} ${num2} = ${mainTotal}`)
