/* 
Program name: form.js
Author: Zuhair Asif
Date Created: 03/27/2026
Description: External JavaScript for Patient Registration Form HW2
*/


var error_flag = 0;
var firstnameflag = 1;
var middleflag = 0;      
var lastnameflag = 1;
var password1flag = 1;
var password2flag = 1;
var usernameflag = 1;


window.addEventListener("DOMContentLoaded", function() {

  
    var d = new Date();
    document.getElementById("date-display").innerHTML = "Today is: " + d.toLocaleDateString();

    document.getElementById("scale_value").innerHTML = document.getElementById("scale").value;

    var dob = document.getElementById("dob");
    var today = new Date().toISOString().split("T")[0];
    var minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    dob.max = today;
    dob.min = minDate.toISOString().split("T")[0];

    document.getElementById("Fname").title = "Enter your first name, letters only, 1-30 characters";
    document.getElementById("Fname").pattern = "[A-Za-z'\\-]{1,30}";

    document.getElementById("Mname").title = "Enter your middle initial, one letter only";
    document.getElementById("Mname").pattern = "[A-Za-z]";

    document.getElementById("Lname").title = "Enter your last name, letters only, 1-30 characters";
    document.getElementById("Lname").pattern = "[A-Za-z'\\-]{1,30}";

    document.getElementById("phone").title = "Enter phone number like 000-000-0000";
    document.getElementById("phone").pattern = "\\d{3}-\\d{3}-\\d{4}";

    document.getElementById("ssn").title = "Enter SSN in format XXX-XX-XXXX";
    document.getElementById("ssn").pattern = "\\d{3}-\\d{2}-\\d{4}";

    document.getElementById("zip").title = "Enter 5 digit zip or zip+4 like 77002-1234";
    document.getElementById("zip").pattern = "\\d{5}(-\\d{4})?";

    document.getElementById("email").title = "Enter a valid email like name@domain.com";
    document.getElementById("dob").title = "Enter your date of birth, cannot be in the future";
    document.getElementById("address1").title = "Enter your street address, 2-50 characters";
    document.getElementById("address2").title = "Enter apartment or suite number if applicable";
    document.getElementById("city").title = "Enter your city name, 2-30 characters";
    document.getElementById("state").title = "Select your state from the dropdown";
    document.getElementById("username").title = "5-20 characters, must start with a letter, no spaces";
    document.getElementById("username").pattern = "[a-zA-Z][a-zA-Z0-9_\\-]{4,19}";
    document.getElementById("password").title = "8-20 characters, must include uppercase, number, and special character";
    document.getElementById("confirm_password").title = "Re-enter your password exactly as above";
    document.getElementById("symptoms").title = "Describe your symptoms or reason for visit, optional";
    document.getElementById("scale").title = "Slide to rate your health from 1 to 10";

});


function updateScale(value) {
    document.getElementById("scale_value").innerHTML = value;
}


