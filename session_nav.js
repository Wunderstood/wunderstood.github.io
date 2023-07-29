// session_nav.js

// Fetch the 'user' object from the session
// Note: The way to fetch the session data may vary depending on how your session is being managed
// The following is just an example and should be replaced by your actual session fetching method
const user = sessionStorage.getItem('user');

// Check if user object is null or not
if (user) {
  // user is logged in
  // Change 'Login' to 'Dashboard'
  const loginLink = document.querySelector('a[href="https://auth.wunderstood.com/login"]');
  if (loginLink) {
    loginLink.href = "https://www.wunderstood.com/Dashboard"; // replace with your actual dashboard link
    loginLink.textContent = "Dashboard";
  }
}
