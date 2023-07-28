// profile.js

// Function to fetch the user's profile data from the server
async function fetchUserProfile() {
    try {
      const response = await fetch('https://auth.wunderstood.com/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      if (!response.ok) {
        console.log("I'm failing with: "+response);
        throw new Error('Failed to fetch user profile');
      }
  
      const userProfile = await response.json();
      
      return userProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
  
  // Function to display the user's profile data on the page
  function displayProfileData(userProfile) {
    const profileContainer = document.getElementById('profile-container');
    if (userProfile) {
      profileContainer.innerHTML = `
        <h2>Welcome, ${userProfile.name}!</h2>
        <p>Email: ${userProfile.email}</p>
        <p>Username: ${userProfile.nickname}</p>
      `;
    } else {
      profileContainer.innerHTML = '<p>Failed to fetch user profile. Please log in. I see: </p>'+ userProfile;
    }
  }
  
  // Main function to fetch and display user profile on page load
  async function initProfilePage() {
    const userProfile = await fetchUserProfile();
    displayProfileData(userProfile);
  }
  
  // Call the main function when the page has loaded
  window.addEventListener('load', initProfilePage);
  