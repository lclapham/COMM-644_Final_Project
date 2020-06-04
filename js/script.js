//Global Variables
let radioId;
let crustOption;
let crustText;
let crustPrice = 0.00;
let crustChoice = 0.00;
let totalToppings = 0;
let cheesePrice = 0.00;
let saucePrice = 0.00;
let total = 0.00;
let cheeseChoice = 1;
let sauceChoice = 0;
let reciept;
let response;
// Validation Error Counts Global
let regErrorCount = 0;
let errorCount = 0;
const dropDownArr = ['handTossSelect', 'thinCrustSelect', 'NYStyleSelect', 'glutenSelect'];
const radioButtonArr = ['handTossed', 'thinCrust', 'NYStyle', 'glutenFree'];
const cheeseArr = ['Light Cheese', 'Normal Cheese', 'Extra Cheese', 'Double Cheese']
const sauceArr = ['Regular Tomato', 'Hearty Tomato', 'BBQ']
let userPizzaSelections = [];
let deliveryAddress = [];
const crustArr = [['Hand Tossed', ['blank_space', 'Small', 'Medium', 'Large']],
['Thin Crust', ['blank_space', 'Medium', 'Large']],
['New York Style', ['blank_space', 'Large', 'Extra Large']],
['Gluten Free', ['blank_space', 'Small']]]

////////////// Listeners ///////////////////

// Check Out Button
$('#checkOutBtn').click(function () {
    // Remind user to select a crust
    if (crustOption === undefined) {
        window.alert("You must select a crust at a minimum.")
        console.log("come on select a crust")
    } else {

        console.log(crustArr[dropDownArr.indexOf(crustOption)][0] + " " + crustArr[dropDownArr.indexOf(crustOption)][1][crustChoice])

        console.log(cheeseArr[cheeseChoice]);
        console.log(sauceArr[sauceChoice]);

        // Find and display all of select toppings
        console.log("Selected toppings:")
        userPizzaSelections.forEach(element => {
            console.log(element);

        });

        // $('#totalCost').innerHTML = calcTotal();
        console.log(calcTotal());
        $('#totalCost').text("$" + calcTotal());

        // Hide the pizza selections form
        $('#buildPizza').hide();

        // Show the Delivery and Payments forms
        $('#deliveryAddress').show();
        $('#userPayment').show();
    }

});

// Monitor the Billing address Button
$('#same-address').click(function (e) {
    console.log("same address button")
    // errorCounterDelivery()
    if (emptyTextErrorDelivery() > 0 || (errorCounterDelivery() > 0)) {
        $(this).prop('checked', false);
        console.log("Things are wrong")
    } else {
        console.log("Things are right")
        billingAddressCheck()
    }
    //Copy/validate delivery fields on click, remove/validate off click
    // if (errorCounterDelivery() > 0 && emptyTextErrorDelivery() >0) {
    //     console.log("same address true")
    //     window.alert("Please correct invalid fields to continue")
    //     $(this).prop('checked', false);
    // } else {
    //     billingAddressCheck();
    // }


});

// Monitor the toppings check boxes
$('#toppings').click(function (e) {

    // Determine if the user is checking or unchecking a choice for toppings
    // Update the toppings array
    if (e.target.checked === undefined) {
        console.log("Nothing")
    } else if (e.target.checked === true) {
        userPizzaSelections.push(e.target.value);
    } else {
        let removeItem = userPizzaSelections.indexOf(e.target.value);
        userPizzaSelections.splice(removeItem, 1);
    }

    // Keep track of the total toppings checked.
    totalToppings = $('input:checkbox:checked').length;

    //Display the running total
    $('#totalCost').text("$" + calcTotal());
    // console.log(userPizzaSelections);

});

//Listen for all delivery form fields and dynamically check user input.
$('#deliveryAddress').change(function (e) {
    validateUserInput(e.target.id, e.target.value)
    console.log(e.target.id)
})

//Listen for all deleiver form fields and dynamically check user input.
$('#userPayment').change(function (e) {
    validateUserInput(e.target.id, e.target.value)
    console.log(e.target.id)
})

