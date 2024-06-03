document.getElementById('signupForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    localStorage.setItem(username, password);
    alert('User signed up successfully!');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        sessionStorage.setItem('loggedInUser', username);
        window.location.href = 'home.html';
    } else {
        alert('Invalid username or password!');
    }
});

document.getElementById('logout')?.addEventListener('click', function () {
    sessionStorage.removeItem('loggedInUser');
});
