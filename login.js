// login.js
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".u-form-1");
  
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const formData = new FormData(loginForm);
      const email = formData.get("username");
      const password = formData.get("password");
  
      try {
        const response = await fetch('YOUR_FIREBASE_CLOUD_FUNCTION_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });
  
        if (response.ok) {
          const data = await response.json();
          // Handle successful login, e.g., redirect to a new page
          window.location.href = "path-to-your-dashboard-page.html";
        } else {
          // Handle login error, e.g., show an error message
          console.error("Login failed:", data.error.message);
        }
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    });
  });
  