// Listen for the checkout Button
$('#contineTocheckOut').click(function (e) {
    console.log("In continue to checkout")
    // Check for empty text
    emptyTextError();
    // console.log('this is the error ' + errorCounter());
    console.log("This is the checkout error count " + errorCounter());

    reciept = ("Your order:" + "\n" + crustText + "\n" + (cheeseArr[cheeseChoice]) + "\n" + (sauceArr[sauceChoice]) + "\n" + "Toppings: " + userPizzaSelections + "\n\n" + "Your total: $" + total.toFixed(2))

    response = window.confirm(reciept);
   

    if (errorCounter() != 0) {
        console.log("Need to fix errors");
       
    } else if (response == true) {
        
        window.location.href = 'orderComplete.html'

    } else {
       
        window.location.href = 'index.html';
    }



    // console.log(cheeseArr[cheeseChoice]);
    // console.log(sauceArr[sauceChoice]);

return false;


});

// Listen for user input on the radio buttons
$(':radio').click(function (e) {
    radioId = e.target.id;
    crust_option = e.target.value;
    unHideCrust(radioId);


});

// Set the global cost for cheese
$('.cheese').change(function (e) {

    //Set the global crust price
    cheesePrice = Number(e.target.value);

    //Display the running total
    $('#totalCost').text("$" + calcTotal());

    // Globally set the user cheese choice. These variables will be used at check out.
    cheeseOption = e.target.id;
    cheeseChoice = e.target.selectedIndex;

});

// Set the global cost for sauce
$('.sauce').change(function (e) {

    //Set the global crust price
    saucePrice = Number(e.target.value);

    //Display the running total
    $('#totalCost').text("$" + calcTotal());

    // Globally set the user sauce choice. These variables will be used at check out.
    sauceOption = e.target.id;
    sauceChoice = e.target.selectedIndex;

});

// Set the global cost for crust
$('.crust').change(function (e) {

    //Set the global crust price
    crustPrice = Number(e.target.value);

    // Globally set the user crust choice. These variables will be used at check out.
    crustOption = e.target.id;
    crustChoice = e.target.selectedIndex;

    //Display the running total
    $('#totalCost').text("$" + calcTotal());
    crustText = (crustArr[dropDownArr.indexOf(crustOption)][0] + " " + crustArr[dropDownArr.indexOf(crustOption)][1][crustChoice])
    console.log("Test " + crustText);


    // Clear unused crust drop downs
    clearDropDowns(e);

});

////////////// Functions  ///////////////////

// Populate and check for empty fields in billing address
function billingAddressCheck(element) {
    if ($('#same-address').prop('checked') === true) {
        // $('#billingAddress').hide();
        for (let i = 1; i < 10; i++) {
            let increment = 9;
            increment += Number([i]); //Create another iterator for billing IDs

            // Copy the delivery address text to billig address text fields
            $('#deliveryAdd_' + increment).val($('#deliveryAdd_' + [i]).val())

            //Check regex validation
            validateUserInput($('#deliveryAdd_' + increment).attr('id'), $('#deliveryAdd_' + increment).val())
        }

    } else {
        for (let i = 10; i < 20; i++) {
            // Empty text values and remove red border
            $('#deliveryAdd_' + [i]).val(" ");
            $("#deliveryAdd_" + [i]).css("border", "1px solid #ced4da")

        }

    }
};

// Calculate everything and display total 
function calcTotal() {
    let toppingsTotal = totalToppings * .99;
    total = toppingsTotal + cheesePrice + saucePrice + crustPrice;
    return total.toFixed(2);

}

// Hide all of the crust selections on load
function hideOptionsOnLoad() {
    $('.crust').hide();
    $('#deliveryAddress').hide();
    $('#userPayment').hide();
}

