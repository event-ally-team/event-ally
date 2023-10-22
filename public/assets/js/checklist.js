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











  
});
