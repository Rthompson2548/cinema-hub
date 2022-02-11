const container = document.querySelector(".container");
/** `:not(.occupied)` => only creates a node list of all seats without occupied class */
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

populateUI();

let ticketPrice = +movieSelect.value;

/** save the selected movie index & price */
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice)
}

/** updates user's total number of tickets & cost */
function updateOrder() {
  /** stores all seats that have the `selected` class on them */
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  /** converts node list of select seats into an array */
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
  /** retrieves the selectedSeats that were stored in localStorage & reformats them into a JSON object */
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  /** check if there is any data in selectedSeats */
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      /** checks if the returned index a positive number (means that it exists) */
      if (selectedSeats.indexOf(index) > -1) {
        /** uses add() to save the seat's class into localStorage permanently */
        seat.classList.add("selected");
      }
    })
  }

  /** uses selectedMovieIndex that was set to store movie index into localStorage */
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  
  /** checks if the movie's index is already in the current localStorage */
  if (selectedMovieIndex !== null) {
    /** sets the movie into localStorage permanently */
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};


/** changes ticketPrice to the selected movie's ticket price */
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateOrder();
})

/** event handler for changing an unoccupied seat's class to `selected` if the user clicks on it */
container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    /** uses `toggle` to select/deselect the seat class on click */
    event.target.classList.toggle('selected');

    updateOrder();
  }
});


/** sets the initial user's count and total */
updateOrder();