// Regex Validation function (PERFORM VALIDATION)
function validateUserInput(targetID, targetVal) {

    // REGEX Variables First & Lastname
    regName = /^[a-zA-Z]+$/;

    //Email
    regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    regFirstLast = /^\b[A-Z]+.+[?^ ][A-Z].{1,19}|\b[A-Z]+.+[?^,][A-Z].{1,19}/;

    // Address
    regAdd = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    // Apt numbers etc.
    regOption = /^[#.apt.0-9a-zA-Z\s,-]+$/;

    //5 or 9 digit zip
    regZip = /^[0-9]{5}(?:-[0-9]{4})?$/;

    //Credit Card Regex
    regCredit = regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

    // Check for experiation date
    // regExper = /^((0[1-9])|(1[0-2]))\/[2-9]{1}[0-9]{1}$/
    regMonth = /^((0[1-9])|(1[0-2]))\b/

    // Check for 3 numbers for CCV
    reqCCV = /^[0-9]{3}?$/;

    regPhone = /^\d{3}-\d{3}-\d{4}$/;

    switch (targetID) {
        case 'deliveryAdd_1':
            regExFieldVal(regName, targetVal, targetID)
            break;
        case 'deliveryAdd_2':
            regExFieldVal(regName, targetVal, targetID)
            break;
        case 'deliveryAdd_3':
            if (targetVal == "") {
                document.getElementById('deliveryAdd_3').style.borderColor = '#ced4da';
            } else {
                regExFieldVal(regMail, targetVal, targetID)
            }
            break;
        case 'deliveryAdd_5':
            regExFieldVal(regAdd, targetVal, targetID)
            break;
        case 'deliveryAdd_6':
            regExFieldVal(regOption, targetVal, targetID)
            break;
        case 'deliveryAdd_7':
            console.log(targetVal)
            if (targetVal == "") {
                document.getElementById('deliveryAdd_7').style.borderColor = 'red';
            } else {
                document.getElementById('deliveryAdd_7').style.borderColor = '#ced4da';
            }
            break;
        case 'deliveryAdd_8':
            console.log(targetVal)
            if (targetVal == "") {
                document.getElementById('deliveryAdd_8').style.borderColor = 'red';
            } else {
                document.getElementById('deliveryAdd_8').style.borderColor = '#ced4da';
            }
            break;
        case 'deliveryAdd_9':
            regExFieldVal(regZip, targetVal, targetID)
            break;
        case 'deliveryAdd_10':
            regExFieldVal(regName, targetVal, targetID)
            break;
        case 'deliveryAdd_11':
            regExFieldVal(regName, targetVal, targetID)
            break;
        case 'deliveryAdd_12':
            if (targetVal == "") {
                document.getElementById('deliveryAdd_12').style.borderColor = '#ced4da';
            } else {
                regExFieldVal(regMail, targetVal, targetID)
            }

            break;
        case 'deliveryAdd_14':
            regExFieldVal(regAdd, targetVal, targetID)
            break;
        // case 'deliveryAdd_15':
        //     regExFieldVal(regOption, targetVal, targetID)
        //     break;
        case 'deliveryAdd_16':
            console.log(targetVal)
            if (targetVal == "") {
                document.getElementById('deliveryAdd_16').style.borderColor = 'red';
            } else {
                document.getElementById('deliveryAdd_16').style.borderColor = '#ced4da';
            }
            break;
        case 'deliveryAdd_17':
            console.log(targetVal)
            if (targetVal == "") {
                document.getElementById('deliveryAdd_17').style.borderColor = 'red';
            } else {
                document.getElementById('deliveryAdd_17').style.borderColor = '#ced4da';
            }
            break;
        case 'deliveryAdd_18':
            regExFieldVal(regZip, targetVal, targetID)
            break;
        case 'deliveryAdd_19':
            regExFieldVal(regFirstLast, targetVal, targetID)
            break;
        case 'deliveryAdd_20':
            regExFieldVal(regCredit, targetVal, targetID)
            break;
        case 'deliveryAdd_21':
            regExFieldVal(regMonth, targetVal, targetID)
            checkDate();
            console.log("expiration Date")
            break;
        case 'deliveryAdd_22':
            if (targetVal < 2020) {
                $('#' + targetID).css("border", "1px solid red")
            } else {
                $('#' + targetID).css("border", "1px solid #ced4da")

            }
            errorCounter();

            // console.log("expiration Date")
            break;
        case 'deliveryAdd_23':
            regExFieldVal(reqCCV, targetVal, targetID)
            break;
        case 'deliveryAdd_24':
            regExFieldVal(regPhone, targetVal, targetID)
            break;
        default:

    }

}

// Regex Field Validation function (CHANGE THE BORDER COLOR)
function regExFieldVal(regControl, fieldValue, fieldName) {

    if (!regControl.test(fieldValue)) {
        $('#' + fieldName).css("border", "1px solid red")
    } else {
        $('#' + fieldName).css("border", "1px solid #ced4da")

    }
    errorCounter();

}

// Counts only the Delivery address errors. Used to tell user to fix error in order to select delivery same as billing
function errorCounterDelivery() {
    let errorCountDel = 0;
    let arr = [1, 2, 3, 5, 7, 9, 24];
    arr.forEach(i => {
        console.log("In errorCounterDelivery")
        if (document.getElementById('deliveryAdd_' + [i]).style.borderColor === 'red') {
            errorCountDel += 1;
            console.log(errorCountDel);
            $("#deliveryAdd_" + [i]).css("border", "1px solid red")
            // $('#sp' + [i]).show();  Just hiding the span stuff
            // || (!$("#deliveryAdd_" + [i]).val())
            // } else {
            //     // $("#sp" + [i]).hide(); // Hiding the span stuff
            //     $("#deliveryAdd_" + [i]).css("border", "1px solid #ced4da");
            //     console.log("error count false");
            //     errorCountDelivery - 1;
        }


    })
    return errorCountDel;

}

// The Input Error Counting Function.  Keeps track of the num of empty fields of regex errors
function errorCounter() {
    errorCount = 0;
    let arr = [1, 2, 5, 7, 8, 9, 10, 11, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    arr.forEach(i => {

        if (document.getElementById('deliveryAdd_' + [i]).style.borderColor === 'red') {
            errorCount += 1;
            console.log('In true erroCounter')
        } else {
            console.log("error count false")
            errorCount - 1;
        }
    });
    return errorCount;
}

// Check to the input text boxes for no entry
function emptyTextError() {
    let arr = [1, 2, 5, 7, 8, 9, 10, 11, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    arr.forEach(i => {
        console.log("test for empty item # " + i)
        // for (let i = 1; i < 19; i++) {
        if (!$("#deliveryAdd_" + [i]).val()) {
            $("#deliveryAdd_" + [i]).css("border", "1px solid red")
            // $('#sp' + [i]).show();  Just hiding the span stuff

        } else {
            // $("#sp" + [i]).hide(); // Hiding the span stuff
            $("#deliveryAdd_" + [i]).css("border", "1px solid #ced4da")

        }

    });

}
// Check for empty fields in delivery address.
function emptyTextErrorDelivery() {
    let arr = [1, 2, 5, 7, 8, 9, 24];
    let deliveryErrors = 0;
    arr.forEach(i => {

        // for (let i = 1; i < 19; i++) {
        if (!$("#deliveryAdd_" + [i]).val()) {
            $("#deliveryAdd_" + [i]).css("border", "1px solid red")
            // $('#sp' + [i]).show();  Just hiding the span stuff
            deliveryErrors += 1;

        } else {
            // $("#sp" + [i]).hide(); // Hiding the span stuff
            // $("#deliveryAdd_" + [i]).css("border", "1px solid #ced4da")
            deliveryErrors - 1;
        }

    });
    return deliveryErrors;

}

function hideAllErrorImages() {
    for (let i = 1; i <= 9; i++) {
        $('#sp' + [i]).hide();
    }
}

// Get todays date and year
const today = new Date();
const todayyear = today.getFullYear();
const todaymonth = today.getMonth();


// Lamar Stuff Use code below


function checkDate() {

    let mo = $('#deliveryAdd_21').val();
    console.log("You are right here " + mo);
    let yr = 2020;


    if (mo < todaymonth) {
        document.getElementById('deliveryAdd_21').style.borderColor = 'red';
        console.log('expired');
    } else {
        document.getElementById('deliveryAdd_21').style.borderColor = '#ced4da';
        console.log('cool');
    }
}


// $('#deliveryAdd_21').click(e => {
//     $('#ccmonth').change(e => {
//         mo = e.target.value;
//     })
//     mo = e.target.value;
//     checkDate()
// });

// $('#ex-year').click(e => {
//     $('#ex-year').change(e => {
//         yr = e.target.value;
//     })
//     yr = e.target.value;
//     checkDate()
// });
// End of Code with Karen

////////////// CRUST SELECTION ///////////////////
function clearDropDowns(e) {
    let user_selected = dropDownArr.indexOf(e.target.id);
    // Iterate through the dropDownArr to clear unused entries
    for (let i = 0; i < dropDownArr.length; i++) {

        if (i !== user_selected) {
            // Set unused drop downs to "Choose"
            $('#' + dropDownArr[i])[0].selectedIndex = 0;
        }
    }

}

// Unhide crust options
function unHideCrust(radioId) {

    // Set all options to hide
    hideOptionsOnLoad();

    // Turn radioId into a number
    let user_selected_radio = radioButtonArr.indexOf(radioId);

    // Show the user selected radio button
    $('#' + dropDownArr[user_selected_radio]).show();

}

/////////////// Run application ///////////////////////
window.addEventListener('load', () => {

    hideOptionsOnLoad();
    hideAllErrorImages();

});
