window.onload = function() {
    document.getElementById('logoutButton').addEventListener('click', function() {
        console.log("Logout button clicked");  // Debugging line
        // Deleting cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        // Redirecting to wunderstood.com home page
        window.location.href = "https://auth.wunderstood.com/logout";
    });
}