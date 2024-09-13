document.addEventListener('DOMContentLoaded', function () {
    // Function to generate a random password based on filters
    function generatePassword() {
        const length = parseInt(document.querySelector('.customizeLengthFilter input[type="number"]').value) || 12;
        const includeLowerCase = document.getElementById('01').checked;
        const includeUpperCase = document.getElementById('02').checked;
        const includeDigits = document.getElementById('03').checked;
        const includeSpecialChars = document.getElementById('04').checked;

        let numDigits = parseInt(document.querySelector('.customizeLengthFilter input[value="4"]').value) || 0;
        let numSpecialChars = parseInt(document.querySelector('.customizeLengthFilter input[value="3"]').value) || 0;

        // Ensure numDigits and numSpecialChars are less than password length - 2
        if (numDigits + numSpecialChars > length - 2) {
            numDigits = Math.min(numDigits, length - 2);
            numSpecialChars = Math.min(numSpecialChars, length - numDigits - 2);
        }

        // Adjust max values for digits and special characters inputs
        document.querySelector('.customizeLengthFilter input[value="4"]').max = length - 4;
        document.querySelector('.customizeLengthFilter input[value="3"]').max = length - 4;

        // Characters pools
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digitChars = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

        let allChars = '';
        let password = '';

        // Add random digits
        if (includeDigits && numDigits > 0) {
            for (let i = 0; i < numDigits; i++) {
                password += digitChars[Math.floor(Math.random() * digitChars.length)];
            }
        }

        // Add random special characters
        if (includeSpecialChars && numSpecialChars > 0) {
            for (let i = 0; i < numSpecialChars; i++) {
                password += specialChars[Math.floor(Math.random() * specialChars.length)];
            }
        }

        // Add remaining characters from lowercase or uppercase
        if (includeLowerCase) allChars += lowerCaseChars;
        if (includeUpperCase) allChars += upperCaseChars;

        const remainingLength = length - password.length;
        for (let i = 0; i < remainingLength; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Shuffle the generated password to randomize character positions
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        // Update the password field
        document.getElementById('rowGeneratedPassword').textContent = password;

        // Check password strength
        checkPasswordStrength(password);
    }

    // Function to copy the generated password
    document.querySelector('.passwordGenerateDiv svg').addEventListener('click', () => {
        const password = document.getElementById('rowGeneratedPassword').textContent;
        navigator.clipboard.writeText(password).then(() => alert('Password copied to clipboard!'));
    });

    // Function to handle enabling/disabling number/special character inputs
    function toggleInputDisabling() {
        const digitsCheckbox = document.getElementById('03');
        const specialCharsCheckbox = document.getElementById('04');

        const digitsInput = document.querySelector('.customizeLengthFilter input[value="4"]');
        const specialCharsInput = document.querySelector('.customizeLengthFilter input[value="3"]');

        digitsInput.disabled = !digitsCheckbox.checked;
        specialCharsInput.disabled = !specialCharsCheckbox.checked;
    }

    // Attach event listeners to checkboxes
    document.getElementById('03').addEventListener('change', toggleInputDisabling);
    document.getElementById('04').addEventListener('change', toggleInputDisabling);

    // Call toggleInputDisabling on load to set the initial state
    toggleInputDisabling();
    // Function to calculate password strength
    // Function to calculate password strength
    function checkPasswordStrength(password) {
        const strengthSpanElements = document.querySelectorAll('.passwordGenerateDiv div span');
        const strengthText = document.querySelector('.passwordGenerateDiv p#rowGeneratedPasswordStrength');

        let strength = 2; // Default strength is Medium

        // Check password strength based on the defined conditions
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[\W_]/.test(password);

        if (hasLower && hasUpper) {
            strength = Math.max(strength, 3); // Weak
        }
        if (hasLower && hasUpper && hasNumber) {
            strength = Math.max(strength, 4); // Medium
        }
        if (hasLower && hasUpper && hasSpecialChar) {
            strength = Math.max(strength, 4); // Medium
        }
        if (hasLower && hasUpper && hasNumber && hasSpecialChar) {
            strength = Math.max(strength, 5); // Strong
        }

        // Set span background color based on strength
        strengthSpanElements.forEach((span, index) => {
            span.style.backgroundColor = index < strength ? '#27beec' : '#c0c0c0'; // Adjusted index to match strength
        });

        // Update the strength text
        strengthText.textContent = ['Weak', 'Medium', 'Strong'][strength - 3] || 'Medium'; // Adjusted index to match strength
    }


    // Reset filters to default values
    document.querySelector('.filterAndResetDiv p:last-child').addEventListener('click', () => {
        document.getElementById('01').checked = true;
        document.getElementById('02').checked = true;
        document.getElementById('03').checked = true;
        document.getElementById('04').checked = true;
        document.querySelector('.customizeLengthFilter input[value="4"]').value = 4;
        document.querySelector('.customizeLengthFilter input[value="3"]').value = 3;
        document.querySelector('.customizeLengthFilter input[type="number"]').value = 12;
        toggleInputDisabling();
    });

    // Attach generate button click handler
    document.querySelector('.passwordGenerateDiv button').addEventListener('click', generatePassword);


});









///////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backFromRowPasswordSection').addEventListener('click', () => {
        document.getElementById('rowPasswordSection').style.display = 'none';
        document.getElementById('dashboardSection').style.display = 'block';
    })
})