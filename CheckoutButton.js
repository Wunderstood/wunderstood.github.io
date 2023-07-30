// Stripe instance
var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Your Stripe publishable key

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

async function checkout(event) {
    event.preventDefault();
    
    // Fetch the user session from the server
    const userSession = await fetchUserSession();
    
    if (!userSession || !userSession.sessionId) {
      console.error('No user session found');
      return;
    }
  
    var productId = event.target.dataset.productId; 
    console.log('Product ID:', productId);
    console.log('Session ID:', userSession.sessionId);
  
    // On button click, make a request to your server to create a Checkout Session
    fetch('https://payments.wunderstood.com/create-checkout-session', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: productId, // Use the provided product ID
        sessionId: userSession.sessionId, // The session ID fetched from the server
        accessToken: accessToken
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(session) {
      return stripe.redirectToCheckout({ sessionId: session.sessionId });
    })
    .then(function(result) {
      if (result.error) {
        // If redirectToCheckout fails due to a browser or network
        // error, display the localized error message to your customer.
        alert(result.error.message);
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#checkout-btn').addEventListener('click', checkout);
});
