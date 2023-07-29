// Function to fetch the user's profile data from the server
async function fetchUserProfile() {
    try {
        const response = await fetch('https://auth.wunderstood.com/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const userProfile = await response.json();

        return userProfile;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}


// Function to update the navbar based on user's login status
async function updateNavbar() {
    console.log("updating nav bar...");
    const userProfile = await fetchUserProfile();
    console.log("found user profile" + userProfile);
    const loginLink = document.querySelector('a[href="https://auth.wunderstood.com/login"]');
    
    if (userProfile) {
        loginLink.textContent = 'Dashboard';
        loginLink.href = 'https://auth.wunderstood.com/dashboard';
    } else {
        loginLink.textContent = 'Login';
        loginLink.href = 'https://auth.wunderstood.com/login';
    }
}

// Update the navbar when the page has loaded
window.addEventListener('load', updateNavbar);
