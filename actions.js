import http from 'k6/http'

export const getFrontPage = () => {
    return http.get('https://test-api.k6.io/');
}

export const performLogin = (username, password) => {
    const result = http.post('https://test-api.k6.io/auth/token/login/', {
        username,
        password,
    });
    const out = Object.assign({}, result);
    out.token = JSON.parse(result.body).access;
    return out;
}

export const addCroc = (token, name, sex, date_of_birth) => {
    const result = http.get('https://test-api.k6.io/my/crocodiles/', {
        headers: {
            authorization: 'Bearer ' + token
        },
        name,
        sex,
        date_of_birth,
    });
    const out = Object.assign({}, result);
    return out;
}

export const listCrocs = (token) => {
    return http.get('https://test-api.k6.io/my/crocodiles/', {
        headers: {
            authorization: 'Bearer ' + token
        }
    });
}