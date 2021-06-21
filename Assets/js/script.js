let today = moment();

$("#currentDay").text(today.format("dddd, MMMM Do"));

for(let i = 0; i < 9; i++) {
    let row = $("<div>");
    let col1 = $("<div>");
    let col2 = $("<input>");
    let col3 = $("<button>");

    row.attr("class", "row");
    col1.attr("class", "col-2 hour");
    col2.attr("class", "col-8");
    col3.attr("class", "col-2 saveBtn");

    $(".container").append(row);
    row.append(col1);
    row.append(col2);
    row.append(col3);
}