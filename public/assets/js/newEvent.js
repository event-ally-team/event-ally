
  const createEventBtn = document.getElementById('createNewEventButton');
  const dashboardButton = document.getElementById('dashboardButton');



  const newFormHandler = async () => {

    start_date = (`${document.getElementById('fromDate').value.trim()}`);
    end_date = (`${document.getElementById('toDate').value.trim()}`);
    title = document.getElementById('new-user-event').value.trim();
    type = document.querySelector('#newEventCategory').value.trim();
    console.log(title);


//  if (eventTitle.value.trim() && categorySelector.value.trim() && eventStartDate.value.trim() && eventEndDate.value.trim()) {
    const response = await fetch(`/api/events/`, {
      method: 'POST',
      body: JSON.stringify({ title, type, start_date, end_date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create event');
    }
  

};

  
  createEventBtn.addEventListener("click", () => {
    newFormHandler()
  });

  dashboardButton.addEventListener('click', function () {
    document.location.replace('/dashboard');
  });


  
