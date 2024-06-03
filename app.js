const apiKey = 'eb6026dc';
const loggedInUser = sessionStorage.getItem('loggedInUser');

// Function to search for movies and display results
function searchMovies(query) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('searchResults');
            results.innerHTML = '';
            if (data.Search) {
                data.Search.forEach(movie => {
                    const movieElement = createMovieCard(movie);
                    results.appendChild(movieElement);
                });
            } else {
                results.innerHTML = 'No results found';
            }
        });
}

// Function to create a movie card with add to list button
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    movieCard.id = `movie-${movie.imdbID}`;
    movieCard.innerHTML = `
        <div>
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
        <div class="addToListContainer">
            <button class="addToList" onclick="showAddToListOptions('${movie.imdbID}', '${movie.Title}')">Add to List</button>
        </div>
    `;
    return movieCard;
}

// Function to show dropdown to add movie to list
function showAddToListOptions(imdbID, title) {
    console.log(`Showing add to list options for movie ${title} (${imdbID})`);
    const lists = getUserLists(loggedInUser);
    const options = lists.map(list => `<option value="${list.name}">${list.name}</option>`).join('');
    const listSelectHTML = `
        <div class="addToListDropdown">
            <select id="listSelect-${imdbID}" class="listSelect">
                ${options}
            </select>
            <button onclick="addToMyList('${imdbID}', '${title}')">Add</button>
        </div>
    `;
    const movieElement = document.getElementById(`movie-${imdbID}`);
    const addToListContainer = movieElement.querySelector('.addToListContainer');
    addToListContainer.insertAdjacentHTML('beforeend', listSelectHTML);
}

// Function to add movie to list
function addToMyList(imdbID, title) {
    console.log(`Adding movie ${title} (${imdbID}) to list`);
    const listName = document.getElementById(`listSelect-${imdbID}`).value;
    console.log(`Selected list: ${listName}`);
    const lists = getUserLists(loggedInUser);
    const list = lists.find(list => list.name === listName);
    if (list) {
        list.movies.push({ imdbID, title });
        saveUserLists(loggedInUser, lists);
        alert(`Added "${title}" to "${listName}"`);
        displayUserLists(); // Update the displayed lists after adding a movie
    } else {
        alert('List not found');
    }
}

// Function to display user lists
function displayUserLists() {
    const lists = getUserLists(loggedInUser);
    const movieListsContainer = document.getElementById('movieLists');
    movieListsContainer.innerHTML = '';
    lists.forEach(list => {
        const listElement = document.createElement('div');
        listElement.classList.add('movieList');
        listElement.innerHTML = `
            <h3>${list.name} (${list.visibility})</h3>
            <ul>
                ${list.movies.map(movie => `<li>${movie.title}</li>`).join('')}
            </ul>
        `;
        movieListsContainer.appendChild(listElement);
    });
}

// Function to retrieve user lists from local storage
function getUserLists(username) {
    const lists = localStorage.getItem(`${username}_lists`);
    return lists ? JSON.parse(lists) : [];
}

// Function to save user lists to local storage
function saveUserLists(username, lists) {
    localStorage.setItem(`${username}_lists`, JSON.stringify(lists));
}

// Event listeners and function calls

document.getElementById('searchButton')?.addEventListener('click', function () {
    const query = document.getElementById('searchInput').value;
    searchMovies(query);
});

document.getElementById('newListForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const newListName = document.getElementById('newListName').value;
    const listVisibility = document.getElementById('listVisibility').value;
    const lists = getUserLists(loggedInUser);
    lists.push({ name: newListName, visibility: listVisibility, movies: [] });
    saveUserLists(loggedInUser, lists);
    displayUserLists();
    document.getElementById('newListForm').reset();
    alert('New list created');
});

document.getElementById('logout')?.addEventListener('click', function () {
    sessionStorage.removeItem('loggedInUser');
});

// Call this function to display lists on the home.html page
if (document.getElementById('movieLists')) {
    displayUserLists();
}





// Function to show dropdown to add movie to list
function showAddToListOptions(imdbID, title) {
    console.log(`Showing add to list options for movie ${title} (${imdbID})`);
    const lists = getUserLists(loggedInUser);
    const options = lists.map(list => `<option value="${list.name}">${list.name}</option>`).join('');
    const listSelectHTML = `
        <div class="addToListDropdown">
            <select id="listSelect-${imdbID}" class="listSelect">
                ${options}
            </select>
            <button onclick="addToMyList('${imdbID}', '${title}')">Add</button>
        </div>
    `;
    const movieElement = document.getElementById(`movie-${imdbID}`);
    const addToListContainer = movieElement.querySelector('.addToListContainer');
    addToListContainer.innerHTML = listSelectHTML;
}
