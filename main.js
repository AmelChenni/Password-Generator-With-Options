let generateBtn = document.querySelector('.generate');
let number = document.getElementById('include-numbers');
let specialChars = document.getElementById('include-special');
let displayTable = document.querySelector('.saved-passwords');

let passwordLocalStorage = JSON.parse(localStorage.getItem('passwords'))||[];

// let passwordLength = 

let numberBooleen = true;
let specialBooleen = true;

//table of numbers
const numbersTable = [ 0, 1,2 ,3, 4 ,5, 6 ,7, 8 ,9 ];
const specialCharactersTable = [
  '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
  '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\',
  ';', ':', '\'', '"', '<', '>', ',', '.', '?', '/'
];
const lettersTable = (() => {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.concat(caps.map(letter => letter.toLowerCase()));
})();

let finalTable =lettersTable;
let result =[];
let reg1 = /[a-zA-Z]+.*\d+.*[\W_]+|[a-zA-Z]+.*[\W_]+.*\d+/;  // letters + numbers + special
let reg2 = /[a-zA-Z]+.*[\W_]+|[\W_]+.*[a-zA-Z]+/;             // letters + special
let reg3 = /[a-zA-Z]+.*\d+|\d+.*[a-zA-Z]+/;                  // letters + numbers


// make it checked or no
number.addEventListener('click',function(){
    numberBooleen = number.checked;
  console.log(numberBooleen);
})

specialChars.addEventListener('click',function(){
    specialBooleen = specialChars.checked;
  console.log(specialBooleen);
})

generateBtn.addEventListener('click',function(){
    let isMatch = false;
    result =[];
    let length = document.querySelector('.pass-length').value;
    // if speacial caracter and numbers true
    if(numberBooleen && specialBooleen){
         while(!isMatch){
        finalTable = lettersTable.concat(specialCharactersTable , numbersTable);
        generatePass(length);
        isMatch = reg1.test(result);
        console.log(isMatch); 
        console.log("result matching  is : " + result);
    }
    // return result;
    //  // add to local storage
    // if(passwordLocalStorage.length > length){
    // passwordLocalStorage.shift(); 
    // }
    // passwordLocalStorage.push(result);
    // localStorage.setItem('passwords',JSON.stringify(passwordLocalStorage));

    }
     // if speacial caracter
    if(numberBooleen && !specialBooleen){
         while(!isMatch){
        finalTable = lettersTable.concat(numbersTable);
        generatePass(length);
        isMatch = reg2.test(result);
        console.log(isMatch); 
        console.log("result matching  is : " + result);
    }
    // return result;
     // add to local storage
    // passwordLocalStorage.push(result);
    // localStorage.setItem('passwords',JSON.stringify(passwordLocalStorage));
    }
         // if number
      if(!numberBooleen && specialBooleen){
         while(!isMatch){
    finalTable = lettersTable.concat(specialCharactersTable);
        generatePass(length);
        isMatch = reg3.test(result);
        console.log(isMatch); 
        console.log("result matching  is : " + result);
    }
    // return result;
     // add to local storage
    // passwordLocalStorage.push(result);
    // localStorage.setItem('passwords',JSON.stringify(passwordLocalStorage));
    }
   
     // add to local storage
    if(passwordLocalStorage.length > length-1){
    passwordLocalStorage.pop(); 
    }
    passwordLocalStorage.unshift(result);
    localStorage.setItem('passwords',JSON.stringify(passwordLocalStorage));
display();
})

// function generate a password
function generatePass(length){
      result = []; // 
       for(let i =0; i< length ; i++){
            let random = Math.floor(Math.random()*finalTable.length)        
                // console.log(result);
                result.push(finalTable[random])
                // console.log(result);

        }
        result = result.join("");
    console.log(result);
    return result;
}

// function display in table
function display(){
    if(passwordLocalStorage){
        displayTable.textContent="";
        passwordLocalStorage.forEach((password,i) => {
        let divdisplay = document.createElement('div');
        divdisplay.innerHTML = `<span>${i+1}</span> ${password}.`
        displayTable.appendChild(divdisplay);
    });
    }
}
display();