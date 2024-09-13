// Utility function to handle different hash methods
async function hashPassword(password, method) {
    switch (method) {
        case 'md5':
            return CryptoJS.MD5(password).toString();
        case 'sha256':
            return CryptoJS.SHA256(password).toString();
        case 'sha512':
            return CryptoJS.SHA512(password).toString();
        case 'sha1':
            return CryptoJS.SHA1(password).toString();
        case 'sha3-256':
            return CryptoJS.SHA3(password, { outputLength: 256 }).toString();
        case 'sha3-512':
            return CryptoJS.SHA3(password, { outputLength: 512 }).toString();
        case 'hmac-sha256':
            return CryptoJS.HmacSHA256(password, 'ASP20').toString();
        case 'hmac-sha512':
            return CryptoJS.HmacSHA512(password, 'ASP20').toString();
        case 'sha224':
            return CryptoJS.SHA224(password).toString();
        case 'sha384':
            return CryptoJS.SHA384(password).toString();
        case 'ripemd160':
            return CryptoJS.RIPEMD160(password).toString();
        case 'hmac-md5':
            return CryptoJS.HmacMD5(password, 'ASP20').toString();
        case 'hmac-sha1':
            return CryptoJS.HmacSHA1(password, 'ASP20').toString();
        case 'hmac-sha224':
            return CryptoJS.HmacSHA224(password, 'ASP20').toString();
        case 'hmac-sha384':
            return CryptoJS.HmacSHA384(password, 'ASP20').toString();
        case 'sha3-224':
            return CryptoJS.SHA3(password, { outputLength: 224 }).toString();
        case 'sha3-384':
            return CryptoJS.SHA3(password, { outputLength: 384 }).toString();
        case 'hmac-sha3':
            return CryptoJS.HmacSHA3(password, 'ASP20').toString();
        case 'hmac-ripemd160':
            return CryptoJS.HmacRIPEMD160(password, 'ASP20').toString();
        case 'pbkdf2':
            return CryptoJS.PBKDF2(password, 'ASP20', { keySize: 512 / 32 }).toString();
        case 'aes':
            return CryptoJS.AES.encrypt(password, 'ASP20').toString();
        case 'des':
            return CryptoJS.DES.encrypt(password, 'ASP20').toString();
        case 'tripledes':
            return CryptoJS.TripleDES.encrypt(password, 'ASP20').toString();
        case 'rabbit':
            return CryptoJS.Rabbit.encrypt(password, 'ASP20').toString();
        case 'rc4':
            return CryptoJS.RC4.encrypt(password, 'ASP20').toString();
        case 'rc4drop':
            return CryptoJS.RC4Drop.encrypt(password, 'ASP20').toString();
        default:
            return 'Invalid hash method';
    }
}

// Handle Generate Hashed Password button click
document.getElementById('generateHashedPassword').addEventListener('click', async () => {
    const password = document.getElementById('password').value;
    const method = document.getElementById('hash-method').value;

    if (password.length > 1) {
        try {
            const hashedPassword = await hashPassword(password, method);
            document.getElementById('hashedPasswordDisplay').textContent = hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
        }
    } else {
        alert('Please enter a valid password.');
    }
});

// Handle Copy button click
document.getElementById('copyHashedPassword').addEventListener('click', () => {
    const text = document.getElementById('hashedPasswordDisplay').textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Hashed password copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text:', err);
    });
});










///////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backFromHashedPasswordSection').addEventListener('click', () => {
        document.getElementById('hashedPasswordSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
    })
})
