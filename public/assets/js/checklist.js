document.addEventListener('DOMContentLoaded', function () {
  const checklist = document.getElementById('checklist');
  const dashboardButton = document.querySelector('.dashboardButton');
  const newItemButton = document.querySelector('.newItemButton');
  const newItemModal = document.getElementById('newItemModal');
  const closePopup = document.getElementById('closePopup');
  const addNewItemButton = document.getElementById('addNewItemButton');
  const newItemTitle = document.getElementById('newItemTitle');
  const newItemDescription = document.getElementById('newItemDescription');

  // Function to delete the item
  function handleDeleteCard(event) {
    const card = event.target.closest('.card');
    if (card) {
      card.remove();
    }
  }

  // Function to toggle the completion status of a checklist item.
  function toggleChecklistItem(event) {
    const card = event.target.closest('.card');
    if (card) {
      if (card.classList.contains('completed')) {
        card.classList.remove('completed');
        card.querySelector('.checklistCheckIcon').style.display =
          'inline-block';
        const undoButton = card.querySelector('.undoButton');
        if (undoButton) {
          undoButton.style.display = 'none';
        }
      } else {
        card.classList.add('completed');
        card.querySelector('.checklistCheckIcon').style.display = 'none';
        const undoButton = card.querySelector('.undoButton');
        if (undoButton) {
          undoButton.style.display = 'inline-block';
        }
      }
    }
  }

  // Function for the undo button
  function handleUndoClick(event) {
    const undoButton = event.target;
    const card = undoButton.closest('.card');
    if (card) {
      card.classList.remove('completed');
      card.querySelector('.checklistCheckIcon').style.display = 'inline-block';
      undoButton.style.display = 'none';
    }
  }

  // Add event listeners for the checklist card buttons for  the completed checklist, delete checklist button and undo button.
  checklist.addEventListener('click', function (event) {
    if (event.target.classList.contains('checklistCheckIcon')) {
      toggleChecklistItem(event);
    } else if (event.target.classList.contains('checklistDeleteIcon')) {
      handleDeleteCard(event);
    } else if (event.target.classList.contains('undoButton')) {
      handleUndoClick(event);
    }
  });
});

// Event listener for the Dashboard button
dashboardButton.addEventListener('click', function () {
  document.location.replace('/dashboard');
});

// Event listener for the new item button to show the pop-up
newItemButton.addEventListener('click', function () {
  newItemModal.style.display = 'flex';
});

// Event listener to close the pop-up
closePopup.addEventListener('click', function () {
  newItemModal.style.display = 'none';
});

// Event listener to add a new item
addNewItemButton.addEventListener('click', function () {
  const title = newItemTitle.value;
  const description = newItemDescription.value;

  if (title && description) {
    createCard(title, description);

    newItemTitle.value = '';
    newItemDescription.value = '';
    newItemModal.style.display = 'none';
  }
});

// Function to fetch checklist data using event_id
function fetchChecklistData(eventId) {
  fetch(`/api/defaultEventItemData/${eventId}`)
    .then((response) => response.json())
    .then((data) => {
      const source = document.getElementById('checklist-template').innerHTML;
      const template = Handlebars.compile(source);
      const context = { checklistItems: data };
      const html = template(context);
      checklist.innerHTML = html;
    })
    .catch((error) => {
      console.error('Error fetching checklist data:', error);
    });
}

// Function to fetch defaultEventItemData and use the event ID
fetch('/api/defaultEventItemData')
  .then((response) => response.json())
  .then((data) => {
    const eventId = data.eventId;
    fetchChecklistData(eventId);
  })
  .catch((error) => {
    console.error('Error fetching defaultEventItemData:', error);
  });

// Function to create a new checklist item
function createChecklistItem(title, description) {
  const newItem = {
    title,
    description,
  };

  fetch('/api/checklist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => {
      if (response.status === 201) {
        fetchChecklist();
      } else {
        console.error('Error creating checklist item');
      }
    })
    .catch((error) => {
      console.error('Error creating checklist item:', error);
    });
}

// Function to delete a checklist item
function deleteChecklistItem(id) {
  fetch(`/api/checklist/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 204) {
        fetchChecklist();
      } else {
        console.error('Error deleting checklist item');
      }
    })
    .catch((error) => {
      console.error('Error deleting checklist item:', error);
    });
}

fetchChecklistData(0);
