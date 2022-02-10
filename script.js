const container = document.querySelector(".container");
/** `:not(.occupied)` => only creates a node list of all seats without occupied class */
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
/** dropdown menu of movies */
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

/** updates user's total number of tickets & cost */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

/** changes ticketPrice to the selected movie's ticket price */
movieSelect.addEventListener("change", (event) => {
    ticketPrice = +event.target.value;
})

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
