"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;
var profile = {};
var extras = [];
var objectString;
var arrayString;

/* remove default values and formatting from state and delivery
date selection lists */
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

// validate entered username
function validateUsername() {
	var unInput = document.getElementById('username');
	var errorDiv = document.getElementById('usernameError');
	try {
		if (unInput.value.length < 5) {
         throw 'Username must be at least 5 characters long';
      }
		// remove any username error styling and message
		unInput.style.background = '';
		errorDiv.style.display = 'none';
		errorDiv.innerHTML = '';
        
	} catch (msg) {
		// display error message
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = msg;
		// change input style
		unInput.style.background = 'rgb(255,233,233)';
        formValidity = false;
	}
}

// validate entered password
function validatePassword() {
	var pwInput = document.getElementById('pass1');
	var errorDiv = document.getElementById('password1Error');
	try {
        if (/.{8,}/.test(pwInput.value) === false) {
            throw "Password must be at least 8 characters";
        } 
		// remove any password error styling and message
		pwInput.style.background = '';
		errorDiv.style.display = 'none';
		errorDiv.innerHTML = '';

	} catch (msg) {
		// display error message
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = msg;
		// change input style
		pwInput.style.background = 'rgb(255,233,233)';
	}
}

// validate entered verify password
function validateVerifyPassword() {
	var pw2Input = document.getElementById('pass2');
	var errorDiv = document.getElementById('password2Error');
	try {
        if (/.{8,}/.test(pw2Input.value) === false) {
            throw "Password must be at least 8 characters";
        } 
		// remove any password error styling and message
		pw2Input.style.background = '';
		errorDiv.style.display = 'none';
		errorDiv.innerHTML = '';

	} catch (msg) {
		// display error message
		errorDiv.style.display = 'block';
		errorDiv.innerHTML = msg;
		// change input style
		pw2Input.style.background = 'rgb(255,233,233)';
        formValidity = false;
	}
}

/* validate create account */
function validateCreateAccount() {
    var errorDiv = document.getElementById("createAccError");
    var usernameElement = document.getElementById("username");
    var pass1Element = document.getElementById("pass1");
    var pass2Element = document.getElementById("pass2");
    var passwordMismatch = false;
    var invColor = "rgb(255,233,233)";
    try {
        // reset styles to valid state
        usernameElement.style.background = "";
        pass1Element.style.background = "";
        pass2Element.style.background = "";
        errorDiv.style.display = "none";
        formValidity = true;
        if ((usernameElement.value !== "" && pass1Element.value !== ""
        && pass2Element.value !== "")) {
            // all fields are filled
            if (pass1Element.value !== pass2Element.value) {
                // passwords don’t match
                passwordMismatch = true;
                throw "Passwords entered do not match, please re-enter.";
            }
            formValidity = true;
        }
        if ((usernameElement.value === "" || pass1Element.value === ""
            || pass2Element.value === "")) {
            // not all fields are blank
            throw "Please complete all fields to create an account.";
            formValidity = true;
        }
    }
    catch(msg) {
        errorDiv.innerHTML = msg;
        errorDiv.style.display = "block";
        if (passwordMismatch) {
            usernameElement.style.background = "";
            pass1Element.style.background = invColor;
            pass2Element.style.background = invColor;
        } else {
            if (usernameElement.value === "") {
                usernameElement.style.background = invColor;
            }
            if (pass1Element.value === "") {
                pass1Element.style.background = invColor;
            }
            if (pass2Element.value === "") {
                pass2Element.style.background = invColor;
            }
        }
        formValidity = false;
    }
}

// validate entered number of children
function validateNumberOfChildren() {
	var numOfChildrenInput = document.getElementById('numOfChildren');
	var errorDiv = document.getElementById('numOfChildrenError');
	try {
		// conditional expression
        if(numOfChildrenInput.value > 4) {
            throw "Number of children cannot exceed 4.";

        } else
            if(numOfChildrenInput.value < 1) {
            throw "Number of children cannot be less than 1.";
        }
		// remove any email error styling and message
            numOfChildrenInput.style.background = '';
            errorDiv.innerHTML = '';
            errorDiv.style.display = 'none';

	} catch (msg) {
		// display error message
		errorDiv.innerHTML = msg;
		errorDiv.style.display = 'block';
		// change input style
		numOfChildrenInput.style.background = 'rgb(255,233,233)';
        formValidity = false;
	}
}

