/**
 * Access Token
 * @type {string}
 */
let accessToken = 'Basic TWpaaVpXTXhPR05pTmpnME5HVTJaV0psWXpZeFltVmhOVFpsT1dJeFpERXhORE15TWpBMk9UZzRPVFUwOll6STROVGt4T1dReE5qZG1ORGsxWXpneU5UZzRPV0ZpWlRCaVlUY3hNR1F4TkRNeU1qQTJPVGc0T1RVMA==';

/**
 * IoTMakers Access Token 발급
 * @param id
 * @param password
 * @returns {Promise<any>}
 */
export function getAccessToken(id, password) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://iotmakers.kt.com/oauth/token');
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        xhr.setRequestHeader('Authorization', accessToken);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = JSON.parse(xhr.response);
                accessToken = response.access_token;
                resolve(response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(`grant_type=password&username=${id}&password=${password}`);
    });
};

/**
 * AR 바코드가 매핑된 디바이스 조회
 * @param pSvcTgtSeq
 * @returns {Promise<any>}
 */
export function getARDevices(pSvcTgtSeq) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://iotmakers.kt.com/masterapi/v1.1/arCodes?offset=1&limit=5&targetSequence=${pSvcTgtSeq}&deviceSequence=`);
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

/**
 * IoTMakers Open API 호출
 * @param method
 * @param url
 * @param data
 * @param callback
 */
export function callIoTMakersApi(method, url, data, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.response)); //response
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.open(method, `https://iotmakers.kt.com/api/${url}`, true);
    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.send(data);
};