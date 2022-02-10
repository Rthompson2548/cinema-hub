const container = document.querySelector(".container");
/** `:not(.occupied)` => only creates a node list of all seats without occupied class */
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
/** dropdown menu of movies */
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

/** updates total & count */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

/** event handler for changing an unoccupied seat's class to `selected` if the user clicks on it */
container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