// validate entered first name
function validateFirstName() {
	var firstNameInput = document.getElementById('firstName');
	var errorDiv = document.getElementById('firstNameError');
	try {
		// conditional expression
        if (/.{1,}/.test(firstNameInput.value) === false) {
            throw "Please enter first name.";
        }
		// remove any email error styling and message
            firstNameInput.style.background = '';
            errorDiv.innerHTML = '';
            errorDiv.style.display = 'none';

	} catch (msg) {
		// display error message
		errorDiv.innerHTML = msg;
		errorDiv.style.display = 'block';
		// change input style
		firstNameInput.style.background = 'rgb(255,233,233)';
        formValidity = false;
	}
}

// validate entered email address
function validateEmail() {
	var emailInput = document.getElementById('email');
	var errorDiv = document.getElementById('emailError');
    var emailPattern = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	try {
        // conditional expression to test if the email is valid
        if (emailPattern.test(emailInput.value) === false) {
            throw "Please provide a valid email address";
        }
		// remove any email error styling and message
            emailInput.style.background = '';
            errorDiv.innerHTML = '';
            errorDiv.style.display = 'none';

	} catch (msg) {
		// display error message
		errorDiv.innerHTML = msg;
		errorDiv.style.display = 'block';
		// change input style
		emailInput.style.background = 'rgb(255,233,233)';
        formValidity = false;
	}
}

/* set up node building blocks for selection list of days */
function setupDays() {
    var dates = document.getElementById("quoteDy").
    getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    // add 29th
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    // add 29th & 30th
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
    // add 29th, 30th, & 31st
}

