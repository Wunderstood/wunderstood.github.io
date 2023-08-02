function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

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
        //navigate user to home page

        return null;
    }
}

// Function to update the navbar based on user's login status
async function updateDashboard() {
    const loginLink = document.querySelector('a[href="https://auth.wunderstood.com/login"]');
    const userSession = await fetchUserSession();
    
    if (userSession && userSession.sessionId) {
        // Set cookies for uuid, proflag, credit balances, sessionId and username
        document.cookie = `uuid=${userSession.uuid};path=/;max-age=${24 * 60 * 60}`;
        document.cookie = `pro=${userSession.pro};path=/;max-age=${24 * 60 * 60}`;
        document.cookie = `reportBalance=${userSession.reportBalance};path=/;max-age=${24 * 60 * 60}`;
        document.cookie = `summaryBalance=${userSession.summaryBalance};path=/;max-age=${24 * 60 * 60}`;
        document.cookie = `sessionID=${userSession.sessionId};path=/;max-age=${24 * 60 * 60}`;
        document.cookie = `username=${userSession.username};path=/;max-age=${24 * 60 * 60}`; // New cookie for the username


        // Insert fetched data into HTML elements
        document.getElementById('username-element').innerText = userSession.username;
        document.getElementById('summaryBalance-element').innerText = userSession.summaryBalance;
        document.getElementById('reportBalance-element').innerText = userSession.reportBalance;
        document.getElementById('pro-element').innerText = userSession.pro;
        document.getElementById('uuid-element').innerText = userSession.uuid;
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'https://wunderstood.com';
    }
}


// Update the navbar when the page has loaded
window.addEventListener('load', updateDashboard);
