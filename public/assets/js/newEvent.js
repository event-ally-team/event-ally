document.addEventListener('DOMContentLoaded', function () {
  const categorySelector = document.getElementById('newEventCategory');
  const eventTitle = document.querySelector('new-user-event');
  const eventStartDate = document.querySelector('fromDate');
  const eventEndDate = document.querySelector('toDate');
  const createEventBtn = document.querySelector('createNewEventButton');
  const dashboardButton = document.querySelector('.dashboardButton');

  // Function to create a new event
  function createEvent(title, type, start_date, end_date) {
    const newItem = {
      title,
      type,
      start_date,
      end_date,
    };

    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.status === 201) {
          // The event was successfully created
          document.location.replace('/dashboard');
        } else {
          console.error('Error creating event');
        }
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  }

  function createNewEvent() {
    if (eventTitle.value.trim() && categorySelector.value.trim() && eventStartDate.value.trim() && eventEndDate.value.trim()) {
      createEvent(eventTitle.value.trim(), categorySelector.value.trim(), eventStartDate.value.trim(), eventEndDate.value.trim());
    }
  }

  createEventBtn.addEventListener("click", () => {
    createNewEvent()
  });

  dashboardButton.addEventListener('click', function () {
    document.location.replace('/dashboard');
  });

});
