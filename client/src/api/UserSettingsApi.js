import axios from 'axios';
import api from 'configs/params';
import { ID_TOKEN } from 'configs/constants';

const { apiUrl } = api;

export function attemptGetAllCustomers(params) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customers`,
    method: 'GET',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    params,
  });
}

export function attemptFollowCustomer(data) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customer-user/${data.id}/subscribe`,
    method: 'POST',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });
}

export function attemptUnfollowCustomer(data) {
  const idToken = localStorage.getItem(ID_TOKEN);

  return axios.request({
    url: `${apiUrl}/supplier/customer-user/${data.id}/unsubscribe`,
    method: 'POST',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });
}
