// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours of 9am to 5pm
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// display current date in header
$(function () {
  function displayCurrentDate() {
    let currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);
  }

  // display current time in header
  function displayCurrentTime() {
    let currentTime = dayjs().format('h:mm A');
    $('#currentTime').text(currentTime);
  }

  //update time block styles
  function updateBlockStyles() {
    const currentHour = dayjs().hour();

    $('.time-block').each(function () {
      const blockHour = parseInt($(this).attr('data-hour'));

      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  displayCurrentDate();
  displayCurrentTime();
  updateBlockStyles();

  // Call updateBlockStyles function every minute to update styles
  setInterval(updateBlockStyles, 60000);


  $('.saveBtn').on('click', function () {

    let description = $(this).siblings('.description').val().trim();
    // Get id of parent time-block using DOM traversal
    let timeBlockId = $(this).parent().attr('id');

    localStorage.setItem(timeBlockId, description);
  });

  function loadSavedDescriptions() {
    $('.time-block').each(function () {
      let timeBlockId = $(this).attr('id');
      let description = localStorage.getItem(timeBlockId);

      if (description) {
        $(this).find('.description').val(description);
      }
    });
  }

  loadSavedDescriptions();
});
