$(document).ready(function () {
  colorUpdater()

  //WHEN I open the planner
  //THEN the current day is displayed at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D[th]"))


  //WHEN I view the timeblocks for that day
  //THEN each timeblock is color coded to indicate whether it is in the past, present, or future
  function colorUpdater() {
    var currentHour = dayjs().format("HH")
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

  //WHEN I click the save button for that timeblock
  //THEN the text for that event is saved in local storage
  $(".saveBtn").on("click", function () {

    var parentDiv = $(this).closest(".time-block");
    var hour = parentDiv.find(".hour").text().trim();
    var textareaValue = parentDiv.find(".description").val().trim();

    // Check if the textarea is not empty
    if (textareaValue !== "") {
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

  // WHEN I refresh the page
  // THEN the saved events persist
    $('#hour-09 .description').val(localStorage.getItem('9AM'));
    $('#hour-10 .description').val(localStorage.getItem('10AM'));
    $('#hour-11 .description').val(localStorage.getItem('11AM'));
    $('#hour-12 .description').val(localStorage.getItem('12AM'));
    $('#hour-13 .description').val(localStorage.getItem('1PM'));
    $('#hour-14 .description').val(localStorage.getItem('2PM'));
    $('#hour-15 .description').val(localStorage.getItem('3PM'));
    $('#hour-16 .description').val(localStorage.getItem('4PM'));
    $('#hour-17 .description').val(localStorage.getItem('5PM'));
});


