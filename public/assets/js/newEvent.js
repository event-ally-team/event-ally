
  const createEventBtn = document.getElementById('createNewEventButton');
  const dashboardButton = document.getElementById('dashboardButton');



  const newFormHandler = async () => {

    start_date = (`${document.getElementById('fromDate').value.trim()}`);
    end_date = (`${document.getElementById('toDate').value.trim()}`);
    title = document.getElementById('new-user-event').value.trim();
    type = document.querySelector('#newEventCategory').value.trim();
    console.log(title);


//  if (eventTitle.value.trim() && categorySelector.value.trim() && eventStartDate.value.trim() && eventEndDate.value.trim()) {
    const response1 = await fetch(`/api/events/`, {
      method: 'POST',
      body: JSON.stringify({ title, type, start_date, end_date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response1.ok) {

      const response2 = await fetch(`/api/defaulteventitems/${response1.type}`, {
        method: 'GET',
      });

      if (response2.ok) {

        const seedDatabase = async () => {

      for (const eventItem of response2) {
          await EventItem.create({
            ...eventItem,
            event_id: response1.event_id,
            user_id: req.session.user_id,
          });
        }

        process.exit(0);
      };

      seedDatabase();

      } else {
        alert('Failed to load generic event item data');
      }

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


  
