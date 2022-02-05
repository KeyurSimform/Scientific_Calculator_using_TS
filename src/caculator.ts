// Global Constants
const OPERATORS : string[]= ["+", "-", "*", "/"];
const POWER : string = "POWER(";
const FACTORIAL : string = "FACTORIAL";
let data : {
  operation : string[];
  formula: string[]
}= {
  operation: [],
  formula: []
};
let result : string;

let global_memory : string;

let calculateed = false;

interface buttonOBJ extends calcButtonObj {
//   name:string;
//   symbol:string;
//   formula:string;
  degFormula?:string;
//   type:string;
}

interface calcButtonObj {
  name:string;
  symbol:string|number;
  formula:string|boolean|number;
  type:string;
}



// type intersection = buttonOBJ|calcButtonObj
// ***********************************************************************************************************************
// Let's declare the golbal variable for query selectors
const input_elements_selectors  = 
  document.querySelector(
    ".input"
  )! as HTMLElement ; /*global constant to select the input tags */
const output_operations_selectors=
  document.querySelector(
    ".operation .value"
  )! as HTMLElement; /*global constant to select the operations visible in the calculators display */
const output_result_selectors  =
  document.querySelector(
    ".result .value"
  )! as HTMLElement; /*global constant to select the final result value for the calculator*/

  const trigo_button_slectors = document.querySelector("div.trigo")! as HTMLElement;
  const math_button_slectors = document.querySelector("div.math")! as HTMLElement;

// ***********************************************************************************************************************
// Lets declare the objects of the buttons which we are going to use in calculator
// This will make the desgingin part easier and faster
let trigo_calc_button : buttonOBJ[]= [

   {
      name: "cos",
      symbol: "cos",
      formula: "trigo(mnjs.cos.rad,",
      degFormula: "trigo(mnjs.cos.deg,",
      type: "trigo_function",
    },
    {
      name: "sin",
      symbol: "sin",
      formula: "trigo(mnjs.sin.rad,",
      degFormula: "trigo(mnjs.sin.deg,",
      type: "trigo_function",
    },
    {
      name: "tan",
      symbol: "tan",
      formula: "trigo(mnjs.tan.rad,",
      degFormula: "trigo(mnjs.tan.deg,",
      type: "trigo_function",
    },

      {
      name: "acos",
      symbol: "acos",
      formula: "inv_trigo(mnjs.acos.rad,",
      degFormula: "trigo(mnjs.acos.deg,",
      type: "trigo_function",
    },
    {
      name: "asin",
      symbol: "asin",
      formula: "inv_trigo(mnjs.asin.rad,",
      degFormula: "trigo(mnjs.asin.deg,",
      type: "trigo_function",
    },
    {
      name: "atan",
      symbol: "atan",
      formula: "inv_trigo(mnjs.atan.rad,",
      degFormula: "trigo(mnjs.atan.deg,",
      type: "trigo_function",
    },
];


let math_calc_button : calcButtonObj[] = [
  {
    name: "round",
    symbol: "Round",
    formula: "Math.round",
    type: "math_function",
  },
  {
    name: "celining",
    symbol: "Celining",
    formula:"Math.ceil",
    type: "math_function",
  },
  {
    name: "floor",
    symbol: "Floor",
    formula: "Math.floor",
    type: "math_function",
  },
];

let calculator_buttons : calcButtonObj[] = [
  {
    name: "memory-clear",
    symbol: "MC",
    formula: false,
    type: "memory",
  },
  {
    name: "memory-recall",
    symbol: "MR",
    formula: false,
    type: "memory",
  },
  {
    name: "memory-add",
    symbol: "M+",
    formula: false,
    type: "memory",
  },
  {
    name: "memory-subtract",
    symbol: "M-",
    formula: false,
    type: "memory",
  },
  {
    name: "memory-save",
    symbol: "MS",
    formula: false,
    type: "memory",
  },
  {
    name: "cube",
    symbol: "x³",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "math_function",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "math_function",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "inverse",
    symbol: "1/x",
    formula: "1/",
    type: "math_function",
  },
  {
    name: "absolute",
    symbol: "|x|",
    formula: "Math.abs",
    type: "math_function",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "math_function",
  },

  {
    name: "mod",
    symbol: "mod",
    formula: "%",
    type: "math_function",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
  },

  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },

  {
    name: "factorial",
    symbol: "x!",
    formula: FACTORIAL,
    type: "math_function",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },

  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWER,
    type: "math_function",
  },


  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },

  {
    name: "cuberoot",
    symbol: "∛",
    formula: "Math.cbrt",
    type: "math_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },

  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },

  //   {
  //     name: "ANS",
  //     symbol: "ANS",
  //     formula: "ans",
  //     type: "number",
  //   },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
];
// ***********************************************************************************************************************
// Now here we have the function to create the caluculator Buttons on the calulators


