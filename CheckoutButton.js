// Your Stripe publishable key
var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); 

function checkout(event) {
  event.preventDefault();
  
  var productId = event.target.dataset.productId;

  // On button click, make a request to your server to create a Checkout Session
  fetch('https://payments.wunderstood.com/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: productId, // Use the provided product ID
      sessionId: sessionStorage.getItem('sessionID') // The session ID saved after successful login
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

export default checkout;

// Ensure the DOM is fully loaded before attaching event listeners
window.onload = function() {
  var checkoutLink = document.getElementById('checkoutLink');

  if(checkoutLink) {
    checkoutLink.addEventListener('click', checkout);
  }
};
