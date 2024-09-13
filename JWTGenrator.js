// jwtGenerator.js
document.getElementById('jwtForm').addEventListener('submit', generateJWT);
document.getElementById('copyJwtButton').addEventListener('click', copyJWT);

function base64url(source) {
    // Encode to Base64URL (remove padding, replace + with -, / with _)
    let encodedSource = btoa(JSON.stringify(source));
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}

function generateJWT(event) {
    event.preventDefault();

    const header = JSON.parse(document.getElementById('header').value);
    const payload = JSON.parse(document.getElementById('payload').value);
    const secret = document.getElementById('secret').value;

    if (!secret) {
        alert("Secret key is required to generate a JWT");
        return;
    }

    const encodedHeader = base64url(header);
    const encodedPayload = base64url(payload);
    const signature = generateSignature(`${encodedHeader}.${encodedPayload}`, secret);

    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
    document.getElementById('jwtToken').innerHTML = jwt;
}

function generateSignature(data, secret) {
    // HMAC SHA256 signing using secret
    const hash = CryptoJS.HmacSHA256(data, secret);
    const base64Hash = CryptoJS.enc.Base64.stringify(hash);

    return base64Hash.replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function copyJWT() {
    const jwtTokenElement = document.getElementById('jwtToken');
    jwtTokenElement.select();
    document.execCommand('copy');
    alert('JWT copied to clipboard');
}





///////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backFromJwtGeneratorSection').addEventListener('click', () => {
        document.getElementById('jwtGeneratorSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
    })
})