function calculatorButtonFunction() : void{
  const btns_per_row: number = 5;
  let total_btns: number = 0;

  calculator_buttons.forEach((button) : void => {
    if (total_btns % btns_per_row == 0) {
      input_elements_selectors.innerHTML += `<div class = "row"></div>`;/*This will add the neww row to the calculator input buttons */
    }

    const row = document.querySelector(".row:last-child")! as HTMLElement;
    row.innerHTML += `<button id ="${button.name}"> ${button.symbol}</button>`; 
    total_btns++;/* This part will assign the text to each button through the property of each button*/
  });
}
calculatorButtonFunction();




// calling the Trigo and Math functions inside the drop down menu

function trigoButtonFunction(){
  trigo_calc_button.forEach((button) =>{
    const lastChild = document.querySelector("div.trigo:last-child")! as HTMLElement;
    lastChild.innerHTML += `<button class="dropdown-item" id = "${button.name}">${button.symbol}</button>`;
  })
}
trigoButtonFunction();

function mathButtonFunction(){
  math_calc_button.forEach((button) =>{
    const lastChild = document.querySelector("div.math:last-child")! as HTMLElement;
    lastChild.innerHTML += `<button class="dropdown-item" id = "${button.name}">${button.symbol}</button>`
    // lastChild.style.
  })
}
mathButtonFunction();
// ***********************************************************************************************************************

// here is the funcionality for the radian and degree button toggling.

let radian = true; //declared globally
const rad_btn = document.getElementById("RADIAN")! as HTMLElement; 
const deg_btn = document.getElementById("DEGREE")! as HTMLElement;

rad_btn.classList.add("active-angle");
// button toogler
function trigoPara(){
  rad_btn.classList.toggle("active-angle");
  deg_btn.classList.toggle("active-angle");  
}


// ***********************************************************************************************************************
// Now here we will add the event listeners to the buttons we had made and make them functional

input_elements_selectors.addEventListener("click", (event) => {
  const target_btn = (event.target as HTMLInputElement) ;
    console.log(target_btn);
// it will clear the operation part after the calculate button has been pressed.
  if(calculateed == true){
    data.operation = [];
    data.formula = [];
    calculateed = false;
  }
  // This will fetch the buttons to the calculator using the DOM manipulations part
  calculator_buttons.forEach((button) => {
    if (button.name == target_btn.id) calculate(button);
  });
// This will add the trigo buttons to the drop down menu
  trigo_calc_button.forEach((button)=>{
    if (button.name == target_btn.id) calculate(button);
  })
// This will add the math buttons to the drop down menu
  math_calc_button.forEach((button)=>{
    if (button.name == target_btn.id) calculate(button); 
  })
// This will toggle the rad and deg button when pressed.
  if(target_btn.id == "RADIAN"){
    radian = true;
    trigoPara();
  }
 if(target_btn.id == "DEGREE"){
    radian =false;
    trigoPara();
  }
});

// ***********************************************************************************************************************
// calculator cases

