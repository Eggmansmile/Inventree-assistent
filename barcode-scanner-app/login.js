// login.js - Manages authentication state and UI

// Global object to hold authentication credentials.
// This can be accessed from other scripts (like script.js) to perform authentication.
const auth = {
    username: '',
    password: '',

    // Save credentials to localStorage for persistence
    save() {
        localStorage.setItem('inventree_username', this.username);
        localStorage.setItem('inventree_password', this.password);
        // WARNING: This is for temporary debugging ONLY.
        // Displaying passwords is a major security risk. Remove this line after testing.
        logToTerminal(`DEBUG: Credentials Saved - User: ${this.username}, Pass: ${this.password}`);
    },

    // Load credentials from localStorage
    load() {
        this.username = localStorage.getItem('inventree_username') || '';
        this.password = localStorage.getItem('inventree_password') || '';
    }
};

// Helper function to log messages to the on-screen terminal
function logToTerminal(message) {
    const terminal = document.getElementById('terminal');
    if (terminal) {
        const timestamp = new Date().toLocaleTimeString();
        // Using textContent is safer as it prevents HTML injection
        // We add to the existing content to create a log
        terminal.textContent += `[${timestamp}] ${message}\n`;
        // Auto-scroll to the bottom to show the latest message
        terminal.scrollTop = terminal.scrollHeight;
    }
}
// Function to manage the login UI
function setupLoginForm() {
    const loginOverlay = document.getElementById('loginOverlay');
    const loginForm = document.getElementById('loginForm');
    const mainContent = document.getElementById('app-content');
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');

    // Pre-fill the form with loaded data
    usernameInput.value = auth.username;
    passwordInput.value = auth.password;

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Update the global auth object with the new values from the form
        auth.username = usernameInput.value;
        auth.password = passwordInput.value;

        // Save the new credentials
        auth.save();

        // Log the successful login to the terminal for feedback.
        // For security, we avoid logging the actual password.
        logToTerminal(`Credentials updated for user: ${auth.username}`);

        // Hide the login form and show the main app content
        loginOverlay.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Hide the main app content
    if (mainContent) mainContent.style.display = 'none';
    loginOverlay.style.display = 'flex';
}

// Initialize the login process when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Load any saved credentials first
    auth.load();
    // Then set up and show the form
    setupLoginForm();
});
