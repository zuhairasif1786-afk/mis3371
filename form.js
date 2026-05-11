/* 
Program name: form.js
Author: Zuhair Asif
Date Created: 03/27/2026
Description: External JavaScript for Patient Registration Form HW2
*/


function showDate() {
    var today = new Date();
    document.getElementById("date-display").innerHTML = "Today is: " + today.toLocaleDateString();
}

window.onload = function() {
    showDate();
    loadStates();
    checkCookie();
    loadLocalStorage();
};


function setError(id, message) {
    document.getElementById(id).innerHTML = message;
    return false;
}

function clearError(id) {
    document.getElementById(id).innerHTML = "";
    return true;
}

function validateFirstName() {
    var value = document.getElementById("Fname").value.trim();
    var pattern = /^[A-Za-z'-]{1,30}$/;
    if (!pattern.test(value)) {
        return setError("Fname_error", "First name must be 1 to 30 letters, apostrophes, or dashes only.");
    }
    return clearError("Fname_error");
}

function validateMiddleName() {
    var value = document.getElementById("Mname").value.trim();
    var pattern = /^[A-Za-z]$/;
    if (value === "") {
        return clearError("Mname_error");
    }
    if (!pattern.test(value)) {
        return setError("Mname_error", "Middle initial must be one letter or left blank.");
    }
    return clearError("Mname_error");
}

function validateLastName() {
    var value = document.getElementById("Lname").value.trim();
    var pattern = /^[A-Za-z'-]{1,30}$/;
    if (!pattern.test(value)) {
        return setError("Lname_error", "Last name must be 1 to 30 letters, apostrophes, or dashes only.");
    }
    return clearError("Lname_error");
}

function validateDOB() {
    var value = document.getElementById("dob").value;
    if (value === "") {
        return setError("dob_error", "Date of birth is required.");
    }

    var dob = new Date(value);
    var today = new Date();
    var minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (dob > today) {
        return setError("dob_error", "Date of birth cannot be in the future.");
    }
    if (dob < minDate) {
        return setError("dob_error", "Date of birth cannot be more than 120 years ago.");
    }
    return clearError("dob_error");
}

function validateEmail() {
    var email = document.getElementById("email");
    email.value = email.value.toLowerCase();
    var value = email.value.trim();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) {
        return setError("email_error", "Email must be in the format name@domain.tld.");
    }
    return clearError("email_error");
}

function validateSSN() {
    var value = document.getElementById("ssn").value.trim();
    var pattern = /^\d{9}$/;
    if (!pattern.test(value)) {
        return setError("ssn_error", "ID number must be exactly 9 digits.");
    }
    return clearError("ssn_error");
}

function validatePhone() {
    var value = document.getElementById("phone").value.trim();
    var pattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!pattern.test(value)) {
        return setError("phone_error", "Phone must be in the format 000-000-0000.");
    }
    return clearError("phone_error");
}

function validateAddress1() {
    var value = document.getElementById("address1").value.trim();
    if (value.length < 2 || value.length > 30) {
        return setError("address1_error", "Address 1 must be 2 to 30 characters.");
    }
    return clearError("address1_error");
}

function validateAddress2() {
    var value = document.getElementById("address2").value.trim();
    if (value === "") {
        return clearError("address2_error");
    }
    if (value.length < 2 || value.length > 30) {
        return setError("address2_error", "Address 2 must be 2 to 30 characters if entered.");
    }
    return clearError("address2_error");
}

function validateCity() {
    var value = document.getElementById("city").value.trim();
    if (value.length < 2 || value.length > 30) {
        return setError("city_error", "City must be 2 to 30 characters.");
    }
    return clearError("city_error");
}

function validateState() {
    var value = document.getElementById("state").value;
    if (value === "") {
        return setError("state_error", "Please select a state.");
    }
    return clearError("state_error");
}

function validateZip() {
    var value = document.getElementById("zip").value.trim();
    var pattern = /^\d{5}$/;
    if (!pattern.test(value)) {
        return setError("zip_error", "Zip code must be exactly 5 digits.");
    }
    return clearError("zip_error");
}

function validateUsername() {
    var username = document.getElementById("username");
    username.value = username.value.toLowerCase();
    var value = username.value.trim();
    var pattern = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/;
    if (!pattern.test(value)) {
        return setError("username_error", "Username must be 5 to 20 characters, start with a letter, and use only letters, numbers, dash, or underscore.");
    }
    return clearError("username_error");
}

function checkPasswordStrength() {
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$/;

    if (!pattern.test(password)) {
        return setError("password_error", "Password must be 8 to 30 characters and include uppercase, lowercase, and a number.");
    }
    if (password.toLowerCase() === username.toLowerCase() && username !== "") {
        return setError("password_error", "Password cannot equal the username.");
    }
    return clearError("password_error");
}

function checkPasswordMatch() {
    var x = document.getElementById("password").value;
    var y = document.getElementById("confirm_password").value;

    if (y === "") {
        document.getElementById("match_message").innerHTML = "";
        return false;
    }
    if (x === y) {
        document.getElementById("match_message").innerHTML = "";
        return true;
    } else {
        document.getElementById("match_message").innerHTML = "Passwords do not match.";
        return false;
    }
}

