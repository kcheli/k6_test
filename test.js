import http from 'k6/http'
import { Rate } from 'k6/metrics'
import { check, group } from 'k6'
import { getFrontPage, performLogin, listCrocs, addCroc } from './actions.js'

const failRate = new Rate("failed_requests")

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        failed_requests: ['rate<=0'],
        http_req_duration: ['p(95)<500'],
    },
};


export default function () {
    group('user logs in and lists their crocodile collection', () => {
        let token;
        group('user visits the frontpage', () => {
            const result = getFrontPage();
            check(result, {
                'http resonse status code is ok:': result.status === 200
            });
            failRate.add(result.status !== 200)
        });
        group('user submits the login form', () => {
            const result = performLogin('kcheli', 'ntgh12532')
            token = result.token;
            check(result, {
                'http response status code is ok': result.status === 200,
                'response contains a token': !!token
            });
            failRate.add(result.status !== 200);
        });
        group('user adds a Croc', () => {
            const result = addCroc(token, 'MegaCroc', 'Male', '04/07/2020')
            check(result, {
                'http response status code is ok': result.status === 200,
            });
            failRate.add(result.status !== 200);
        });
        group('user lists their crocodile collection', () => {
            const result = listCrocs(token);
            const crocs = JSON.parse(result.body)
            check(result, {
                'http response status code is ok': result.status === 200,
                'return 3 crocs': crocs.length >= 1,
            });
            failRate.add(result.status !== 200);
        });
    })
}
