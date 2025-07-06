// login.js - Handles login UI and localStorage

// Save login data to localStorage
function saveLoginData(username, password) {
    localStorage.setItem('inventree_username', username);
    localStorage.setItem('inventree_password', password);
}

// Load login data from localStorage
function loadLoginData() {
    return {
        username: localStorage.getItem('inventree_username') || '',
        password: localStorage.getItem('inventree_password') || ''
    };
}

// Show login form and handle login
function showLoginForm() {
    // Hide the main app content
    const mainContent = document.getElementById('app-content');
    if (mainContent) mainContent.style.display = 'none';

    // Show the overlay (already in HTML)
    let overlay = document.getElementById('loginOverlay');
    overlay.style.display = 'flex';

    // Pre-fill if data exists
    const loginData = loadLoginData();
    document.getElementById('loginUsername').value = loginData.username;
    document.getElementById('loginPassword').value = loginData.password;

    // Handle form submit
    document.getElementById('loginForm').onsubmit = function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        saveLoginData(username, password);
        overlay.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
        // Optionally, trigger login check with server here
    };
}

// Show login form on page load
window.addEventListener('DOMContentLoaded', () => {
    showLoginForm();
});
