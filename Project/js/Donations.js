let btnSubmit=document.getElementById("submit");
btnSubmit.addEventListener("click",submit);

function submit(){
    event.preventDefault();
    console.log("Cardholder Name:",document.getElementById("name").value);
    console.log("Card Number:",document.getElementById("no").value);
    console.log("Email Address:",document.getElementById("email").value);
    console.log("Card expiration date",document.getElementById("exp").value);
    console.log("CVV",document.getElementById("cd_id").value);
    let amount=document.querySelector("input[name='amount']:checked").value;
console.log("Amount :"+amount);
}

let amount = document.querySelectorAll("input[name='amount']");

for (let i = 0; i < amount.length; i++) {
    amount[i].addEventListener("change", checkAmount);
}

//Donation values//


function checkAmount() {
    if (this.value == "100") 
    {
        console.log("Donation 100 LKR");
    }
    else if (this.value == "250") 
    {
        console.log("Donation 250 LKR");
    }
    else if (this.value == "500") 
    {
        console.log("Donation 500 LKR");
    }
    else if (this.value == "1000") 
    {
        console.log("Donation 1000 LKR");
    }
    else if (this.value == "2500") 
    {
        console.log("Donation 2500 LKR");
    }
    else if (this.value == "5000") 
    {
        console.log("Donation 5000 LKR");
    }
    else {
        console.log("Donation 10000 LKR");
    }
}

//Notification popups//

function myFunction1(){

    let CVV= document.getElementById("cd_id").value
    let Card_Number=document.getElementById("no").value 
    if (CVV == "" || Card_Number =="")
    {
        alert("Incomplete Attempt.");
    }
    else
    {
        alert("Success! Thank you for Donating")
    }
    
  }

