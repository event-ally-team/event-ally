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

  //function for the undo button
  function handleUndoClick(event) {
    const undoButton = event.target;
    const card = undoButton.closest('.card');
    if (card) {
      card.classList.remove('completed');
      card.querySelector('.checklistCheckIcon').style.display = 'inline-block';
      undoButton.style.display = 'none';
    }
  }

  // Function to create a new checklist
  function createCard(title, description) {
    const card = document.createElement('li');
    card.className = 'card';

    card.innerHTML = `
      <span class="checklistTitle">${title}</span>
      <p class="checklistDescription">${description}</p>
      <span class="checklistCheckIcon"><i class="far fa-check-circle"></i></span>
      <span class="checklistDeleteIcon"><i class="fas fa-trash-alt"></i></span>
      <span class="undoButton" style="display: none"><i class="fas fa-undo"></i></span>
    `;

    const checkIcon = card.querySelector('.checklistCheckIcon');
    checkIcon.addEventListener('click', toggleChecklistItem);

    const deleteIcon = card.querySelector('.checklistDeleteIcon');
    deleteIcon.addEventListener('click', handleDeleteCard);

    const undoButton = card.querySelector('.undoButton');
    if (undoButton) {
      undoButton.addEventListener('click', handleUndoClick);
    }

    checklist.appendChild(card);
  }

  // Event listener for the Dashboard button
  dashboardButton.addEventListener('click', function () {
    window.location.href = 'dashboard.handlebars'; // waiting for the dashboard
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

  const eventId = 'event1';

  // Fetch checklist data using event_id
  fetch('checklist.json')
    .then((response) => response.json())
    .then((data) => {
      const checklistData = data[eventId];

      if (checklistData) {
        checklistData.forEach((task) => {
          createCard(task.title, task.description);
        });
      } else {
        console.error('Event not found in the JSON file');
      }
    })
    .catch((error) => {
      console.error('Error fetching checklist data:', error);
    });

  // Function to display the checklist
  function fetchChecklist() {
    fetch('/api/checklist')
      .then((response) => response.json())
      .then((data) => {
        checklist.innerHTML = ''; // Clear the current checklist
        data.forEach((item) => {
          createCard(item.title, item.description);
        });
      })
      .catch((error) => {
        console.error('Error fetching checklist:', error);
      });
  }

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
          // The item was successfully created
          fetchChecklist(); // Refresh the checklist
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

  fetchChecklist();
});
