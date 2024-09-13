document.addEventListener('DOMContentLoaded', function () {
    const masterPassInput = document.getElementById("masterPassInput");

    masterPassInput.addEventListener('input', function () {
        this.value = this.value.replace(/\s/g, '');  // Remove all spaces
    });

    masterPassInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            submitMasterPassForAuth();
        }
    });


    // Secret key for encryption (you can generate this securely)
    const secretKey = 'ASPSKFETD@20';  // This should be stored securely in a real-world scenario

    // Function to encrypt data using AES
    function encryptData(data) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    // Function to decrypt data using AES
    function decryptData(cipherText) {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }


    function submitMasterPassForAuth() {
        const masterPassInput = document.getElementById("masterPassInput").value.trim(); // Get and trim input value

        // Retrieve the stored password from Chrome storage
        chrome.storage.local.get(['password'], function (result) {
            if (result.password) {
                // Decrypt the stored password for comparison
                const decryptedPassword = decryptData(result.password);

                // Compare the password
                if (masterPassInput === decryptedPassword) {
                    document.getElementById('masterPassAuthSection').style.display = 'none';
                    document.getElementById('dashboardSection').style.display = 'block';
                } else {
                    alert('Password did not match.');
                    document.getElementById("masterPassInput").focus();
                }
            } else {
                console.log('No account details found!');
            }
        });
    }

    // Attach click event to the button
    document.getElementById('submitMasterPassForAuth').addEventListener('click', submitMasterPassForAuth);
});