document.addEventListener('DOMContentLoaded', function () {

    // Move to the next input field automatically
    function moveToNext(currentInput, nextInputId) {
        if (currentInput.value.length >= 1 && nextInputId) {
            document.getElementById(nextInputId).focus();
        }
    }



    // Move to the previous input field
    function moveToPrevious(currentInput, previousInputId) {
        if (currentInput.value.length === 0 && previousInputId) {
            document.getElementById(previousInputId).focus();
        }
    }



    // Handle pasting 5 digits directly into the PIN fields
    function handlePaste(event) {
        const paste = (event.clipboardData || window.clipboardData).getData('text');
        const pinInputs = document.querySelectorAll('#pinInputs input');
        if (paste.length === 5 && /^\d+$/.test(paste)) {
            pinInputs.forEach((input, index) => {
                input.value = paste[index];
            });
        }
        event.preventDefault();
    }


    // Validate the PIN inputs to allow only numbers
    document.querySelectorAll('#pinInputs input').forEach((input, index) => {
        const nextInputId = index < 4 ? `pin${index + 2}` : null;
        const previousInputId = index > 0 ? `pin${index}` : null;

        // Handle input to move focus
        input.addEventListener('input', function () {
            this.value = this.value.replace(/\D/, '');  // Allow only numbers
            moveToNext(this, nextInputId);
        });

        // Handle backspace to move focus to previous field
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace') {
                moveToPrevious(this, previousInputId);
            }
        });



        // Handle backspace to move focus to previous field
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                submitDetails()
            }
        });

        // Handle paste event
        input.addEventListener('paste', handlePaste);
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

    function submitDetails() {
        const pinInputs = document.querySelectorAll('#pinInputs input');
        let pin = '';
        let firstEmptyInput = null;

        // Build the PIN and find the first empty input field
        pinInputs.forEach((input, index) => {
            if (input.value === '' && firstEmptyInput === null) {
                firstEmptyInput = input;
            }
            pin += input.value;
        });

        if (pin.length !== 5) {
            // Focus on the first empty input field
            if (firstEmptyInput) {
                firstEmptyInput.focus();
            } else {
                // Optional: if all inputs are filled but still length is incorrect
                alert('Please make sure all fields are correctly filled.');
            }
            return;
        }

        // Retrieve the stored PIN from Chrome storage
        chrome.storage.local.get(['pin'], function (result) {
            if (result.pin) {
                // Decrypt the stored PIN for comparison
                const decryptedPin = decryptData(result.pin);

                // Compare the PIN
                if (pin === decryptedPin) {

                    document.getElementById('pinAuthSection').style.display = 'none';
                    document.getElementById('dashboardSection').style.display = 'block';

                } else {
                    alert('PIN did not match.');
                    document.querySelectorAll("#pinInputs input")[4].focus();
                }
            } else {
                console.log('No account details found!');
            }
        });
    }




    // Submit the PIN, encrypt it, and match with hashed value in database
    document.getElementById('submitPin').addEventListener('click', submitDetails);

});