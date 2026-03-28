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
};

function updateScale(value) {
    document.getElementById("scale_value").innerHTML = value;
}

function enforceLowercase(input) {
    input.value = input.value.toLowerCase();
}

function checkPasswordMatch() {
    var x = document.getElementById("password").value;
    var y = document.getElementById("confirm_password").value;

    if (y == "") {
        document.getElementById("match_message").innerHTML = "";
    }
    else if (x == y) {
        document.getElementById("match_message").innerHTML = "Passwords match";
    }
    else {
        document.getElementById("match_message").innerHTML = "Passwords do not match";
    }
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
                if (formcontents.elements[i].checked) {
                    output += "<tr><td>" + formcontents.elements[i].name + "</td>";
                    output += "<td>" + datatype + "</td>";
                    output += "<td>" + formcontents.elements[i].value + "</td></tr>";
                }
                break;

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
        }
    }

    output += "</table>";
    document.getElementById("review_section").innerHTML = output;
    document.getElementById("review_section").style.display = "block";
}

function clearReview() {
    document.getElementById("review_section").innerHTML = "(you started over)";
}
