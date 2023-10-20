const deleteButtons = document.querySelectorAll(".taskDeleteBtn");
//function for the delete button and remove the task from the list
deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (event) => {
    const taskIndex = event.target.getAttribute("data-task-index");
    if (taskIndex !== null) {
      // Send a request to the server to delete the task
      fetch(`/delete/${taskIndex}`, {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            location.reload();
          } else {
            console.error("Failed to delete task.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
});