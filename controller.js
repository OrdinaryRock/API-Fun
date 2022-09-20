console.log('Hello!');


const API_URL = "https://accounts.spotify.com/";
const TIMEOUT_SEC = 10;

let clientID = "e71189e425f941bd86b74815c5f4dd06";
let clientSecret = "secretKeyHere";
let redirectURI = "http://localhost:5500/index.html";
let scopes = "playlist-read-private";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData
            ? fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadData),
            })
            : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};


async function authorizeUser() {
    try {
        let data = await AJAX("https://accounts.spotify.com/authorize/?" +
            "response_type=code" + "&" +
            "client_id=" + clientID + "&" +
            "scope=" + scopes + "&" +
            "redirect_uri=" + redirectURI + "&" +
            "state=1234567891234567"
        );
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

authorizeUser();