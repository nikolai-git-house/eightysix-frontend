import axios from 'axios';
import api from 'configs/params';
import { ID_TOKEN } from 'configs/constants';

const { apiUrl } = api;

export function attemptGetCustomer(customerId) { // eslint-disable-line import/prefer-default-export
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customer/${customerId}`,
    method: 'GET',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });
}
