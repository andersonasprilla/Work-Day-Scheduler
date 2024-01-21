$(document).ready(function () {
  colorUpdater()

  //WHEN I open the planner
  //THEN the current day is displayed at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D[th]"))


  //WHEN I view the timeblocks for that day
  //THEN each timeblock is color coded to indicate whether it is in the past, present, or future
  function colorUpdater() {
    //Get current Hour
    var currentHour = dayjs().format('HH')

    //Get all elements with class "time-block"
    var timeBlock = $(".time-block")

    //loop through each block and update color
    for (var i = 0; i < timeBlock.length; i++) {
      var hour = timeBlock[i].id.split('-')[1]
      if (hour === currentHour) {
        $(timeBlock[i]).removeClass('future')
        $(timeBlock[i]).addClass('present')
      } else if (hour < currentHour) {
        $(timeBlock[i]).removeClass('future')
        $(timeBlock[i]).addClass('past')
      } else {
        $(timeBlock[i]).addClass('future')
      }
    }
  }


});

//WHEN I click the save button for that timeblock
//THEN the text for that event is saved in local storage

$(".saveBtn").on("click", function () {

  // Get the parent div of the clicked save button
  var parentDiv = $(this).closest(".time-block");
  // Get the hour value from the text inside the corresponding hour div
  var hour = parentDiv.find(".hour").text().trim();
  // Get the value of the textarea inside the same parent div
  var textareaValue = parentDiv.find(".description").val().trim();

  // Check if the textarea is not empty
  if (textareaValue !== "") {
    // Add to localStorage
    localStorage.setItem(hour, textareaValue);
    savedNotification();
  }
});


function savedNotification() {
  $('#saved-to-ls').attr('class', 'd-block text-center')
  setTimeout(() => {
    $('#saved-to-ls').attr('class', 'd-none')
  }, 3000);
}