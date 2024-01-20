$(document).ready(function () {
  colorUpdater()



  //WHEN I view the timeblocks for that day
  //THEN each timeblock is color coded to indicate whether it is in the past, present, or future
  function colorUpdater() {
    //Get current Hour
    var currentHour = "15"

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

  //WHEN I open the planner
  //THEN the current day is displayed at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D[th]"))
});
