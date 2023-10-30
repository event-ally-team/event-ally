const newEventButton = document.querySelector('#newEventButton');

newEventButton.addEventListener('click', function () {
  document.location.replace('/newEvent');
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

    const response = await fetch(`/checklist/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace(`/checklist/${id}`);
    } else {
      alert('Failed');
    }
  }
};

function editEvent(id, title, type, start_date, end_date) {
  const response = fetch(`/api/events/${id}`, {
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

deleteButtons = document.getElementsByClassName('delete-button');

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', delButtonHandler);
}

checkButtons = document.getElementsByClassName('check-button');

for (let i = 0; i < checkButtons.length; i++) {
  checkButtons[i].addEventListener('click', viewButtonHandler);
}

editButtons = document.getElementsByClassName('edit-button');

for (let i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', editButtonHandler);
}