/* update days on selection list of days */
function updateDays() {
    var deliveryDay = document.getElementById("quoteDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("quoteMo");
    var deliveryYear = document.getElementById("quoteYr");
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;

    while (dates[28]) {
        // remove child with index of 28 until this index is empty
        deliveryDay.removeChild(dates[28]);
    }

    if (deliveryYear.selectedIndex === -1) {
        // if no year is selected, choose the default year so length of Feb can be determined 
        deliveryYear.selectedIndex = 0;
    }

    if (selectedMonth === "2" &&
        deliveryYear.options[deliveryYear.selectedIndex].value === "2018") {
        // if leap year, Feb has 29 days
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    else if (selectedMonth === "4" || selectedMonth === "6" ||
        selectedMonth === "9" || selectedMonth === "11") {
    // these months have 30 days
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    else if (selectedMonth === "1" || selectedMonth === "3" ||
        selectedMonth === "5" || selectedMonth === "7" ||
        selectedMonth === "8" || selectedMonth === "10" ||
        selectedMonth === "12") {
        // these months have 31 days
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

/* Validate user input */
function validateInputInfo() {
    var paymentOption = document.getElementsByName("PaymentOption");
    var inputElements = document.querySelectorAll("#inputInfo input");
    var selectElements = document.querySelectorAll("#quotationDate select");
    var errorDiv = document.getElementById("errorMessage");
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement;

    try {
        // verify that a payment option is selected
        if (!paymentOption[0].checked && !paymentOption[1].checked) {
            for (var i = 0; i < paymentOption.length; i++) {
                paymentOption[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        } else {
            var i;
            for (i = 0; i < paymentOption.length; i++) {
                paymentOption[i].style.outline = "";
            }
        }
        // validate all input elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            if (currentElement.value === "") {
                if(currentElement.id == "schoolFees"){}
                else if(currentElement.id == "discount"){}
                else if(currentElement.id == "complexName"){}
                else{
                    currentElement.style.background = "rgb(255,233,233)";
                    fieldsetValidity = false;
                }
            } else {
                currentElement.style.background = "white";
            }
        }
        // validate the select elements of date
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            if(currentElement)
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else {
                currentElement.style.border = "";
            }
        }        
        if (fieldsetValidity === false) {
            throw "Please complete all fields to request a quote.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    }
    catch(msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// add extra mural activities
function addExtras(event) {
	if (event === undefined) {
		// get caller element in IE8
		event = window.event;
	}
    
	var callerElement = event.target || event.srcElement;
	var activityName = callerElement.value;
	if (callerElement.checked) {
        // if box has just been checked
		// add checkbox value to extras array
		extras.push(activityName);
        
	} else {
		// if box has just been unchecked
		for (var i = 0; i < extras.length; i++) {
			if (extras[i].value === activityName) {
				// remove element at index i from array
				extras.splice(i, 1);
				break;
			}
		}
	}
    console.log(extras);
}

// get monthly discount rate based on the number of children
function getAnnualDiscountRate(numChildren) {
    var discount;
    if(numChildren == 1){
        discount = 0.1;
    } else 
    if(numChildren == 2){
        discount = 0.12;
    } else 
    if(numChildren == 3){
        discount = 0.13;
    }else 
    if(numChildren >= 4){
        discount = 0.14;
    }
     
    return discount;
}
// get monthly discount rate based on the number of children
function getMonthlyDiscountRate(numChildren) {
    var discount;
    if(numChildren == 1){
        discount = 0;
    } else 
        if(numChildren == 2){
            discount = 0.01;
    } else 
        if(numChildren == 3){
            discount = 0.0125;
    }else 
        if(numChildren >= 4){
            discount = 0.015;
    }
    return discount;
}

// calculate school fee discount
function calculateFeeDiscount() {
    var paymentOption = document.getElementsByName("PaymentOption");
    var numChildren = document.getElementById("numOfChildren").value;
    var schoolFeesAnnually = 100.00;
    var schoolFeeDiscount = 0.00;
    var totalFees = 0.00;
    var numMonths = 10;
    
    // if annual option is checked, calculate annual discount
    if (paymentOption[0].checked) {
        totalFees = numChildren * schoolFeesAnnually;
        schoolFeeDiscount = getAnnualDiscountRate(numChildren) * totalFees;
    } else // if monthly option is checked, calculate monthly discount
    if (paymentOption[1].checked) {
        totalFees = numChildren * (schoolFeesAnnually / numMonths);
        schoolFeeDiscount = getMonthlyDiscountRate(numChildren) * totalFees;
    }

    document.getElementById("schoolFees").value = totalFees.toFixed(2);
    document.getElementById("discount").value = schoolFeeDiscount.toFixed(2);
}

// function to create profile object
function createProfile() {
    profile.email = document.getElementById('email').value.toLowerCase();
    profile.username = document.getElementById('username').value;
    profile.password = document.getElementById('pass1').value;
}

// convert form input to string
function convertArrayToString() {
	// convert extras array to string
	arrayString = extras.toString();
}

// convert profile object to string
function convertJsonToString() {
    // convert profile object to string
    objectString = JSON.stringify(profile);
}

// set cookies and expiration date
function setCookie(cName, cValue, expDays) {
    var date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

// function to create cookies for all input fields except password fields
function createCookies() {
    var expirationDays = (10/(60*24)); // 10 minutes

    // set payment option cookie
    var paymentOption = document.getElementsByName("PaymentOption");
    for (var i = 0; i < paymentOption.length; i++) {
        if(paymentOption[i].checked) {
            var currentValue = decodeURIComponent(paymentOption[i].value);
            setCookie(paymentOption[i].name, currentValue, expirationDays);
        }
    }

    // set input fields cookies
    var formFields =
    document.querySelectorAll("input[type=hidden], input[type=number], input[type=text], select");
    for (var i = 0; i < formFields.length; i++) {
        var currentValue = decodeURIComponent(formFields[i].value);
        currentValue = currentValue.replace(/\+/g, " ");
        setCookie(formFields[i].name, currentValue, expirationDays);
    }

    // get checked activities and if it is not already 
    // in the extras array add it
    var activities = document.getElementsByName("Activities");
    var found = false;
    for (var i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            for (var j = 0; j < extras.length; j++) {
                if(activities[i].value == extras[j]) {
                    found = true;
                    break;
                } 
            }
            if (found == false) {
                extras.push(activities[i].value);
            } 
        }             
    }

    // set activities cookie
    var actStr = extras.toString();
    actStr = actStr.replace(/\,/g, ", ");
    setCookie("Activities", actStr, expirationDays);
}

/* validate form */
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault(); // prevent form from submitting
    } else {
        evt.returnValue = false; // prevent form from submitting in IE8
    }
    formValidity = true; // reset value for revalidation
         
    validateCreateAccount();
    validateEmail();
    validateNumberOfChildren();
    validateFirstName();
    validatePassword();
    validateVerifyPassword();
    validateUsername();
    validateInputInfo();
    createProfile();

    if(formValidity == true) {
        calculateFeeDiscount();
        createCookies();
        document.getElementsByTagName("form")[0].submit(); 
    }
}

/* create event listeners */
function createEventListeners() {
    var unInput = document.getElementById('username');
    if (unInput.addEventListener) {
		unInput.addEventListener('change', validateUsername, false);
	} else if (unInput.attachEvent) {
		unInput.attachEvent('onchange', validateUsername);
	}

	var pwInput = document.getElementById('pass1');
    if (pwInput.addEventListener) {
		pwInput.addEventListener('change', validatePassword, false);
	} else if (pwInput.attachEvent) {
		pwInput.attachEvent('onchange', validatePassword);
	}

    var pw2Input = document.getElementById('pass2');
    if (pw2Input.addEventListener) {
		pw2Input.addEventListener('change', validateVerifyPassword, false);
	} else if (pw2Input.attachEvent) {
		pw2Input.attachEvent('onchange', validateVerifyPassword);
	}
	
    var userEmail = document.getElementById("email");
    if (userEmail.addEventListener) {
        userEmail.addEventListener("change", validateEmail, false);
    } else if (userEmail.attachEvent) {
        userEmail.attachEvent("onchange", validateEmail);
    }

    var userNumOfChildren = document.getElementById("numOfChildren");
    if (userNumOfChildren.addEventListener) {
        userNumOfChildren.addEventListener("change", validateNumberOfChildren, false);
    } else if (userNumOfChildren.attachEvent) {
        userNumOfChildren.attachEvent("onchange", validateNumberOfChildren);
    }

    var firstNameInput = document.getElementById("firstName");
    if (firstNameInput.addEventListener) {
        firstNameInput.addEventListener("change", validateFirstName, false);
    } else if (firstNameInput.attachEvent) {
        firstNameInput.attachEvent("onchange", validateFirstName);
    }

    var quoteMonth = document.getElementById("quoteMo");
    if (quoteMonth.addEventListener) {
        quoteMonth.addEventListener("change", updateDays, false);
    } else if (quoteMonth.attachEvent) {
        quoteMonth.attachEvent("onchange", updateDays);
    }

    var quoteYear = document.getElementById("quoteYr");
    if (quoteYear.addEventListener) {
        quoteYear.addEventListener("change", updateDays, false);
    } else if (quoteYear.attachEvent) {
        quoteYear.attachEvent("onchange", updateDays);
    }

    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }

    var activities = document.getElementsByName('Activities');
	if (activities[0].addEventListener) {
		for (var i = 0; i < activities.length; i++) {
			activities[i].addEventListener('change', addExtras, false);
		}
	} else if (activities[0].attachEvent) {
		for (var i = 0; i < activities.length; i++) {
			activities[i].attachEvent('onchange', addExtras);
		}
	}

    var rqbutton = document.getElementById("requestQuoteButton");
    if (rqbutton.addEventListener) {
        rqbutton.addEventListener("click", convertArrayToString, false);
        rqbutton.addEventListener("click", convertJsonToString, false);
    } else if (rqbutton.attachEvent) {
        rqbutton.attachEvent("onclick", convertArrayToString);
        rqbutton.attachEvent("onclick", convertJsonToString);
    }
}

/* run initial form configuration functions */
function setUpPage() {
    removeSelectDefaults();
    setupDays();
    createEventListeners();
}

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}

