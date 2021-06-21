let today = moment();
let hour = today.format("H");

$("#currentDay").text(today.format("dddd, MMMM Do"));

function createHTML() {
    for (let i = 9; i < 18; i++) {
        let row = $("<div>");
        let col1 = $("<div>");
        let col2 = $("<textarea>");
        let col3 = $("<button>");
        let col3Glyph = $("<i>");

        row.attr("class", "row");
        col1.attr("class", "col-1 hour");
        col2.attr("id", "textarea" + (i - 9));

        if (hour > i) {
            col2.attr("class", "past col-10");
        } else if (hour == i) {
            col2.attr("class", "present col-10");
        } else {
            col2.attr("class", "future col-10");
        }

        col3.attr("class", "col-1 saveBtn");
        col3.attr("id", "button" + (i - 9));
        col3Glyph.attr("class", "fas fa-save");
        col3Glyph.attr("id", "glyph" + (i - 9));
        if (i < 13) {
            if (i == 12) {
                col1.text(i + "PM");
            } else {
                col1.text(i + "AM");
            }
        } else {
            col1.text((i - 12) + "PM");
        }

        col3.append(col3Glyph);
        $(".container").append(row);
        row.append(col1);
        row.append(col2);
        row.append(col3);
    }
}

function saveToLocalStorage(rowNum) {
    let localStorageName = "textarea" + rowNum;
    let localStorageValue = "#textarea" + rowNum;
    localStorage.setItem(localStorageName, $(localStorageValue).val());
}

createHTML();

$(".saveBtn, ").on("click",  function(event) {
    event.preventDefault();
    let buttonId = event.target.id;
    saveToLocalStorage(buttonId.slice(-1));
});