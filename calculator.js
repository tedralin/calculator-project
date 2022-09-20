const num1 = Number(prompt("First number: "));
const operator = prompt("Operator: ");
const num2 = Number(prompt("Second number: "));

console.log (`Num1 is ${num1} with a type of ${typeof num1}`)
console.log (`Num2 is ${num2} with a type of ${typeof num2}`)

if (!num1 || !num2) {
    alert ("First and Third Parameters should be numbers");
};

const validOperators = ["*", "+", "-", "/"];

if (validOperators.includes (operator)) {
    // continue;
} else {
    alert ("Invalid Operator: valid operators are *, +, -, /");
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

const getQuotient = (num1, num2) => {
    console.log (`getQuotient: Num1 is ${num1} and Num2 is ${num2}`);    
    if (num2 === 0) {
        return "Denominator of 0 will result to infinity";
    }  else {
        return num1 / num2;
    }
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
    }
    return total;
}

const mainTotal = calculateNumbers (num1, operator, num2);
alert (`${num1} ${operator} ${num2} = ${mainTotal}`)
