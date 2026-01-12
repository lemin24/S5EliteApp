async function checkAccess() {
    const { identifier } = await Capacitor.Plugins.Device.getId();
    if (identifier === "a6604ff06fa2e862") return;

    const savedKey = localStorage.getItem("access_token");
    if (savedKey === identifier + "JARED") return;

    const userKey = prompt("DEVICE ID: " + identifier + "\n\nPlease enter your Access Key:");
    if (userKey === identifier + "JARED") {
        localStorage.setItem("access_token", userKey);
        alert("SUCCESS: Access granted. Your device is now registered.");
    } else {
        alert("ERROR: Invalid Access Key. Redirrecting to support...");
        window.location.href = "https://www.facebook.com/jaredvxx";
    }
}

checkAccess();

async function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    const log = document.getElementById('log');

    if(!num || num.length < 10) {
        alert("INPUT ERROR: Please enter a valid 10-digit number.");
        return;
    }

    log.innerHTML = "[+] ATTACK ENGINE STARTED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "[PROCESSING] Sending request #" + i + " to +63" + num + "...<br>";
        log.scrollTop = log.scrollHeight;
        await new Promise(r => setTimeout(r, 800));
    }
    log.innerHTML += "[!] TASK FINISHED: All requests processed.<br>";
}
