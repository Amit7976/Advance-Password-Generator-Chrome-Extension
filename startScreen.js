document.addEventListener('DOMContentLoaded', function () {

    // Function to get the 'getStarted' value
    function getStartedGet(callback) {
        chrome.storage.local.get(['getStarted'], function (result) {
            console.log('Get Started flag retrieved: ' + result.getStarted);
            callback(result.getStarted); // Pass the result to the callback
        });
    }

    // Check the value of 'getStarted' asynchronously
    getStartedGet(function (getStarted) {
        if (getStarted == null || getStarted == undefined || getStarted == false) {
            document.getElementById('startingScreen').style.display = 'block';
            document.getElementById('accountSetup').style.display = 'none';
        } else {
            document.getElementById('startingScreen').style.display = 'none';
        }
    });

    // Function to set the 'getStarted' flag to true
    function getStartedSet() {
        chrome.storage.local.set({ 'getStarted': true }, function () {
            console.log('First Visit is Complete');
        });
    }

    // Add event listener to button click
    document.getElementById("getStartedSet").addEventListener('click', () => {
        getStartedSet()

        document.getElementById('startingScreen').style.display = 'none';
        document.getElementById('accountSetup').style.display = 'block';
    });

});