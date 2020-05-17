//Global Variables
let radioId;
let crustOption;
let crustPrice;
let crustChoice;
let totalToppings = 0;
let cheesePrice = 0.00;
let saucePrice = 0.00;
let total;
let cheeseChoice;
let sauceChoice;
const dropDownArr = ['handTossSelect', 'thinCrustSelect', 'NYStyleSelect', 'glutenSelect'];
const radioButtonArr = ['handTossed', 'thinCrust', 'NYStyle', 'glutenFree'];
const cheeseArr = ['Light Cheese', ' Normal Cheese', 'Extra Cheese', 'Double Cheese']
const sauceArr = ['Regular Tomato', 'Hearty Tomato', 'BBQ']
let userPizzaSelections = [];
let deliveryAddress = [];
const crustArr = [['Hand Tossed', ['blank_space', 'Small', 'Medium', 'Large']],
['Thin Crust', ['blank_space', 'Medium', 'Large']],
['New York Style', ['blank_space', 'Large', 'Extra Large']],
['Gluten Free', ['blank_space', 'Small']]]

////////////// CHECK OUT ///////////////////

$('#checkOutBtn').click(function () {
    // Remind user to select a crust
    if (crustOption === undefined || totalToppings === 0) {
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
         $('#totalCost').text("$"+calcTotal());
         
         // Hide the pizza selections form
         $('#buildPizza').hide();

         // Show the Delivery and Payments forms
         $('#deliveryAddress').show();
         $('#userPayment').show();

    }

});

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

// Monitor the Billing address
$('#same-address').click(function (e) {
    console.log("Billing address is the same")
    console.log(e.target.value)

    // Determine if the user checks or unchecks the billing address same as check box
    if ($(this).prop('checked') === true) {
        $('#billingAddress').hide();
    } else {
        $('#billingAddress').show();
    }

});

// Monitor the toppings check boxes
$('#toppings').click(function (e) {

    // Determine if the user is checking or unchecking a choice for toppings
    // Update the toppings array
    if (e.target.checked === true) {
        userPizzaSelections.push(e.target.value);
    } else {
        let removeItem = userPizzaSelections.indexOf(e.target.value);
        userPizzaSelections.splice(removeItem, 1);
    }

    // Keep track of the total toppings checked.
    totalToppings = $('input:checkbox:checked').length;

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

    // Globally set the user cheese choice. These variables will be used at check out.
    cheeseOption = e.target.id;
    cheeseChoice = e.target.selectedIndex;

});

// Set the global cost for sauce
$('.sauce').change(function (e) {

    //Set the global crust price
    saucePrice = Number(e.target.value);

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

    // Clear unused crust drop downs
    clearDropDowns(e);

});

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

//Run applications
window.addEventListener('load', () => {

    hideOptionsOnLoad();

});