function calculate(button : buttonOBJ): void {
  // Conditions for handeling the operators
  if (button.type == "operator") {
    data.operation.push(button.formula as string);
    data.formula.push(button.formula as string);
  } else if (button.type == "number") {
    // console.log(button.type);
    
    data.operation.push(button.formula as string);
    data.formula.push(button.formula as string);  
  }
//************************************************************************************
  //   Conditions for handeling the Trigo Functions
  else if (button.type == "trigo_function") {
    // console.log(button.name);
    data.operation.push(button.symbol+"(");
    if(!radian && button.degFormula !== undefined){
      data.formula.push(button.degFormula);
    } 
    else{
      data.formula.push(button.formula as string);
    } 
    // console.log(data.formula);
  }

  // **************************************************************************************************
  //   Conditions for handeling the Math Functions
  else if (button.type == "math_function") {
    // console.log(button.name);
    let symbol , formula;

    if(button.name == "factorial"){
      symbol = "!";
      formula = button.formula;
      console.log(button.formula);
      
      data.operation.push(symbol);
      data.formula.push(formula as string);
    }
    else if(button.name == "inverse"){
      // symbol = "^(";
      formula = button.formula;

      data.operation.push(formula as string);
      data.formula.push(formula as string);
    }
    else if(button.name == "power"){
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula as string);
    }
    else if(button.name == "square"){
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula as string);

      data.operation.push("2)");
      data.formula.push("2)");
    }
    else if(button.name == "cube"){
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula as string);

      data.operation.push("3)");
      data.formula.push("3)");
    }
    
    else if(button.name == "e"){
      // console.log(button.name)
      symbol = "e";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula as string);
    }
    else if(button.name == "pi"){
      // console.log(button.name)
      symbol = "π";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula as string);
    }
    else if(button.name == "mod"){
      data.operation.push("%");
      data.formula.push("%")
    }
    else{
    symbol = button.symbol + "(";
    formula = button.formula + "(";
    data.operation.push(symbol);
    data.formula.push(formula);
    // console.log(button.type)
    }
  }
  // *****************************************************************************************
  //   Conditions for handeling the key buttons
  else if (button.type == "key") {
    if (button.name == "clear") {
      data.formula = [];
      data.operation = [];
      dispalyOutputResult('0');
    } else if (button.name == "delete") {
      data.formula.pop();
      data.operation.pop();
    }
  }
  // ***********************************************************************************
  //   Conditions for handeling the memory Functions
  else if (button.type == "memory") {
    if (button.name == "memory-save") {
      global_memory = Number(output_result_selectors.innerHTML).toString();
    } else if (button.name == "memory-add") {
      global_memory = (parseFloat(global_memory) + Number(output_result_selectors.innerHTML)).toString();
      dispalyOutputResult(global_memory);
    }
    if (button.name == "memory-subtract") {
      global_memory = (parseFloat(global_memory) - Number(output_result_selectors.innerHTML)).toString();
      dispalyOutputResult(global_memory);
    }
    if (button.name == "memory-recall") {
      // global_memory = global_memory + Number(output_result_selectors.innerHTML);
      dispalyOutputResult(global_memory);
      data.operation.push(global_memory.toString());
      data.formula.push(global_memory.toString());
    }
    if (button.name == "memory-clear") {
      global_memory = '0';
      dispalyOutputResult(global_memory);
      data.operation = [];
      data.formula = [];
    }
  }
  // ******************************************************************************
  //   Conditions for handeling the calculate button
  else if (button.type == "calculate") {
    let final_formula = data.formula.join("");

    // This is the snippet for the seacrh of power function used the formula array
    let power_search_result : string[] = search(data.formula, POWER);

    // This is the snippet for the seacrh of factorial function used the formula array

    let factorial_search_result : string[]= search(data.formula, FACTORIAL);
    
    // console.log(data.formula , power_search_result, factorial_search_result);

    // ************************************************
    // Now we have sereched the number of power and factorial used in teh formula array. Now we need to figure out the bases which are entered by the user.

    const Bases_used = powerBaseFetcher(data.formula , power_search_result);

    // console.log(Bases_used);
    // here is the code to replace the bases of power to the formula inorder to work it with the eval function.

    Bases_used.forEach(base_elem => {
      let toReplace = base_elem + POWER;
      let Replacement = "Math.pow(" + base_elem + ",";

      final_formula = final_formula.replace(toReplace , Replacement)
    });

    // now similar to the powers we have issue with the factorial as well. So let's do same thing for the factorial too.

    const number_for_factorial = FactorialNumberFetcher(data.formula,factorial_search_result);
    number_for_factorial.forEach(fact_element =>{
      final_formula = final_formula.replace(fact_element.toReplace , fact_element.Replacement);
    })
    // Here is the code to display the result and operartions on the screen of the calculator
    
    try{
      result = eval(final_formula);
    }
    catch(error){
      if(error instanceof SyntaxError){
        result = "Syntax Error!";
        dispalyOutputResult(result);
        return;
      }
    }
    dispalyOutputResult(result);
    calculateed = true;
  }
  dispalyOutputOperation(data.operation.join(""));
}
// End of the calculator if-else conditions
// ********************************************************

