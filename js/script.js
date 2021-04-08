
//Get user inputs and display the html results
function userForm() {

    //declare variables for the form
    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let province = document.getElementById('province').value;
    let membership;
    
    //create an array element of membership package
    let mPackage = document.getElementById('membership-package').getElementsByTagName('input');

    // find and assign the value of the selected package
    for( let input of mPackage) { 
        // check for selected package 
        if (input.checked) {
        membership = input.value;
        break; 
        }
    }

    let resultHTML = `
        <p class="result">
            Full Name: ${firstName} ${lastName} <br>
            Email: ${email} <br>
            Address: ${address}, ${city}, ${province} <br>
            Membership: ${membership} 
        </p>
    `;

    document.getElementById('output').innerHTML = resultHTML;

    // listen for Reset click event
    document.getElementById('reset').addEventListener('click', function() {
        document.getElementById('fname').value = '';
        document.getElementById('lname').value = '';
        document.getElementById('email').value = ''; 
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('province').value = '';
        document.getElementById('output').innerHTML = '';
    });
        
}

function myExcelFun() {

    // get user input data
    let numberStr = document.getElementById('user-number').value;
    console.log(numberStr);
    // regular expression for finding any characters excluding spaces and digits
    let regEx = /[^\d ]/g; 

    // validate user input data for non-digit characters
    if (numberStr.length == 0 ) {
        // if empty input
        alert("Please enter your numbers separated by spaces");
    } else if ( numberStr.match(regEx) !== null) {
        //if input matches regEx 
        alert("Please enter your numbers separated by spaces");        
    } else if (numberStr.match(/[0-9]/g) === null) { 
        //if input has no numbers
        alert("Please enter your numbers separated by spaces");        
    } else {

        //Execute functions

        // convert string array 'numberStr ' into array of numbers 
        let numberArr = numberStr.split(" ");
        
        //declare final array to use for the excel function
        let finalNumericArray = [];

        // build finalNumericArray with numeric data
        for (let i = 0; i < numberArr.length; i++) {

            if (numberArr[i] == "") {
                continue; // skip to next iteration
            } else {
                // convert string to float number 
                finalNumericArray.push(parseFloat(numberArr[i]));
            }

        }

        let result;

        
        // Check and execute selected excel function
        if (document.getElementById("autosum").checked) {

            //find total sum
            let sum = 0;
            for (let i = 0; i < finalNumericArray.length; i++){ 
                sum += finalNumericArray[i];
            }
            // get results
            result = sum;
            //display the results
            document.getElementById('output').innerHTML = `
                <p class="result"> Your total is ${result}.</p>
            `;

        } else if (document.getElementById("average").checked) {
            
            //find total sum
            let sum = 0;
            for (let i = 0; i < finalNumericArray.length; i++) {
                sum += finalNumericArray[i];
            }
            
            // get the average
            result = sum / finalNumericArray.length;
            //display the results
            document.getElementById('output').innerHTML = `
                <p class="result"> Your average is ${result}.</p>
            `;

        } else if (document.getElementById("max").checked) {
            
            //Sort numbers in an array in descending order
            finalNumericArray.sort(function(a, b){return b-a});
            //console.log(finalNumericArray);
            
            //Get max number
            result = finalNumericArray[0];
            //display the results
            document.getElementById('output').innerHTML = `
                <p class="result"> The max value is ${result}.</p>
            `;

        } else if (document.getElementById("min").checked) {
            
            //Sort numbers in an array in ascending order
            // Code idea from w3schools
            // https://www.w3schools.com/jsref/jsref_sort.asp
            finalNumericArray.sort(function(a, b){return a-b});
            //console.log(finalNumericArray);
            
            //get lowest number
            result = finalNumericArray[0];
            //display the results
            document.getElementById('output').innerHTML = `
                <p class="result"> The lowest value is ${result}.</p>
            `;

        } else {
         alert("Please select an excel operation");
        } 
    }

}