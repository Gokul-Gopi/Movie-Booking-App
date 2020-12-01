const container = document.querySelector("#screen_seats");
const seats = document.querySelectorAll(".rows .seats:not(.occupied)");
const count = document.querySelector(".count");
const cost = document.querySelector(".cost");
const movies = document.querySelector(".movie");
popualteUI();

let price = +movies.value;


function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll(".rows .seats.selected");

    const selectIndex = [...selectedSeats].map(function (cur) {
        return [...seats].indexOf(cur);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(selectIndex))

    const countSeats = selectedSeats.length;
    count.innerText = countSeats;
    cost.innerText = countSeats * price;
}

function setMovieData(movieIndex, price) {
    localStorage.setItem('SelectedMovieIndex', movieIndex)
    localStorage.setItem('SelectedMoviePrice', price)
}

function popualteUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function (seats, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seats.classList.add("selected")
            }
        })
    }

    const selectMovieIndex = localStorage.getItem("selectMovieIndex")
    if (selectMovieIndex !== null) {
        movies.selectedIndex = selectMovieIndex;
    }

}









//Movie select listner
movies.addEventListener("change", (el) => {
    price = +el.target.value;
    setMovieData(el.target.selectedIndex, el.target.value)
    updateSelectedSeats();
})

//Select seat listner
container.addEventListener("click", (el) => {
    if (el.target.classList.contains("seats") && (!el.target.classList.contains("occupied"))) {
        el.target.classList.toggle("selected")
        updateSelectedSeats();
    }
})

updateSelectedSeats();