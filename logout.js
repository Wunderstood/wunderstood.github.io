document.getElementById('logoutButton').addEventListener('click', function() {
    // Deleting cookies
    document.cookie = 'uuid=; Max-Age=0; path=/; domain=wunderstood.com';
    document.cookie = 'pro=; Max-Age=0; path=/; domain=wunderstood.com';
    document.cookie = 'reportBalance=; Max-Age=0; path=/; domain=wunderstood.com';
    document.cookie = 'summaryBalance=; Max-Age=0; path=/; domain=wunderstood.com';
    document.cookie = 'sessionId=; Max-Age=0; path=/; domain=wunderstood.com';

    // Redirecting to wunderstood.com home page
    window.location.href = "https://wunderstood.com";
});
