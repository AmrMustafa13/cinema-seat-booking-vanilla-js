// get the selectors
const selectMovie = document.querySelector(".movie");
const seats = document.querySelectorAll(".container .seat:not(.occupied)");
const container = document.querySelector(".container");
const total = document.querySelector(".total");
const count = document.querySelector(".count");

populateUI();
let ticketPrice = +selectMovie.value;

// setting the movie info into the local storage 
function saveMovieInfo(movieIndex) {
    localStorage.setItem("movieIndex", movieIndex);
}

// updating the num and price of the tickets
function updateThePrice() {
    const selectedSeats = document.querySelectorAll(".container .seat.selected");
    const selectedSeatsIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeatsIndexes", JSON.stringify(selectedSeatsIndexes));
    const numOfSelected = selectedSeats.length;
    count.innerHTML = numOfSelected;
    total.innerHTML = numOfSelected * ticketPrice;
}

// getting things from the local storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatsIndexes"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem("movieIndex");
    if (selectedMovieIndex !== null) {
        selectMovie.selectedIndex = selectedMovieIndex;
    }
};

// get the new price according to the movie 
selectMovie.addEventListener("change", e => {
    ticketPrice = +selectMovie.value;
    saveMovieInfo(e.target.selectedIndex);
    updateThePrice();
});

// cange the color for the selected seats
container.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateThePrice();
    }
});

updateThePrice();