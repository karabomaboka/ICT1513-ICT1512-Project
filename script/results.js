

"use strict";

function parseData() {
    var resultString;
    document.getElementById("date").innerHTML = "Quotation date: " + getCookie("QuotationDay") + "/" 
                    + getCookie("QuotationMonth") + "/" + getCookie("QuotationYear");

    resultString = 
        "<tr><td>Payment option:</td><td>" + getCookie("PaymentOption") + " " + "</td></tr>" +
        "<tr><td>Number of children:</td><td>" + getCookie("NumberOfChildren") + " " + "</td></tr>" +
        "<tr><td>Quoted fees:</td><td>R " + getCookie("SchoolFees") + " " + "</td></tr>" +
        "<tr><td>Discount amount:</td><td>R " + getCookie("Discount") + " " + "</td></tr>" +
        "<tr><td>Name:</td><td>" + getCookie("FirstName") + " " + getCookie("LastName") + 
        "</td></tr>" + "<tr><td>Physical address:</td><td>" + getCookie("StreetAddress") + 
        ((getCookie("ComplexName") == "") ? "" : "<br>" + getCookie("ComplexName")) // inline if statement
         + "<br>" + getCookie("Suburb") + "<br>" + getCookie("Town") + "<br>" + getCookie("PostalCode") + "</td></tr>" + 
        "<tr><td>Phone number:</td><td>" + getCookie("PhoneNumber") + "</td></tr>" +
        "<tr><td>Email:</td><td>" + getCookie("Email") + "</td></tr>" +
        "<tr><td>Extra mural activities:</td><td>" + getCookie("Activities") + "</td></tr>" +
        "<tr><td>Username:</td><td>" + getCookie("Username") + "</td></tr>";

    document.getElementById("quote").innerHTML = resultString;
}

// return the value of a cookie when given the cookie’s name
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); 
    const cArr = cDecoded .split('; ');
    var res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

if (window.addEventListener) {
    window.addEventListener("load", parseData, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", parseData);
}