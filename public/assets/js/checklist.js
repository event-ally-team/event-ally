document.addEventListener("DOMContentLoaded", function () {
  const checklist = document.getElementById("checklist");
  const dashboardButton = document.querySelector(".dashboardButton");
  const newItemButton = document.querySelector(".newItemButton");
  const newItemModal = document.getElementById("newItemModal");
  const closePopup = document.getElementById("closePopup");
  const addNewItemButton = document.getElementById("addNewItemButton");
  const newItemTitle = document.getElementById("newItemTitle");
  const newItemDescription = document.getElementById("newItemDescription");

  function handleDeleteCard(event) {
    const card = event.target.closest(".card");
    if (card) {
      card.remove();
    }
  }

  function toggleChecklistItem(event) {
    const card = event.target.closest(".card");
    if (card) {
      if (card.classList.contains("completed")) {
        card.classList.remove("completed");
        card.querySelector(".checklistCheckIcon").style.display =
          "inline-block";
        const undoButton = card.querySelector(".undoButton");
        if (undoButton) {
          undoButton.style.display = "none";
        }
      } else {
        card.classList.add("completed");
        card.querySelector(".checklistCheckIcon").style.display = "none";
        const undoButton = card.querySelector(".undoButton");
        if (undoButton) {
          undoButton.style.display = "inline-block";
        }
      }
    }
  }

  function handleUndoClick(event) {
    const undoButton = event.target;
    const card = undoButton.closest(".card");
    if (card) {
      card.classList.remove("completed");
      card.querySelector(".checklistCheckIcon").style.display = "inline-block";
      undoButton.style.display = "none";
    }
  }









});