function validateForm() {
    var errors = 0;

    if (!validateFirstName()) errors++;
    if (!validateMiddleName()) errors++;
    if (!validateLastName()) errors++;
    if (!validateDOB()) errors++;
    if (!validateSSN()) errors++;
    if (!validateEmail()) errors++;
    if (!validatePhone()) errors++;
    if (!validateAddress1()) errors++;
    if (!validateAddress2()) errors++;
    if (!validateCity()) errors++;
    if (!validateState()) errors++;
    if (!validateZip()) errors++;
    if (!validateUsername()) errors++;
    if (!checkPasswordStrength()) errors++;
    if (!checkPasswordMatch()) errors++;

    if (errors === 0) {
        document.getElementById("submitBtn").style.display = "inline-block";
        document.getElementById("form_message").innerHTML = "";
    } else {
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("form_message").innerHTML = "Please fix the errors above before submitting.";
    }
}

function updateScale(value) {
    document.getElementById("scale_value").innerHTML = value;
}

function enforceLowercase(input) {
    input.value = input.value.toLowerCase();
}

function showReview() {
    var formcontents = document.forms[0];
    var output = "";
    var datatype;
    var i;

    output = "<h3 style='text-align:center'>Please Review This Information</h3>";
    output += "<table border='1' cellpadding='8'>";
    output += "<tr><th>Data Name</th><th>Type</th><th>Value</th></tr>";

    for (i = 0; i < formcontents.elements.length; i++) {
        datatype = formcontents.elements[i].type;

        switch (datatype) {
            case "button":
            case "submit":
            case "reset":
                break;

            case "checkbox":
            case "radio":
                if (formcontents.elements[i].checked) {
                    output += "<tr><td>" + formcontents.elements[i].name + "</td>";
                    output += "<td>" + datatype + "</td>";
                    output += "<td>" + formcontents.elements[i].value + "</td></tr>";
                }
                break;

            case "password":
                output += "<tr><td>" + formcontents.elements[i].name + "</td>";
                output += "<td>" + datatype + "</td>";
                output += "<td>hidden</td></tr>";
                break;

            default:
                output += "<tr><td>" + formcontents.elements[i].name + "</td>";
                output += "<td>" + datatype + "</td>";
                output += "<td>" + formcontents.elements[i].value + "</td></tr>";
                break;
        }
    }

    output += "</table>";
    document.getElementById("review_section").innerHTML = output;
    document.getElementById("review_section").style.display = "block";
}

function clearReview() {
    document.getElementById("review_section").innerHTML = "(you started over)";
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("form_message").innerHTML = "";
}






async function loadStates() {
    try {
        const response = await fetch("states.html");
        const data = await response.text();
        const stateSelect = document.getElementById("state");
        stateSelect.innerHTML = "<option value=''>Select State</option>" + data;
    }
    catch (error) {
        console.log("Fetch failed", error);
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    let expires = "expires=" + date.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i].trim();

        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }

    return "";
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function checkCookie() {
    let firstName = getCookie("firstName");

    if (firstName != "") {
        document.getElementById("welcome_message").innerHTML = "Welcome back, " + firstName;

        document.getElementById("new_user_section").innerHTML =
            '<label><input type="checkbox" onclick="startNewUser()"> Not ' + firstName + '? Start as new user</label>';

        document.getElementById("Fname").value = firstName;
    }
    else {
        document.getElementById("welcome_message").innerHTML = "Hello New User";
    }

}

function saveLocalStorage() {

    if (document.getElementById("remember_me").checked) {

        localStorage.setItem("Lname", document.getElementById("Lname").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
        localStorage.setItem("city", document.getElementById("city").value);
        localStorage.setItem("zip", document.getElementById("zip").value);

        let firstName = document.getElementById("Fname").value;

        setCookie("firstName", firstName, 2);
    }

    else {

        deleteCookie("firstName");
        localStorage.clear();
    }
}

function loadLocalStorage() {

    if (getCookie("firstName") != "") {

        document.getElementById("Lname").value = localStorage.getItem("Lname") || "";
        document.getElementById("email").value = localStorage.getItem("email") || "";
        document.getElementById("phone").value = localStorage.getItem("phone") || "";
        document.getElementById("city").value = localStorage.getItem("city") || "";
        document.getElementById("zip").value = localStorage.getItem("zip") || "";

        document.getElementById("remember_me").checked = true;
    }
}

function startNewUser() {

    deleteCookie("firstName");

    localStorage.clear();

    document.getElementById("patientForm").reset();

    document.getElementById("welcome_message").innerHTML = "Hello New User";

    document.getElementById("new_user_section").innerHTML = "";

    document.getElementById("submitBtn").style.display = "none";

    document.getElementById("form_message").innerHTML = "";

    document.getElementById("review_section").innerHTML = "";

    document.getElementById("review_section").style.display = "none";
}