function checkfirstname() {
    var x = document.getElementById("Fname").value;
    firstnameflag = 1;  
    if (x.length < 1) {
        document.getElementById("fname_msg").innerHTML = "First name is required";
        error_flag = 1;
    } else {
        if (x.match(/^[a-zA-Z'\-]{1,30}$/)) {
            document.getElementById("fname_msg").innerHTML = "";
            firstnameflag = 0;  
        } else {
            document.getElementById("fname_msg").innerHTML = "Letters only, no numbers";
            error_flag = 1;
        }
    }
}

// check last name 
function checklastname() {
    var x = document.getElementById("Lname").value;
    lastnameflag = 1;
    if (x.length < 1) {
        document.getElementById("lname_msg").innerHTML = "Last name is required";
        error_flag = 1;
    } else {
        if (x.match(/^[a-zA-Z'\-]{1,30}$/)) {
            document.getElementById("lname_msg").innerHTML = "";
            lastnameflag = 0;
        } else {
            document.getElementById("lname_msg").innerHTML = "Letters only";
            error_flag = 1;
        }
    }
}


function enforceLowercase(input) {
    input.value = input.value.toLowerCase();
}

// check password
function checkPasswordStrength() {
    var passwordinput = document.getElementById("password").value;
    password1flag = 0;

    if (passwordinput.search(/[a-z]/) < 0) {
        document.getElementById("password_message").innerHTML = "Need at least 1 lowercase letter";
        error_flag = 1;
        password1flag = 1;
        return;
    }
    if (passwordinput.search(/[A-Z]/) < 0) {
        document.getElementById("password_message").innerHTML = "Need at least 1 uppercase letter";
        error_flag = 1;
        password1flag = 1;
        return;
    }
    if (passwordinput.search(/[0-9]/) < 0) {
        document.getElementById("password_message").innerHTML = "Need at least 1 number";
        error_flag = 1;
        password1flag = 1;
        return;
    }
    if (passwordinput.search(/[!@#%^&*()\-_+=]/) < 0) {
        document.getElementById("password_message").innerHTML = "Need at least 1 special character";
        error_flag = 1;
        password1flag = 1;
        return;
    }
    if (passwordinput.length < 8) {
        document.getElementById("password_message").innerHTML = "Minimum 8 characters";
        error_flag = 1;
        password1flag = 1;
        return;
    }
    document.getElementById("password_message").innerHTML = "Password looks good!";
    password1flag = 0;
}

function checkPasswordMatch() {
    var x = document.getElementById("password").value;
    var y = document.getElementById("confirm_password").value;
    password2flag = 1;

    if (y == "") {
        document.getElementById("match_message").innerHTML = "";
        return;
    }
    if (x == y) {
        document.getElementById("match_message").innerHTML = "Passwords match!";
        password2flag = 0;
    } else {
        document.getElementById("match_message").innerHTML = "Passwords do NOT match!";
        error_flag = 1;
    }
}

// review
function showReview() {

   
    var illnesses = [];
    var checkboxes = document.querySelectorAll('input[name="illness"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        illnesses.push(checkboxes[i].value);
    }


    var genderEl    = document.querySelector('input[name="gender"]:checked');
    var vaccEl      = document.querySelector('input[name="vaccinated"]:checked');
    var insuranceEl = document.querySelector('input[name="insurance"]:checked');

    var gender    = genderEl    ? genderEl.value  : "Not selected";
    var vaccinated = vaccEl     ? vaccEl.value : "Not selected";
    var insurance = insuranceEl ? insuranceEl.value: "Not selected";


    var output = "<h3 style='text-align:center'>Please Review Your Information</h3>";
    output += "<table border='1' cellpadding='8' style='width:100%'>";
    output += "<tr><th>Field</th><th>Value</th></tr>";
    output += "<tr><td>Full Name</td><td>" + document.getElementById("Fname").value + " " + document.getElementById("Mname").value + " " + document.getElementById("Lname").value + "</td></tr>";
    output += "<tr><td>Date of Birth</td><td>" + document.getElementById("dob").value + "</td></tr>";
    output += "<tr><td>Email</td><td>" + document.getElementById("email").value + "</td></tr>";
    output += "<tr><td>Phone</td><td>" + document.getElementById("phone").value + "</td></tr>";
    output += "<tr><td>Address</td><td>" + document.getElementById("address1").value + " " + document.getElementById("address2").value + "</td></tr>";
    output += "<tr><td>City, State, Zip</td><td>" + document.getElementById("city").value + ", " + document.getElementById("state").value + " " + document.getElementById("zip").value + "</td></tr>";
    output += "<tr><td>Username</td><td>" + document.getElementById("username").value + "</td></tr>";
    output += "<tr><td>Illnesses</td><td>" + (illnesses.length > 0 ? illnesses.join(", ") : "None selected") + "</td></tr>";
    output += "<tr><td>Gender</td><td>" + gender + "</td></tr>";
    output += "<tr><td>Vaccinated</td><td>" + vaccinated + "</td></tr>";
    output += "<tr><td>Insurance</td><td>" + insurance + "</td></tr>";
    output += "<tr><td>Health Rating</td><td>" + document.getElementById("scale").value + "/10</td></tr>";
    output += "<tr><td>Symptoms</td><td>" + (document.getElementById("symptoms").value || "None entered") + "</td></tr>";
    output += "</table>";

    console.log("Review button clicked - showing form data");

    document.getElementById("review_section").innerHTML = output;
    document.getElementById("review_section").style.display = "block";
    document.getElementById("review_section").scrollIntoView({ behavior: "smooth" });
}

/* end of form.js */
