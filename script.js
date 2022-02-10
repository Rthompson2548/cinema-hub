const container = document.querySelector(".container");
/** `:not(.occupied)` => only creates a node list of all seats without occupied class */
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
/** dropdown menu of movies */
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

/** save the selected movie index & price */
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice)
}

/** updates user's total number of tickets & cost */
function updateSelectedCount() {
  /** stores all seats that have the `selected` class on them */
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  /** converts node list of select seats into an array */
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  /** console.log(`seats index: ${seatsIndex}`) => [seat1, seat3, seat7, ...] */
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

}


/** changes ticketPrice to the selected movie's ticket price */
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;
  setMovieData(`current movie index: ${event.target.selectedIndex} ${event.target.value}`);
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
