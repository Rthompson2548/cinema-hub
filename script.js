const container = document.querySelector(".container");

/** `:not(.occupied)` => only creates a node list of all seats without occupied class */
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");

/** dropdown menu of movies */
const movieSelect = document.getElementById("movie");
/** `+` turns the element from a string into a number */
const ticketPrice = +movieSelect.value;
