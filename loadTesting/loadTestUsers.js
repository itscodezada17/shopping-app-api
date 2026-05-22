import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 510, // virtual users
  duration: '10s', // test duration
};

export default function () {
  http.get('http://localhost:3000/api/users/');
  sleep(1);
}