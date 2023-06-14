const container = document.querySelector(".container");
const count = document.getElementById("count");
const amonut = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    //? sadece seat elemanlarina tikladigimizda gelmesi icin yaptim.
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function (e) {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");

  const selectedSeatsArr = [];
  const seatsArr = [];

  selectedSeats.forEach(function (seat) {
    selectedSeatsArr.push(seat);
  });

  //* spread

  seats.forEach(function (seat) {
    seatsArr.push(seat);
  });

  //* elemanlarin icinden sectigim eleman kacinci indexte oldugunu bylmak icin asagidaki kodu yazdim
  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  let selectedSeatCount = selectedSeats.length; //? kac koltuk sectiysek fiyat carpmamiz gerekiyor burada.LEngth ile sayiyi aldim.
  count.innerText = selectedSeatCount; //? sectigim koltuk sayisini en altta sayi olarak yazdirdim.
  amonut.innerText = selectedSeatCount * select.value;

  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

//*localStorage kaydettim.
function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndexs);
}
