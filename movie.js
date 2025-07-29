// Fetching Id from HTML
let searchInput = document.getElementById("searchBox");
let button = document.getElementById("search");
let title = document.getElementById("title");
let thumbnail = document.getElementById("thumbnail");
let rating = document.getElementById("rating");
let release = document.getElementById("year");
let earnings = document.getElementById("earning");
let staring = document.getElementById("stars");
let genre = document.getElementById("genre");
let runTime = document.getElementById("runTime");

// Fetching Data from the API using Async Function
async function dataFetch(movieName) {
  try {
    let response = await fetch(
      `https://www.omdbapi.com/?t=${movieName}&apikey=87188f41`
    );
    let data = await response.json();

    if (data.Response === "False") throw new Error(data.Error);

    // Corrected Property Access — directly from the object
    title.textContent = data.Title;
    rating.textContent = data.imdbRating + " / 10";
    staring.textContent = data.Actors;
    genre.textContent = data.Genre;
    release.textContent = data.Released;
    earnings.textContent = "N/A"; // OMDb API does not provide earnings
    thumbnail.src = data.Poster;

    // Runtime conversion
    let runtimeStr = data.Runtime; // e.g. "192 min"
    let runtimeMinutes = parseInt(runtimeStr); // Extract number
    if (!isNaN(runtimeMinutes)) {
      let hours = Math.floor(runtimeMinutes / 60);
      let minutes = runtimeMinutes % 60;
      runTime.textContent = `${hours}h ${minutes} min, ${data.Released}`;
    } else {
      runTime.textContent = data.Runtime;
    }
  } catch (error) {
    console.error(error);
    alert("Error: " + error.message);
  }
}

// Load a default movie on page load
dataFetch("Avatar: The Way of Water");

// Event listener for search button
button.addEventListener("click", function () {
  let inputValue = searchInput.value.trim();
  if (inputValue === "") {
    alert("Please enter a movie name");
    return;
  }
  dataFetch(inputValue);
});
