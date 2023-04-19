import { getUserInfo } from './login/_requests.mjs';

export default async function findUser() {
  const token = window.sessionStorage.getItem('token');
  return token ? getUserInfo(token) : null;
}
