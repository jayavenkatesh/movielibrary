const API_KEY = 'YOUR_OMDB_API_KEY';  // Replace with your OMDB API key

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Placeholder for actual login logic
    alert(`Logged in with Email: ${email} and Password: ${password}`);
    showHomePage();
}

function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Placeholder for actual registration logic
    alert(`Registered with Email: ${email} and Password: ${password}`);
    showHomePage();
}

function showHomePage() {
    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('homeContainer').style.display = 'block';
}

function searchMovies(event) {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value;
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('movieResults');
            resultsContainer.innerHTML = '';
            if (data.Response === 'True') {
                data.Search.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.innerHTML = `
                        <h3>${movie.Title} (${movie.Year})</h3>
                        <img src="${movie.Poster}" alt="${movie.Title}" style="width: 100px;">
                    `;
                    resultsContainer.appendChild(movieElement);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
