/**
 * IoTMakers Access Token 발급
 */
let accessToken = '';
const callAccessToken = () => {

};

/**
 * IoTMakers Open API 호출
 * @param method
 * @param url
 * @param data
 */
export function iotmakersAPI(method, url, data) {
    const PREFIX = 'https://iotmakers.kt.com';
    let req = new XMLHttpRequest();
    req.open(method, PREFIX+url, true);
    req.setRequestHeader('Accept', 'application/json, text/plain, */*');
    req.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    req.send(data);
};