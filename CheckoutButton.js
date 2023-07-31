// Import js-cookie library
const Cookies = require('js-cookie');

// Stripe instance
var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); 

async function checkout(event) {
    event.preventDefault();

    // Get the uuid from the cookie
    const uuid = Cookies.get('uuid');
    console.log('UUID:', uuid);

    // Fetch the product ID from the clicked button's data attribute
    const productId = event.target.dataset.productId; 
    console.log('Product ID:', productId);

    // Make a request to your server to create a Checkout Session
    fetch('https://payments.wunderstood.com/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            uuid: uuid   // Include the uuid in the request body
        })
    })
    .then(function(response) {
        console.log('Response from server:', response);
        return response.json();
    })
    .then(function(session) {
        console.log('Checkout session:', session);
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function(result) {
        console.log('Stripe result:', result);
        if (result.error) {
            console.error('Stripe error:', result.error.message);
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
