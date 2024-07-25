let inputs = [];
let operands = [];
let opr = []
let result = 0;
let operatorStatus = false;
let singleOperand = "";


const screen = document.querySelector(".screen")
const numbers = document.querySelectorAll(".number")

numbers.forEach(function(number){
    number.addEventListener("click", function(){
        inputs.push(Number(number.innerHTML))
        screen.innerHTML = inputs.map((input)=>(
            input
        )).join(" ").replace(/\s/g, "")
        operatorStatus = true
        console.log(inputs)
    })
})

const operators = document.querySelectorAll(".operator")

operators.forEach(function(operator){
    operator.addEventListener("click", function(){
       if(operatorStatus) inputs.push(operator.innerHTML)
        screen.innerHTML = inputs.map((input)=>(
            input
        )).join("  ")
        operatorStatus = false;
        console.log(inputs)
    })
})

const eqauls = document.querySelector(".equals")
eqauls.addEventListener("click", function(){
   if(operatorStatus){
    adjust();
   }
   
})
const AC = document.querySelector(".AC")
AC.addEventListener("click", function(){
   screen.innerHTML = "0.0"
   inputs = [];
   reset()
})
const cancel = document.querySelector(".cancel")
cancel.addEventListener("click" , function(){
    console.log("pop")
   inputs.pop()
   screen.innerHTML = inputs.map((input)=>(
    input
)).join(" ").replace(/\s/g, "").toLocaleString()
   console.log(inputs)
})
function reset(){  
    operands = [];
    opr = []
    result = 0;
    operatorStatus = false;
    singleOperand = "";
}

function adjust(){

  inputs.map((input , index)=>{
     
    if(isNaN(input)){
        if( input == "."){
            singleOperand =  singleOperand + input
        }else{
            operands.push(Number(singleOperand))
        opr.push(input)
        singleOperand = ""
        }
        
    }else{
        if( index === (inputs.length - 1 )){
            singleOperand =  singleOperand + input.toString()
            operands.push(Number(singleOperand))
            calculate()
        }else{
            singleOperand =  singleOperand + input.toString()

        }
        
    }
  })
}

function calculate(){
     let firstTime = false;
    if(opr[0] === "+" || opr[0] === "-" ){
        console.log("i am here  +  -")
        result = 0
        if(opr[0] === "-"){
            firstTime = true;
            result = operands[0]
        }
    }
    if(opr[0] === "X" || opr[0] === "/" ){
        result = 1
    if(opr[0] === "/"){
        firstTime = true;
        result = operands[0]
    }
    }
    for (let i = 0; i < operands.length; i++) {
        if (i % 2 == 0 && i < (operands.length - 1)) {
          switch (opr[i]) {
            case "+":
              result += operands[i];
              break;
            case "-":
                if(!firstTime){
                    result -= operands[i]
                  }else{
                    result = operands[i]
                  };
              break;
              case "X":
              result *= operands[i];
              break;
              case "%":
                if(i < operands.length - 1){
                    result = operands[i] % operands[i  + 1];
                   }
              break;
            case "/":
              if(!firstTime){
                result /= operands[i]
              }else{
                result = operands[i]
              };
              break;
          }
          console.log(result, "result", operands[i], "operand", opr[i], "opr");
        } else {
          switch (opr[i - 1]) {
            case "+":
              result += operands[i];
              break;
            case "-":
              result -= operands[i];
              break;
            case "X":
              result *= operands[i];
              break;
              case "%":
               if(i < operands.length - 1){
                result = operands[i] % operands[i  + 1];
               }
              break;
            case "/":
              result /= operands[i];
              break;
          }
          console.log(result, "result", operands[i], "operand", opr[i - 1], "opr");
        }
      }
      screen.innerHTML = result.toLocaleString();
      inputs = [];
      reset()
    
   
    }
