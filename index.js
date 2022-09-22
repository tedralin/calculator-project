//variables from html

// const buttonTexts = document.getElementsByClassName("button");
const buttonTexts = document.querySelectorAll(".button");
console.log (buttonTexts);


buttonTexts.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.textContent;
        console.log (buttonValue);
    })  
    // switch (buttonValue)  {
    //     case: 0

    // }
});
    

