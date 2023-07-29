// Function to fetch the user's session status from the server
async function fetchSessionStatus() {
    try {
        const response = await fetch('https://auth.wunderstood.com/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    } catch (error) {
        console.error('Error fetching session status:', error);
        return false;
    }
}

// Function to update the navigation link based on the user's session status
async function updateNav() {
    const isLoggedIn = await fetchSessionStatus();

    const navLinkContainer = document.getElementById('nav-link-container');
    if (isLoggedIn) {
        navLinkContainer.innerHTML = `<a class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-custom-color-2" href="https://auth.wunderstood.com/dashboard" style="padding: 10px 20px;">Dashboard</a>`;
    } else {
        navLinkContainer.innerHTML = `<a class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-custom-color-2" href="https://auth.wunderstood.com/login" style="padding: 10px 20px;">Login</a>`;
    }
}

// Call the function when the page has loaded
window.addEventListener('load', updateNav);
