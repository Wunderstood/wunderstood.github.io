var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Your Stripe publishable key

function checkout(event) {
    console.log('checkout function called');
  event.preventDefault();
  var productId = event.target.dataset.productId; 
  console.log('got productID');
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
function testclick(event){
    console.log("you clicked");
}
document.addEventListener('DOMContentLoaded', function() {
document.querySelector('#checkout-btn').addEventListener('click', checkout);
});