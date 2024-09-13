document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['userName'], function (result) {
        if (result.userName) {


            document.getElementById('accountSetup').style.display = 'none';
            document.getElementById('pinAuthSection').style.display = 'block';
            document.getElementById('dashboardSection').style.display = 'none';


        } else {

            document.getElementById('accountSetup').style.display = 'block';
            document.getElementById('pinAuthSection').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'none';


            // Remove spaces from input fields in real-time
            function preventSpaces(inputId) {
                const inputElement = document.getElementById(inputId);

                inputElement.addEventListener('input', function () {
                    this.value = this.value.replace(/\s/g, '');  // Remove all spaces
                });
            }

            // Ensure only numbers are allowed in the PIN field
            function allowOnlyNumbers(inputId) {
                const inputElement = document.getElementById(inputId);

                inputElement.addEventListener('input', function () {
                    this.value = this.value.replace(/[^0-9]/g, '');  // Remove non-numeric characters
                });
            }

            // Call this function for each input field where you want to prevent spaces
            preventSpaces('initialUserName');
            preventSpaces('masterPassword');
            preventSpaces('initialAccountPin');

            // Call this function to ensure only numbers in PIN field
            allowOnlyNumbers('initialAccountPin');





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

            // Validate input fields
            function validateInputs(userName, password, pin) {
                // Check if fields are not empty
                if (!userName || !password || !pin) {
                    alert("All fields are required.");
                    return false;
                }

                // Check if any field contains spaces
                if (/\s/.test(userName) || /\s/.test(password) || /\s/.test(pin)) {
                    alert("Fields cannot contain spaces.");
                    return false;
                }

                // Check if pin contains only numbers
                if (!/^\d{5}$/.test(pin)) {
                    alert("PIN must be a 5-digit number.");
                    return false;
                }

                return true;
            }

            // Store encrypted data in Chrome storage
            function saveAccountDetails() {
                const userName = document.getElementById('initialUserName').value.trim();
                const password = document.getElementById('masterPassword').value.trim();
                const pin = document.getElementById('initialAccountPin').value.trim();

                // Validate input
                if (!validateInputs(userName, password, pin)) {
                    return;
                }

                // Encrypt the values
                const encryptedUserName = encryptData(userName);
                const encryptedPassword = encryptData(password);
                const encryptedPin = encryptData(pin);

                console.log("encryptedUserName: " + encryptedUserName);
                console.log("encryptedPassword: " + encryptedPassword);
                console.log("encryptedPin: " + encryptedPin);

                // Store encrypted data in Chrome storage
                chrome.storage.local.set({
                    'userName': encryptedUserName,
                    'password': encryptedPassword,
                    'pin': encryptedPin
                }, function () {
                    console.log('Account details saved successfully!');

                    document.getElementById('accountSetup').style.display = 'none';
                    document.getElementById('pinAuthSection').style.display = 'none';
                    document.getElementById('dashboardSection').style.display = 'block';

                });
            }



            // Event listener for the "Start Using" button
            document.getElementById('saveAccountDetailsInitial').addEventListener('click', function () {
                saveAccountDetails();
            });



        }
    });
});

