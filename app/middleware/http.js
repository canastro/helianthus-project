'use strict';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

function buildHeaders(h, isLoggedIn, userToken) {

    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (isLoggedIn) {
        headers.Authorization = 'Bearer ' + userToken;
    }

    headers = Object.assign({}, headers, h);

    return headers;
}

class RequestOptions {

    constructor (requestOptionsArgs) {

        const {method, headers, body, isLoggedIn, userToken} = requestOptionsArgs || {};

        if (!method || methods.indexOf(method) === -1) {
            throw new Error('HTTP: method not found');
        }

        this.method = method;
        this.headers = buildHeaders(headers, isLoggedIn, userToken);

        if (body) {
            this.body = body.toString().indexOf('FormData') === -1 ? JSON.stringify(body) : body;
        }
    }

}

export class HttpClass {

    request (url, requestOptions) {

        if (!url) {
            throw new Error('HTTP: missing URL parameter');
        }

        requestOptions = requestOptions || {};
        requestOptions.userToken = localStorage.getItem('token');
        requestOptions.isLoggedIn = !!requestOptions.userToken;

        const options = new RequestOptions(requestOptions);

        return window.fetch(url, options)
            .then((res) => {

                if (res.status >= 500 && res.status <= 599) {
                    return {
                        status: res.status,
                        error: res.statusText
                    };
                }

                if (res.status === 401) {
                    return {
                        status: res.status,
                        error: res.json()
                    };
                }

                return res.json();
            });
    }

    get (url, requestOptions) {

        requestOptions = requestOptions || {};
        requestOptions.method = 'GET';

        return this.request(url, requestOptions);
    }

    post (url, requestOptions) {
        requestOptions = requestOptions || {};
        requestOptions.method = 'POST';

        return this.request(url, requestOptions);
    }

    put (url, requestOptions) {
        requestOptions = requestOptions || {};
        requestOptions.method = 'PUT';

        return this.request(url, requestOptions);
    }

    delete (url, requestOptions) {
        requestOptions = requestOptions || {};
        requestOptions.method = 'DELETE';

        return this.request(url, requestOptions);
    }
}
