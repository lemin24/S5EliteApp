async function checkAccess() {
    try {
        // Ito ang kukuha ng unique ID ng phone
        const { identifier } = await Capacitor.Plugins.Device.getId();
        const deviceId = identifier;
        
        const userKey = prompt("DEVICE ID: " + deviceId + "\n\nContact admin for Access Key:");
        
        // Formula: ID + JARED (Halimbawa: A1B2JARED)
        const expectedKey = deviceId + "JARED"; 
        
        if (userKey !== expectedKey) {
            alert("UNAUTHORIZED DEVICE!\n\nYour ID: " + deviceId + "\nSend this to the admin.");
            window.location.href = "https://www.facebook.com/jaredvxx";
            return;
        }
        start();
    } catch (e) {
        // Fallback kung hindi ma-load ang plugin sa browser/preview
        const key = prompt("ENTER MASTER KEY:");
        if(key !== "JARED-2026") {
            window.location.href = "https://www.facebook.com/jaredvxx";
        } else {
            start();
        }
    }
}

function start() {
    alert("ACCESS GRANTED! Welcome to JARED SMSBOMB.");
}
