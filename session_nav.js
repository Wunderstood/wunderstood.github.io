// Function to fetch the user's session data from the server
async function fetchUserSession() {
    try {
        const response = await fetch('https://auth.wunderstood.com/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user session');
        }

        const userSession = await response.json();
        console.log('User session:', userSession);
        return userSession;
    } catch (error) {
        console.error('Error fetching user session:', error);
        return null;
    }
}

// Function to update the navbar based on user's login status
async function updateNavbar() {
    console.log("updating nav bar...");
    const userSession = await fetchUserSession();
    console.log("found user session" + userSession);
    const loginLink = document.querySelector('a[href="https://auth.wunderstood.com/login"]');
    
    if (userSession && userSession.sessionId) {
        loginLink.textContent = 'Dashboard';
        loginLink.href = 'https://wunderstood.com/Dashboard';
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'https://auth.wunderstood.com/login';
    }
}

// Update the navbar when the page has loaded
window.addEventListener('load', updateNavbar);
