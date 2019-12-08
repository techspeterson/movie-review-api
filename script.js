const form = document.getElementById("form");
const searchBox = document.getElementById("search");
const container = document.getElementById("container");

function displayMovie(movie) {
  function addElement(tag, contents) {
    let newElement = document.createElement(tag);
    newElement.innerHTML = contents;
    displayBox.appendChild(newElement);
    return newElement;
  }

  let displayBox = document.createElement("div");
  displayBox.classList.add("movie");
  container.appendChild(displayBox);

  if (movie.multimedia) {
    let img = document.createElement("img");
    img.src = movie.multimedia.src;
    displayBox.appendChild(img);
  }

  let heading = addElement("h3", `<i class="fas fa-ticket-alt"></i> ${movie.display_title}`);
  if (movie.mpaa_rating) {
    heading.append(` (${movie.mpaa_rating})`);
  }
  addElement("h4", movie.headline);
  addElement("p", movie.summary_short);
  let link = addElement("a", movie.link.suggested_link_text);
  link.href = movie.link.url;
  addElement("span", ` (${movie.byline}, ${movie.publication_date})`);
}

async function searchMovies(query) {
  let response = await axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${query}&api-key=AZK7tW1r7HqmD6vRNv51JdzPzdjRq5p6`);

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  if (response.data.results.length == 0) {
    container.innerHTML = "<em>No results to display</em>";
  }

  for (movie of response.data.results) {
    displayMovie(movie);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchMovies(searchBox.value)
    .catch((error) => {
      console.log(`Error retrieving results: ${error}`);
    });
});