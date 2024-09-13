document.addEventListener('DOMContentLoaded', () => {

    // ======================
    document.getElementById('openMasterPasswordSection').addEventListener('click', () => {
        document.getElementById('masterPassAuthSection').style.display = 'block';
        document.getElementById('pinAuthSection').style.display = 'none';
    })


    document.getElementById('openPinSection').addEventListener('click', () => {
        document.getElementById('pinAuthSection').style.display = 'block';
        document.getElementById('masterPassAuthSection').style.display = 'none';
    })


    // ======================
    document.getElementById('goToRowPasswordSection').addEventListener('click', () => {
        document.getElementById('rowPasswordSection').style.display = 'block';
        document.getElementById('dashboardSection').style.display = 'none';
    })
    
    document.getElementById('goToHashedPasswordSection').addEventListener('click', () => {
        document.getElementById('hashedPasswordSection').style.display = 'block';
        document.getElementById('dashboardSection').style.display = 'none';
    })

    document.getElementById('goToJwtGeneratorSection').addEventListener('click', () => {
        document.getElementById('jwtGeneratorSection').style.display = 'block';
        document.getElementById('dashboardSection').style.display = 'none';
    })

})