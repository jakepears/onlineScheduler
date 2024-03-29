/** @format */

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

hours.forEach((hour) => {
	// Create time block
	const row = `
    <div id="hour-${hour}" class="row time-block">
      <div class="col-2 col-md-1 hour text-center py-3">${
				hour === 13
					? 1
					: hour === 14
					? 2
					: hour === 15
					? 3
					: hour === 16
					? 4
					: hour === 17
					? 5
					: hour
			}PM</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
  `;
	// Append new row to container
	$('.container').append(row);
});

// Add past, present, or future class to each time block
const updateHourlyBlocks = () => {
	let currentHour = dayjs().hour();

	$('.time-block').each((index, element) => {
		const hour = parseInt(element.id.split('-')[1]);

		if (hour < currentHour) {
			$(element).addClass('past');
		} else if (hour === currentHour) {
			$(element).addClass('present');
		} else {
			$(element).addClass('future');
		}
	});
};

// Change color of time blocks based on past, present, or future
updateHourlyBlocks();

// Add current date to header
const setCurrentTime = () => {
	$('#currentDay').text(dayjs().format('h:mm:ss A : dddd - MMMM D, YYYY'));
};

setInterval(setCurrentTime, 1000);

// Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
const loadSavedData = () => {
	hours.forEach((hour) => {
		const savedData = localStorage.getItem(`hour-${hour}`);
		if (savedData) {
			$(`#hour-${hour} .description`).val(savedData);
		}
	});
};

// Save user input in local storage
$('.container').on('click', '.saveBtn', function () {
	const hour = $(this).parent().attr('id');
	const description = $(this).siblings('.description').val();
	localStorage.setItem(hour, description);
});

updateHourlyBlocks();
loadSavedData();
