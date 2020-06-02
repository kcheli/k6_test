import http from 'k6/http'
import { Rate } from 'k6/metrics'
import { check } from 'k6'

const failRate = new Rate("failed_requests")

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        failed_requests: ['rate <= 0'],
        http_req_duration: ['p(95)<500']
    }
}

export default function () {
    const result = http.get('https://test-api.k6.io/');
    check(result, {
        'http resonse status code is ok:': result.status === 200
    });
    failRate.add(result.status !== 200)
}
