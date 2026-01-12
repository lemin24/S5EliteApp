async function checkAccess() {
    try {
        const { identifier } = await Capacitor.Plugins.Device.getId();
        const deviceId = identifier;
        
        const userKey = prompt("DEVICE ID: " + deviceId + "\n\nPlease enter your Access Key:");
        const expectedKey = deviceId + "JARED"; 
        
        if (userKey !== expectedKey) {
            alert("UNAUTHORIZED LOGIN!\n\nYour ID: " + deviceId + "\nSend this ID to the admin to get your key.");
            window.location.href = "https://www.facebook.com/jaredvxx";
            return;
        }
        start();
    } catch (e) {
        const key = prompt("SECURITY CHECK:\nEnter Master Access Key:");
        if(key !== "JARED-2026") {
            window.location.href = "https://www.facebook.com/jaredvxx";
        } else {
            start();
        }
    }
}

function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    
    if(!num || num.length < 10) {
        alert("ERROR: Invalid Number! Use 10 digits (9xxxxxxxxx).");
        return;
    }
    
    alert("ATTACK INITIALIZED\n\nTarget: " + num + "\nAmount: " + amount + "\nStatus: Processing...");
}
