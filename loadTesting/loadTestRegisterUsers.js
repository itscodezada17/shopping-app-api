import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 31000,           // 10 virtual users
  duration: '5s',   // run for 30 seconds
};

export default function () {
  const url = 'http://localhost:3000/auth/register';

  const payload = JSON.stringify({
    name: 'mice',
    email: `alie+${Math.random()}11@example.com`,  // randomize email to avoid duplicates
    password: 'pis123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Send POST request
  const res = http.post(url, payload, params);

  // Assertions
  check(res, {
    'status is 201 or 200': (r) => r.status === 201 || r.status === 200,
    'response has token': (r) => r.json('token') !== undefined,
  });

  sleep(1); // wait before next request
}
