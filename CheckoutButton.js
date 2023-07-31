// Import the Auth0 SPA SDK
import createAuth0Client from '@auth0/auth0-spa-js';

// Stripe instance
var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); 

// Function to initialize Auth0 client
let auth0Client;

async function initializeAuth0() {
    auth0Client = await createAuth0Client({
        domain: 'YOUR_AUTH0_DOMAIN',
        client_id: 'YOUR_AUTH0_CLIENT_ID',
        redirect_uri: 'http://localhost:3000',
    });

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        await auth0Client.handleRedirectCallback();
        window.history.replaceState({}, document.title, "/");
    }

    if (await auth0Client.isAuthenticated()) {
        const user = await auth0Client.getUser();
        console.log("User: ", user);
    } else {
        await auth0Client.loginWithRedirect({});
    }
}

window.onload = initializeAuth0;

async function checkout(event) {
    event.preventDefault();

    if (!auth0Client) {
        console.error('Auth0 client is not initialized');
        return;
    }

    const user = await auth0Client.getUser();
    if (!user) {
        console.error('No user logged in');
        return;
    }

    var productId = event.target.dataset.productId; 
    console.log('Product ID:', productId);

    const accessToken = await auth0Client.getTokenSilently();

    // On button click, make a request to your server to create a Checkout Session
    fetch('https://payments.wunderstood.com/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            productId: productId,
            userId: user.sub
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function(result) {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.checkout-btn');
    buttons.forEach(function(button) {
        button.addEventListener('click', checkout);
    });
});
