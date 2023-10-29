
  
  const newEventButton = document.querySelector('#newEventButton');

  newEventButton.addEventListener('click', function () {
    document.location.replace('/newEvent');
    console.log("true");
  });


  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete event');
      }
    }
  };

  const viewButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      document.location.replace(`/events/${id}`);
    }
  };



  function editEvent(id, title, type, start_date, end_date) {

  const response = fetch(`/api/dish/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      type,
      start_date,
      end_date,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert('Failed to edit event');
  }

}

  document
    .querySelector('.delete-button-event-card')
    .addEventListener('click', delButtonHandler);


  document
  .querySelector('.newEventButton')
  .addEventListener('click', newEventButtonHandler);

    document
    .querySelector('.check-button-event-card')
    .addEventListener('click', viewButtonHandler);