// search function
function search(array : string[],keyword :string){
  let array_search_result : string[] = [];

  array.forEach((element : string , index:number )=>{
    if(element==keyword){
      let IndexOfElem = index.toString();
      array_search_result.push(IndexOfElem);
    }
  })
  return array_search_result;
}

// here is the funciton to fetch the power used in the formula part of the caluclations.

function powerBaseFetcher(formula :string[], power_search_result : string[]){
  let power_base_array : string [] = [];

  power_search_result.forEach(power_index=> {
    let current_base : string []= [];
    let parantheses_count = 0;
    let prev_index = parseFloat(power_index)-1;

    while(prev_index >= 0){

      let is_aoperator = false;
      let is_apower = false; 

      if(formula[prev_index] == "(") parantheses_count--;
      if(formula[prev_index] == ")") parantheses_count++;

      OPERATORS.forEach(OPERATOR => {
        if(formula[prev_index]==OPERATOR) {is_aoperator=true;}
      })

      is_apower = formula[prev_index] == POWER;

        if((is_aoperator&&parantheses_count == 0)|| is_apower) break;

        current_base.unshift(formula[prev_index]);
        prev_index--;

    }
    power_base_array.push(current_base.join(''));

  })

  return power_base_array
}
// PowerBaseFetcher Completed
// ****************************************************

// here is the funciton for the factorial Number Factcher

function FactorialNumberFetcher(formula : string[], factorial_search_result: string[]){
   let numbers_perform_factorials : {
     toReplace : string;
     Replacement : string;
   }[] = []; // array to store the number  
   let factorial_seq = 0;
  
   factorial_search_result.forEach(factorial_index=>{
     let current_number : string []= [];

     let next_index = factorial_index+1;
     let next_input = formula[parseFloat(next_index)];

     if(next_input == FACTORIAL){
       factorial_seq += 1;
       return
     }
    //  till here we will get the times of factorial for the single number

    // now we will calculate the first factoirial in the sequence

    let first_factorial_index = parseFloat(factorial_index)-factorial_seq;

    let prev_index = first_factorial_index -1;

    let parantheses_count = 0;

    while(prev_index >= 0){

      let is_aoperator = false;
      // let is_apower = false; 

      if(formula[prev_index] == "(") parantheses_count--;
      if(formula[prev_index] == ")") parantheses_count++;

      OPERATORS.forEach(OPERATOR => {
        if(formula[prev_index]==OPERATOR) {is_aoperator=true;}
      })

        if(is_aoperator&&parantheses_count == 0) break;

        current_number.unshift(formula[prev_index]);
        prev_index--;

    }

    let number_str = current_number.join('');
    const factorial = "factorial(";
    const close_paratheses=")";
    let times = factorial_seq+1;
     
    let toReplace = number_str + FACTORIAL.repeat(times);
    let Replacement = factorial.repeat(times)+number_str+close_paratheses.repeat(times);
    
    numbers_perform_factorials.push({
      toReplace : toReplace,
      Replacement : Replacement 
    })
      // Reset the factorial sequnce to zero
      factorial_seq = 0;    
   })

   return numbers_perform_factorials;
}

// Function to dispalay the values on the screen of calculators

// This is used to dispaly the operations that are performed
function dispalyOutputOperation(operation : string) {
  output_operations_selectors.innerHTML = operation;
}
// dispaly the final resul after calculating the operations displayed.
function dispalyOutputResult(result : string) {
  output_result_selectors.innerHTML = result;
}


// Trigonometric Functions logic

function trigo(callback: (n :string) => string ,trigo_value :string){
  return callback(trigo_value);
}

function inv_trigo(callback : (n :string) => string ,inv_trigo_value:string){
  return callback(inv_trigo_value);
}

// factorial Function

function factorial(number : number){
  if(number === 0 || number ===1) return 1;

  let result = 1;
  for(let i = 1; i<=number; i++){
    result *=i;
    if(result===Infinity) return Infinity;
  }
  return result;
}