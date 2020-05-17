//Global Variables
let Radio_id;
let curst_option;
let crust_price;
let dropDownArr = ['handTossSelect', 'thinCrustSelect', 'NYStyleSelect', 'glutenSelect'];
let radio_buttons = ['handTossed', 'thinCrust', 'NYStyle', 'glutenFree'];

// Hide all of the crust selections on load
function hideRadioOptions() {
    $('.crust').hide();
}

// Listen for user input on the radio buttons
$(':radio').click(function (e) {
    radio_id = e.target.id;
    crust_option = e.target.value;

    unHideCrust(radio_id);
    console.log(curst_option);
});

// Set the golbal cost for crust
$('.crust').change(function (e) {

    //Set the global crust price
    crust_price = Number(e.target.value);

    // Clear unused crust drop downs
    clearDropDowns(e);

});

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
function unHideCrust(radio_id) {
   
    // Set all options to hide
    hideRadioOptions();

    // Turn radio_Id into a number
    let user_selected_radio = radio_buttons.indexOf(radio_id);

    // Show the user selected radio button
    $('#' + dropDownArr[user_selected_radio]).show();

}


