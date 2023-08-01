// Stripe instance
var stripe = Stripe('pk_test_51NYO3sCrnQSygLy6qcWk0Iy7uVhmwxzPG35y6LVaZA9AFQZro6pjHi4ILPJmWRbL1XvYPz6mgkW0E7PK0z6lXzpa003YXgSZwv');

// Function to get cookie by name
function getCookie(name) {
    let cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0]) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

async function checkout(event) {
    event.preventDefault();

    // Create a new spinner element and style it
    var spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.style.position = 'fixed';
    spinner.style.zIndex = '1000';
    spinner.style.width = '100%';
    spinner.style.height = '100%';
    spinner.style.top = '0';
    spinner.style.left = '0';
    spinner.style.background = 'rgba(0,0,0,0.5)';
    spinner.style.display = 'flex';
    spinner.style.justifyContent = 'center';
    spinner.style.alignItems = 'center';
    spinner.innerHTML = '<img src= "images/StripeCheckoutNav.png" alt="">';

    // Append the spinner to the body
    document.body.appendChild(spinner);

    // Get the uuid from the cookie
    const uuid = getCookie('uuid');
    if (!uuid) {
        window.location.href = "https://auth.wunderstood.com/login";
        return;  // Exit the function
    }
    console.log('UUID:', uuid);

    // Fetch the product ID from the clicked button's data attribute
    const productId = event.target.dataset.productId;
    console.log('Product ID:', productId);

    // Make a request to your server to create a Checkout Session
    fetch('https://payments.wunderstood.com/create-checkout-session', {
        method: 'POST',
        credentials: 'include', // includes credentials in the request
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            uuid: uuid   // Include the uuid in the request body
        })
    })
        .then(function (response) {
            console.log('Response from server:', response);
            return response.json();
        })
        .then(function (session) {
            console.log('Checkout session:', session);
            return stripe.redirectToCheckout({ sessionId: session.sessionId });
        })
        .then(function (result) {
            // Remove the spinner from the body
            document.body.removeChild(spinner);

            console.log('Stripe result:', result);
            if (result.error) {
                console.error('Stripe error:', result.error.message);
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            // Remove the spinner from the body
            document.body.removeChild(spinner);

            console.error('Error:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('#checkout-btn');
    buttons.forEach(function (button) {
        button.addEventListener('click', checkout);
    });
});
