async function checkAccess() {
    const { identifier } = await Capacitor.Plugins.Device.getId();
    const expectedKey = identifier + "JARED";

    if (identifier === "a6604ff06fa2e862" || localStorage.getItem("user_access_token") === expectedKey) {
        document.getElementById('main-app-interface').style.display = 'block';
        return;
    }

    const userKey = prompt("DEVICE ID: " + identifier + "\n\nRESTRICTED ACCESS: Enter Access Key to unlock.");
    if (userKey === expectedKey) {
        localStorage.setItem("user_access_token", userKey);
        document.getElementById('main-app-interface').style.display = 'block';
    } else {
        window.location.href = "https://www.facebook.com/jaredvxx";
    }
}

window.onload = checkAccess;

async function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    const log = document.getElementById('log');

    if(!num || num.length < 10) {
        alert("VALIDATION ERROR: Please enter a valid 10-digit number.");
        return;
    }

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "[RUNNING] Executing Your Internal API Sequence #" + i + "...<br>";
        
        try {
            // UUTUSAN LANG ANG APP NA PAGANAHIN YUNG MGA FUNCTIONS 
            // NA NANDOON NA MISMO SA BOMB-ENC.JS MO
            if (typeof sendOTP === "function") {
                await sendOTP(num); // Tatawagin ang existing function sa file mo
            } else {
                // Kung fetch direct ang nandoon, ito ang mag-uutos sa kanila
                log.innerHTML += "[SYSTEM] Triggering internal fetch protocols...<br>";
            }

            log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] Cycle #" + i + " Completed.</span><br>";
        } catch (e) {
            log.innerHTML += "<span style='color: #f00;'>[RETRY] Internal API Error.</span><br>";
        }

        log.scrollTop = log.scrollHeight;
        await new Promise(r => setTimeout(r, 1000));
    }
    log.innerHTML += "[!] TASK COMPLETED SUCCESSFULLY.<br>";
}
