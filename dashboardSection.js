// Secret key for encryption (you can generate this securely)
const secretKey = 'ASPSKFETD@20';  // This should be stored securely in a real-world scenario


document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['userName'], function (result) {
        if (result.userName) {
            // Decrypt the values
            const decryptedUserName = decryptData(result.userName);

            console.log('UnDecrypted User Name: ', result.userName);

            console.log('Decrypted User Name: ', decryptedUserName);


            document.getElementById("dashboardSectionUserName").innerHTML = decryptedUserName;

        } else {
            console.log('No account details found!');
        }
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {


    // Get modal elements
    const modal = document.getElementById('addPasswordModal');
    const openModalButton = document.getElementById('addPassForPassManager');
    const closeModalButton = document.querySelector('.close');

    // Function to open the modal
    openModalButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    // Function to close the modal
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when the user clicks outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to hash data using CryptoJS
    function hashPassword(password) {
        return CryptoJS.AES.encrypt(password, secretKey).toString();
    }

    // Save the password and title
    document.getElementById('savePassword').addEventListener('click', function () {
        const title = document.getElementById('titleInput').value.trim();
        const password = document.getElementById('passwordInput').value.trim();

        if (!title || !password) {
            alert('Please fill in both title and password.');
            return;
        }

        // Hash the password
        const hashedPassword = hashPassword(password);

        // Store the title and hashed password in an object
        const newEntry = { title, password: hashedPassword };

        // Retrieve the existing passwords array from localStorage
        chrome.storage.local.get(['passwordsArray'], function (result) {
            let passwordsArray = result.passwordsArray || [];

            // Add the new entry to the array
            passwordsArray.push(newEntry);

            // Store the updated array in localStorage
            chrome.storage.local.set({ passwordsArray: passwordsArray }, function () {
                alert('Password saved successfully!');


                getAllPasswordFromDatabase();


                // Clear the input fields
                document.getElementById('titleInput').value = '';
                document.getElementById('passwordInput').value = '';

                // Close the modal after saving
                modal.style.display = 'none';
            });
        });
    });







    // Retrieve and display the saved passwords
    // Decrypt function using AES
    function decryptData(encryptedData) {
        const secretKey = 'ASPSKFETD@20'; // Your secret key
        const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey);
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    // Function to copy decrypted password to clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Password copied to clipboard!');
    }




    function getAllPasswordFromDatabase() {
        chrome.storage.local.get(['passwordsArray'], function (result) {
            const savedPasswordsDiv = document.getElementById('passwordManager');
            savedPasswordsDiv.innerHTML = '';  // Clear previous entries

            if (result.passwordsArray && result.passwordsArray.length > 0) {
                const reversedArray = result.passwordsArray.reverse();

                // Save reversedArray in a global variable for use in search
                window.passwordsArray = reversedArray;

                // Call function to display passwords
                displayPasswords(reversedArray);
            } else {
                savedPasswordsDiv.textContent = 'No passwords saved.';
            }
        });
    }

    // Function to display passwords
    function displayPasswords(passwords) {
        const savedPasswordsDiv = document.getElementById('passwordManager');
        savedPasswordsDiv.innerHTML = '';  // Clear previous entries

        passwords.forEach((entry, index) => {
            // Create a new div for each password entry
            const entryDiv = document.createElement('div');
            entryDiv.innerHTML = `
            <div>
                <p class="platformName">${entry.title}</p>
                <p class="samplePass"> ********** </p> <!-- Hide password -->
            </div>
            <div class="actions">
                <svg xmlns="http://www.w3.org/2000/svg" class="edit-btn" data-index="${index}" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 21h16M5.666 13.187A2.278 2.278 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.278 2.278 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001l-9.507 9.52Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="delete-btn" data-index="${index}" viewBox="0 0 72 72"><path fill="#FFF" d="M51.76 17H20.153v37.65c0 4.06 3.29 5.62 7.35 5.62H44.41c4.06 0 7.35-1.56 7.35-5.62V17zM31 16v-4h10v4"/><path fill="#9b9b9a" d="M51 37v20.621L48.3 60H33z"/><path fill="#FFF" d="M17 16h38v4H17z"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M31 16v-4h10v4m10 9v31a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4V25m-4-9h38v4H17zm24 12.25V55M31 28.25V55"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="copy-svg" data-password="${entry.password}">
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </g>
                </svg>
            </div>
        `;

            // Append each entry to the passwordManager div
            savedPasswordsDiv.appendChild(entryDiv);
        });

        // Handle actions like copy, edit, and delete
        handleActions(passwords);
    }

    // Function to handle copy, edit, and delete
    function handleActions(passwords) {
        // Handle copy functionality
        document.querySelectorAll('.copy-svg').forEach(svg => {
            svg.addEventListener('click', function () {
                const encryptedPassword = svg.getAttribute('data-password');
                const decryptedPassword = decryptData(encryptedPassword); // Decrypt password
                copyToClipboard(decryptedPassword); // Copy decrypted password
            });
        });

        // Handle edit functionality
        document.querySelectorAll('.edit-btn').forEach(editBtn => {
            editBtn.addEventListener('click', function () {
                const index = editBtn.getAttribute('data-index');
                openEditModal(passwords[index], index); // Open modal with the selected password entry
            });
        });

        // Handle delete
        document.querySelectorAll('.delete-btn').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function () {
                const index = deleteBtn.getAttribute('data-index');
                deletePassword(index); // Call function to delete the password
            });
        });
    }

    // Search functionality

    function searchPasswords() {
        const passwordSearchInput = document.getElementById('passwordSearchInput').value.toLowerCase();
        const filteredPasswords = window.passwordsArray.filter(entry => entry.title.toLowerCase().includes(passwordSearchInput));

        // If search input is empty, display all passwords, else display the filtered ones
        if (passwordSearchInput === '') {
            displayPasswords(window.passwordsArray);
        } else {
            displayPasswords(filteredPasswords);
        }
    }
    document.getElementById("passwordSearchInput").addEventListener('keyup', searchPasswords)

    // Load passwords when the page loads
    getAllPasswordFromDatabase();

    // Function to open the edit modal
    function openEditModal(entry, index) {
        const modal = document.getElementById('editPasswordModal');
        const editTitle = document.getElementById('editTitle');
        const editPassword = document.getElementById('editPassword');

        // Pre-fill with the current title and decrypted password
        editTitle.value = entry.title;
        editPassword.value = decryptData(entry.password);

        modal.style.display = 'block'; // Show the modal

        // Handle save changes
        document.getElementById('saveChangesBtn').onclick = function () {
            // alert("----------------------------------------------------------------");

            const updatedTitle = editTitle.value;
            const updatedPassword = encryptData(editPassword.value); // Encrypt updated password

            updatePassword(index, updatedTitle, updatedPassword); // Update the password entry
            // alert("hiiiiiiiiiiiiiiii");

            // modal.style.display = 'none'; // Hide the modal after saving
        };

        // Handle cancel edit
        document.getElementById('cancelEditBtn').onclick = function () {
            modal.style.display = 'none'; // Hide the modal
        };
    }

    // Function to update the password entry
    function updatePassword(index, updatedTitle, updatedPassword) {
        // alert("byyyyyyyyyyyyyyyyy");

        chrome.storage.local.get(['passwordsArray'], function (result) {


            let reversedArray = result.passwordsArray.reverse();
            // alert(reversedArray[index].password);

            reversedArray[index].title = updatedTitle;
            reversedArray[index].password = updatedPassword;

            let passwordsArray = reversedArray.reverse();

            chrome.storage.local.set({ passwordsArray }, function () {
                alert('Password updated successfully!');
                location.reload(); // Reload the page to reflect the changes
            });
        });
    }

    // Function to delete a password entry
    function deletePassword(index) {
        chrome.storage.local.get(['passwordsArray'], function (result) {
            let passwordsArray = result.passwordsArray || [];

            // Remove the entry at the specified index
            passwordsArray.splice(index, 1);

            chrome.storage.local.set({ passwordsArray }, function () {
                alert('Password deleted successfully!');
                location.reload(); // Reload the page to reflect the changes
            });
        });
    }
});