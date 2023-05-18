const object = {
    "event": "VIEW_PAGE",
    "cookie_id": [
        "PHPSESSID=l5kkk7ube0lep121jd02onmir6",
        " s_PDPA=accept",
        " s_visitorId=69597fa3-43e2-4ebd-ac68-b1707055a78b",
        " wordpress_test_cookie=WP%20Cookie%20check",
        " tk_ai=woo%3AVf8UY8las43mo6pZ%2BTD1Zz2s",
        " wp_lang=en_US",
        " trx_addons_is_retina=0",
        " s_sessionId=77251095-cc51-4dc9-8017-10014d9a05da"
    ],
    "sb_type": "collection",
    "url": "https://sable.asia/",
    "time": 1684218763560,
    "title": "SABLE - Sales Automation & AI Marketing",
    "referrer": "",
    "screen": "1920x1080",
    "viewport": "709x860",
    "language": "en",
    "platform": "MacIntel",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    "device": "desktop",
    "devicePhone": "other",
    "browser": "Chrome",
    "browserVersion": "112.0.0.0",
    "os": "Mac",
    "osVersion": "10.15.7",
    "name": "",
    "type": "load",
    "element": {},
    "dataLayer": [],
    "brand_id": "634e5e2baa6ef1083f60d791",
    "visitorId": "69597fa3-43e2-4ebd-ac68-b1707055a78b",
    "sessionId": "77251095-cc51-4dc9-8017-10014d9a05da",
    "integrate_platform": "wordpress"
};

let key;
let iv;

async function generateKey() {
    key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
    iv = crypto.getRandomValues(new Uint8Array(12));
}

async function encryptData(data) {
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataString = encoder.encode(jsonString);

    try {
        const encryptedData = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            dataString
        );

        const encryptedArray = Array.from(new Uint8Array(encryptedData));
        const encryptedString = encryptedArray.map(byte => String.fromCharCode(byte)).join('');

        const base64String = btoa(encryptedString);
        console.log("🪲🎃 -->> file: script.js:67 -->> encryptData -->> base64String:", base64String)
        return base64String;
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในขณะเข้ารหัสข้อมูล:", error);
    }
}

async function decryptData(encryptedBase64String) {
    try {
        const encryptedArray = atob(encryptedBase64String)
            .split('')
            .map(char => char.charCodeAt(0));
        const encryptedData = new Uint8Array(encryptedArray);
        const decryptedData = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encryptedData
        );

        const decoder = new TextDecoder();
        const decryptedString = decoder.decode(decryptedData);

        const decryptedObject = JSON.parse(decryptedString);
        console.log("🪲🎃 -->> file: script.js:90 -->> decryptData -->> decryptedObject:", decryptedObject)
        return decryptedObject;
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในขณะถอดรหัสข้อมูล:", error);
    }
}

async function main() {
    await generateKey();
    const encData = await encryptData(object);
    const decData = await decryptData(encData);
}

main();