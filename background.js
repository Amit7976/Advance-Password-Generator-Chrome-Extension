// Function to open the database
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("MyDatabase", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("MyObjectStore")) {
                db.createObjectStore("MyObjectStore");
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Function to set an item in the database
async function setItem(key, value) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["MyObjectStore"], "readwrite");
        const objectStore = transaction.objectStore("MyObjectStore");
        const request = objectStore.put(value, key);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Function to get an item from the database
async function getItem(key) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["MyObjectStore"], "readonly");
        const objectStore = transaction.objectStore("MyObjectStore");
        const request = objectStore.get(key);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Example usage
chrome.runtime.onInstalled.addListener(() => {
    // Initialize your IndexedDB here
    openDatabase().then(db => {
        console.log("Database initialized");
    }).catch(error => {
        console.error("Error initializing database:", error);
    });

    // Setting an item
    setItem("username", "JohnDoe").then(() => {
        console.log("Item added with key 'username'");
    }).catch(error => {
        console.error("Error adding item:", error);
    });

    // Getting an item
    getItem("username").then(item => {
        console.log("Item retrieved:", item);
    }).catch(error => {
        console.error("Error retrieving item:", error);
    });
});





chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setItem') {
        setItem(message.key, message.value).then(() => {
            sendResponse('Item set successfully');
        }).catch(error => {
            sendResponse('Error setting item: ' + error);
        });
    } else if (message.action === 'getItem') {
        getItem(message.key).then(item => {
            sendResponse(item);
        }).catch(error => {
            sendResponse('Error retrieving item: ' + error);
        });
    }
    return true; // Keep the message channel open for sendResponse
});
