function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function generateMailtoLink(uuid) {
    let email = "support@wunderstood.com";
    let subject = encodeURIComponent(uuid + " Account Deletion Requested");
    let emailBody = "Please delete my account. My UUID is: " + uuid;
    let mailtoLink = `mailto:${email}?subject=${subject}&body=${emailBody}`;
    return mailtoLink;
}

window.onload = function() {
    let deleteAccountButton = document.getElementById('deleteAccount');
    deleteAccountButton.onclick = function() {
        let uuid = getCookie('uuid');
        let mailtoLink = generateMailtoLink(uuid);
        window.location.href = mailtoLink;
    }
}