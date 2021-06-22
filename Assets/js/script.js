// Instantiate the moment object to display todays date as well as grab the current hour from the moment object
let today = moment();
let hour = today.format("H");

// Sets the current date in the jumbotron
$("#currentDay").text(today.format("dddd, MMMM Do"));

// This function goes through and dynamically generates all of the table with the appropriate times and colors
function createHTML() {
    // For loop is set from 9 to 18 as it dynamically sets up the times in the first column while still iterating 9 times
    for (let i = 9; i < 18; i++) {
        // Declarations of all of the tags that need to be created
        let row = $("<div>");
        let col1 = $("<div>");
        let col2 = $("<textarea>");
        let col3 = $("<button>");
        let col3Glyph = $("<i>");

        row.attr("class", "row");

        // This set of if statements sets up the first columns with the appropriate times and labels such as AM or PM
        col1.attr("class", "col-1 hour");
        if (i < 13) {
            if (i == 12) {
                col1.text(i + "PM");
            } else {
                col1.text(i + "AM");
            }
        } else {
            col1.text((i - 12) + "PM");
        }

        // This set of if statements sets up the second column with the dynamic coloring based on the current time of day
        col2.attr("id", "textarea" + (i - 9));
        if (hour > i) {
            col2.attr("class", "past col-10");
        } else if (hour == i) {
            col2.attr("class", "present col-10");
        } else {
            col2.attr("class", "future col-10");
        }

        // This section generated the third column and assigns classes as well as sets up the icon in the button
        col3.attr("class", "col-1 saveBtn");
        col3.attr("id", "button" + (i - 9));
        col3Glyph.attr("class", "fas fa-save");
        col3Glyph.attr("id", "glyph" + (i - 9));

        // This section append all of the tags onto the container given in the html
        col3.append(col3Glyph);
        $(".container").append(row);
        row.append(col1);
        row.append(col2);
        row.append(col3);
    }
}

// This function sets up the keys and values that are set in localStorage where the row number is passed in to differentiate the data
function saveToLocalStorage(rowNum) {
    let localStorageName = "textarea" + rowNum;
    let localStorageValue = "#textarea" + rowNum;
    localStorage.setItem(localStorageName, $(localStorageValue).val());
}

// This function goes through the localStorage and populates the textareas with the appropriate text that was saved
function populateTextareas() {
    for (let i = 0; i < localStorage.length; i++) {
        let textareaId = "#" + localStorage.key(i);
        let textareaKey = localStorage.key(i);
        $(textareaId).text(localStorage.getItem(textareaKey));
    }
}

// The calls of the functions to generate the HTML and populate the texareas
createHTML();
populateTextareas();

// This is the click handler for the buttons which waits until the user click on the button or the icon and calls saveToLocalStorage() to save the text
$(".saveBtn, .fas").on("click", function (event) {
    event.preventDefault();
    let buttonId = event.target.id;
    saveToLocalStorage(buttonId.slice(-1));
});
